import test from 'node:test';
import assert from 'node:assert/strict';
import {createLesson,lessonNext,lessonAction,lessonBotStep,lessonExpected,lessonNavigate,lessonView,restoreLesson,lessonFreeTick} from '../src/tutorial.js';
import {botActor,botAction,action} from '../src/engine.js';
function drive(l,until){let guard=0;while(l.stage!==until&&guard++<120){
 const a=lessonExpected(l);
 if(a)lessonAction(l,a);
 else if(l.stage==='openMap')lessonNavigate(l,'hex');
 else if(l.stage==='openOrders')lessonNavigate(l,'orders');
 else if(l.stage==='openBrew')lessonNavigate(l,'brew');
 else if(['characters','draftBots','firstReactions','botOneRun','botOneEnd','botTwoRun','botTwoEnd','bids','finalReactions','orderWait'].includes(l.stage))lessonBotStep(l);
 else lessonNext(l);
 }assert.equal(l.stage,until);return l;}
test('tutorial follows the real engine through x2, spring x4, moss x6 and 22 fame',()=>{
 const l=drive(createLesson(),'rootResult'),p=l.s.players[0];
 assert.equal(p.character,'mavka');assert.equal(p.brew[0].card.color,'brown');assert.equal(l.s.turnData.allowance,1);assert.equal(p.recipes[0].potionMeta.mavkaUsed,undefined);
 drive(l,'nectarResult');assert.equal(lessonView(l).players[0].pendingMultiplier,2);
 drive(l,'sabotage');assert.equal(p.brew[1].attacks[0].card.negative,-2);
 drive(l,'wardResult');assert.equal(p.brew[1].attacks[0].cancelled,true);assert.equal(p.hand.some(c=>c.type==='cancel'),false);
 drive(l,'arrival');assert.equal(p.hex,6);assert.equal(p.hand.length,5);assert.equal(l.s.hexes[6].length,0);
 drive(l,'attackResult');assert.equal(l.s.players[1].brew[0].attacks[0].card.id,l.ids.playerAttack);
 drive(l,'turnTwo');assert.equal(l.s.turn,0);assert.equal(l.s.round,2);assert.equal(p.hand.length,4);
 drive(l,'springResult');assert.equal(lessonView(l).players[0].pendingMultiplier,4);assert.equal(l.s.turnData.actionUsed,false);
 drive(l,'tradeResult');assert.ok(p.hand.some(c=>c.id===l.ids.moss));assert.ok(l.s.players[1].hand.some(c=>c.id===l.ids.offer));assert.ok(l.s.players[2].hand.some(c=>c.id===l.ids.otherBid));assert.equal(l.s.exchange,null);
 drive(l,'mavka');assert.equal(lessonView(l).players[0].pendingMultiplier,6);assert.equal(p.recipes[0].potionMeta.mavkaUsed,undefined);
 drive(l,'finalResult');assert.equal(p.brew.at(-1).multiplier,6);assert.equal(p.brew.at(-1).card.points,3);assert.equal(p.recipes[0].potionMeta.mavkaUsed,true);
 drive(l,'negatives');assert.deepEqual(p.brew.at(-1).attacks.map(a=>a.card.negative),[-3,-2]);assert.equal(lessonView(l).players[0].brewPoints,14);
 drive(l,'scoreResult');assert.equal(p.score,22);assert.equal(p.completed,1);assert.equal(p.brew.length,0);assert.equal(l.s.finalStarter,null);
 drive(l,'free');assert.equal(l.s.targetPotions,3);assert.equal(l.s.players.length,3);assert.equal(l.s.players[1].bot,true);assert.equal(lessonFreeTick(l),false);assert.equal(l.s.turn,0);assert.ok(p.recipes.some(r=>r.id===l.ids.nextRecipe));assert.ok(p.hand.some(c=>c.id===l.ids.nextFlower));assert.ok(p.hand.some(c=>c.id===l.ids.nextRoot));
});
test('lesson rejects skipped steps, wrong cards, extra actions and incorrect trades without changing state',()=>{
 const l=drive(createLesson(),'root'),before=JSON.stringify(l);
 for(const a of [{type:'play',card:l.ids.final},{type:'finishTurn'},{type:'tradeOpen',card:l.ids.root}])assert.throws(()=>lessonAction(l,a));
 assert.equal(JSON.stringify(l),before);assert.throws(()=>lessonNext(l));
 drive(l,'take');assert.throws(()=>lessonAction(l,{type:'tradeTake',player:l.s.players[2].id}));assert.throws(()=>lessonAction(l,{...lessonExpected(l),discard:true}));
});
test('persisted bot cursor resumes without repeating or duplicating cards',()=>{
 let l=drive(createLesson(),'firstReactions');lessonBotStep(l);assert.equal(l.cursor,1);
 l=restoreLesson(JSON.parse(JSON.stringify(l)));lessonBotStep(l);assert.equal(l.stage,'sabotage');assert.equal(l.s.players[0].brew[1].attacks.length,1);
 drive(l,'free');const ids=[...l.s.deck,...l.s.discard,...l.s.hexes.flat(),...l.s.players.flatMap(p=>[...p.hand,...p.brew.flatMap(b=>[b.card,...b.attacks.map(a=>a.card)])])].map(c=>c.id);
 assert.equal(new Set(ids).size,ids.length);
});
test('lesson accepts the normal UI payloads for spring, trade and post-score turn ending',()=>{
 const l=drive(createLesson(),'spring');lessonAction(l,{...lessonExpected(l),hex:NaN});assert.equal(l.stage,'springResult');
 drive(l,'take');lessonAction(l,{...lessonExpected(l),discard:false});assert.equal(l.stage,'tradeResult');
 drive(l,'end');lessonAction(l,{type:'end'});assert.equal(l.stage,'finalMove');
});
test('inspecting the first ingredient does not mutate the game state',()=>{
 const l=drive(createLesson(),'rootInspect'),before=JSON.stringify(l.s);
 lessonAction(l,lessonExpected(l));assert.equal(l.stage,'rootResult');assert.equal(JSON.stringify(l.s),before);
});
test('free play after the lesson reaches the three-potion final without tutorial locks',()=>{
 const l=drive(createLesson(),'free'),s=l.s;let steps=0;
 while(s.status==='playing'&&steps++<3000){
  if(lessonFreeTick(l))continue;
  const p=botActor(s);assert.equal(p.id,l.owner);
  p.bot=true;const a=botAction(s);p.bot=false;
  assert.ok(a,'human has a legal next action');action(s,p.id,a);
 }
 assert.equal(s.status,'finished');assert.ok(s.players.some(p=>p.completed>=3));assert.ok(steps<3000);
});
