import test from 'node:test';
import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer,view,brewScore,canAdd,deck,MAP_ROSTER} from '../src/engine.js';

let serial=0;
function ingredient(effect=null,color='red',points=1){
 return {id:'combo-'+(++serial),name:effect||color,type:'ingredient',color,points,negative:-3,effect};
}
function fixture(hex=null,colors=['red','blue','green','brown']){
 const p=makePlayer('A','a'),q=makePlayer('B','b'),s=makeRoom('COMBO',p,{hexes:hex!==null});
 s.players.push(q);s.status='playing';s.phase='main';
 p.character='mavka';q.character='molfar';
 if(hex!==null){p.hex=hex;q.hex=0;}
 s.turnData={actionUsed:false,allowance:0,startHex:hex};
 p.recipes=[{id:'r',name:'Recipe',value:8,colors}];p.current='r';
 return {s,p,q};
}
function unit(card,slot=0,attacks=[]){return {id:'unit-'+(++serial),card,slot,playedAs:card.color,attacks};}
function attack(color='red',cancelled=false){return {id:'attack-'+(++serial),card:ingredient(null,color),cancelled};}

test('combo catalog adds six distinct illustrated cards for each selected effect',()=>{
 const cards=deck(true).filter(c=>c.artSet==='combo-ingredients-v1');
 assert.equal(cards.length,18);assert.equal(new Set(cards.map(c=>c.name)).size,18);
 assert.equal(new Set(cards.map(c=>c.illustration)).size,18);
 for(const effect of ['rebrew','echo','stoke'])assert.equal(cards.filter(c=>c.effect===effect).length,6);
 assert.equal(MAP_ROSTER.length,12);assert.ok(MAP_ROSTER.includes('znakhar'));assert.ok(MAP_ROSTER.includes('dyer'));
});
test('rebrew exposes only ingredients within the actual top three discard cards',()=>{
 const {s,p}=fixture(),source=ingredient('rebrew'),old=ingredient(),white={id:'white',type:'cancel'};
 const eligible=ingredient('extra','blue'),other=ingredient(null,'green');
 s.discard=[old,white,eligible,other];p.hand=[source];
 action(s,p.id,{type:'play',card:source.id});
 assert.deepEqual(s.effectChoice.cards.map(c=>c.id),[other.id,eligible.id]);
 action(s,p.id,{type:'chooseEffect',choice:s.effectChoice.id,card:eligible.id,play:true});
 assert.equal(p.brew.length,2);assert.equal(s.turnData.allowance,1);
 assert.deepEqual(s.discard.map(c=>c.id),[old.id,white.id,other.id]);
 const next=ingredient(null,'green');p.hand.push(next);action(s,p.id,{type:'play',card:next.id});
 assert.equal(p.brew.length,3);assert.equal(s.turnData.allowance,0);
});
test('rebrew can keep a selected card and rejects an unsuitable immediate play atomically',()=>{
 const{s,p}=fixture(),source=ingredient('rebrew'),wrong=ingredient(null,'purple');
 p.hand=[source];s.discard=[wrong];action(s,p.id,{type:'play',card:source.id});
 const choice=s.effectChoice.id,before=JSON.stringify(s);
 assert.throws(()=>action(s,p.id,{type:'chooseEffect',choice,card:wrong.id,play:true}));
 assert.equal(JSON.stringify(s),before);
 action(s,p.id,{type:'chooseEffect',choice,card:wrong.id});
 assert.equal(p.hand[0].id,wrong.id);assert.equal(p.brew.length,1);
});
test('echo repeats drawing once and does not copy another echo',()=>{
 const{s,p}=fixture(null,['red','red','red']),draw=ingredient('draw'),echo=ingredient('echo'),echo2=ingredient('echo');
 p.hand=[draw,echo,echo2];s.deck=[ingredient(),ingredient()];s.turnData.allowance=2;
 action(s,p.id,{type:'play',card:draw.id});action(s,p.id,{type:'play',card:echo.id});action(s,p.id,{type:'play',card:echo2.id});
 assert.equal(p.hand.length,2);assert.equal(s.deck.length,0);
});
test('echo can copy a continuation or the scoring resonance of the previous card',()=>{
 for(const effect of ['extra','resonance']){
  const{s,p}=fixture(null,['red','red']),a=ingredient(effect),b=ingredient('echo');
  p.hand=[a,b];s.turnData.allowance=1;
  action(s,p.id,{type:'play',card:a.id});action(s,p.id,{type:'play',card:b.id});
  if(effect==='extra')assert.equal(s.turnData.allowance,2);
  else assert.equal(brewScore(p),4);
 }
});
test('echo can copy the previous wildcard when filling a different required type',()=>{
 const{s,p}=fixture(null,['red','purple']),wild=ingredient('brew-wild','blue',0),echo=ingredient('echo','brown',0);
 p.hand=[wild,echo];s.turnData.allowance=1;
 action(s,p.id,{type:'play',card:wild.id});
 assert.equal(canAdd(s,p,echo),true);
 action(s,p.id,{type:'play',card:echo.id});
 assert.equal(p.brew[1].playedAs,'purple');
});
test('stoking is optional, consumes one owned ingredient and grants exactly one addition',()=>{
 for(const pay of [true,false]){
  const{s,p}=fixture(),a=ingredient('stoke'),fuel=ingredient(null,'purple'),next=ingredient(null,'blue');
  p.hand=[a,fuel,next];action(s,p.id,{type:'play',card:a.id});
  assert.equal(s.effectChoice.kind,'stoke');
  action(s,p.id,{type:'chooseEffect',choice:s.effectChoice.id,card:pay?fuel.id:undefined});
  assert.equal(s.turnData.allowance,Number(pay));assert.equal(s.discard.length,Number(pay));
  assert.equal(canAdd(s,p,next),pay);
 }
});
test('three amplifiers produce x6, skip zero-point cards and multiply only printed positives',()=>{
 const{s,p}=fixture(null,Array(6).fill('red'));
 const cards=[ingredient('amplify','red',0),ingredient('amplify','red',0),ingredient('amplify','red',0),ingredient('sift','red',0),ingredient(null,'red',3)];
 p.hand=cards;s.turnData.allowance=4;
 for(const c of [...cards])action(s,p.id,{type:'play',card:c.id});
 assert.equal(p.brew.at(-1).multiplier,6);assert.equal(brewScore(p),18);
 p.brew.at(-1).attacks.push(attack());assert.equal(brewScore(p),15);
});
test('echo of amplifier accumulates x4 and sources are consumed only once',()=>{
 const{s,p}=fixture(null,Array(5).fill('red'));
 const a=ingredient('amplify','red',0),echo=ingredient('echo','red',0),target=ingredient(null,'red',3),later=ingredient(null,'red',2);
 p.hand=[a,echo,target,later];s.turnData.allowance=3;
 for(const c of [...p.hand])action(s,p.id,{type:'play',card:c.id});
 assert.equal(p.brew[2].multiplier,4);assert.equal(p.brew[3].multiplier,undefined);
 assert.equal(brewScore(p),14);
});
test('resonance counts cancelled and active hostile ingredients without a three-card cap',()=>{
 const{s,p}=fixture(),res=unit(ingredient('resonance'));
 p.brew=[res,...Array.from({length:4},()=>unit(ingredient()))];
 const hostile=attack('red',true);res.attacks=[hostile,attack()];
 assert.equal(brewScore(p),8);
 res.attacks.pop();assert.equal(brewScore(p),10);
});
test('roots plays from top three using the ordinary action and starts printed effects',()=>{
 const{s,p}=fixture(3),a=ingredient('extra'),old=ingredient();
 s.discard=[old,ingredient(null,'purple'),a,ingredient(null,'brown')];
 action(s,p.id,{type:'hexUse'});
 assert.equal(s.hexChoice.cards.length,3);assert.ok(s.hexChoice.cards.some(c=>c.id===a.id));
 action(s,p.id,{type:'hexChoose',card:a.id});
 assert.equal(p.brew[0].card.id,a.id);assert.equal(s.turnData.actionUsed,true);assert.equal(s.turnData.allowance,1);
 assert.equal(s.turnData.hexUsed,true);
});
test('flower keeps points, replaces the effect with continuation and preserves pending amplification',()=>{
 const{s,p}=fixture(2,['red','red','red']);
 p.brew=[unit(ingredient('amplify','red',0))];
 const a=ingredient('draw','red',3),b=ingredient(null,'red',2);p.hand=[a,b];
 action(s,p.id,{type:'hexUse',card:a.id});action(s,p.id,{type:'play',card:a.id});
 assert.ok(!p.brew.at(-1).zeroed);assert.equal(p.brew.at(-1).effectMuted,true);assert.equal(s.turnData.allowance,1);
 action(s,p.id,{type:'play',card:b.id});
 assert.equal(p.brew.at(-1).multiplier,2);assert.equal(brewScore(p),7);
});
test('moss cleans a full ingredient before final scoring and keeps its slot',()=>{
 const{s,p}=fixture(4,['red']);s.phase='defense';s.turnData.actionUsed=true;
 const b=unit(ingredient('resonance','red',3),0,[attack(),attack()]);
 p.brew=[b];action(s,p.id,{type:'hexUse',target:b.id});
 assert.equal(brewScore(p),0);assert.equal(b.card.effect,'resonance');assert.ok(b.attacks.every(a=>a.cancelled));
 action(s,p.id,{type:'finishTurn'});assert.equal(p.score,8+2,'recipe + clean potion bonus');assert.equal(p.completed,1);
});
test('fireflies replaces any ingredient with an insect and starts its effect without consuming the ordinary action',()=>{
 const{s,p}=fixture(5,['red','blue']),old=unit(ingredient(null,'red'),0,[attack()]);
 const insect=ingredient('extra','black');p.brew=[old];p.hand=[insect];
 action(s,p.id,{type:'hexUse',card:insect.id,target:old.id});
 assert.equal(p.brew[0].card.id,insect.id);assert.equal(p.brew[0].slot,0);
 assert.equal(s.discard.length,2);assert.equal(s.turnData.actionUsed,false);assert.equal(s.turnData.allowance,1);
});
test('spring replays an amplifier with one fresh charge and offers continuation after defense',()=>{
 const{s,p}=fixture(6,['red','blue']),a=unit(ingredient('extra')),liquid=ingredient(null,'purple');
 p.brew=[a];p.hand=[liquid];s.phase='defense';s.turnData.actionUsed=true;s.turnData.last=a.id;s.turnData.answeredLast=a.id;
 action(s,p.id,{type:'hexUse',card:liquid.id,target:a.id});
 assert.equal(s.turnData.allowance,1);assert.equal(s.phase,'chain');
 action(s,p.id,{type:'stop'});assert.equal(s.phase,'defense');
});
test('witch on the map swaps her travel card for a discard mushroom at the start of her next turn',()=>{
 const{s,p,q}=fixture(1);p.character='vidma';q.hex=0;
 const mushroom=ingredient(null,'red');s.discard=[mushroom];s.deck=Array.from({length:12},()=>ingredient(null,'blue'));
 s.hexes[0]=[];s.phase='post';action(s,p.id,{type:'end'});
 const before=p.hand.length;action(s,p.id,{type:'hexMove',hex:0});
 assert.equal(p.hand.length,before,'no travel draw yet: it is replaced by the witch choice');
 assert.equal(s.turn,1);action(s,q.id,{type:'end'});action(s,q.id,{type:'hexMove',hex:q.hex===1?2:1});
 assert.equal(s.turn,0);assert.equal(s.effectChoice.kind,'harvest');
 action(s,p.id,{type:'chooseEffect',choice:s.effectChoice.id,card:mushroom.id});
 assert.ok(p.hand.some(c=>c.id===mushroom.id));assert.equal(p.hand.length,before+1,'exactly one card per move, like everyone else');
});
test('witch on the map gets no start-of-turn card when she did not move',()=>{
 const{s,p,q}=fixture(1);p.character='vidma';q.hex=0;
 const mushroom=ingredient(null,'red');s.discard=[mushroom];s.deck=Array.from({length:12},()=>ingredient(null,'blue'));
 s.phase='post';action(s,p.id,{type:'end'});const before=p.hand.length;action(s,p.id,{type:'hexMove',hex:1});
 action(s,q.id,{type:'end'});action(s,q.id,{type:'hexMove',hex:q.hex===2?3:2});
 assert.equal(s.turn,0);assert.ok(!s.effectChoice);assert.ok(!p.hand.some(c=>c.id===mushroom.id));
});
test('witch on the map without a discard mushroom takes an ordinary random card for her move',()=>{
 const{s,p,q}=fixture(1);p.character='vidma';q.hex=0;
 s.discard=[ingredient(null,'green')];s.deck=Array.from({length:12},()=>ingredient(null,'blue'));
 s.hexes[0]=[];s.phase='post';action(s,p.id,{type:'end'});const before=p.hand.length;action(s,p.id,{type:'hexMove',hex:0});
 action(s,q.id,{type:'end'});action(s,q.id,{type:'hexMove',hex:q.hex===1?2:1});
 assert.equal(s.turn,0);assert.ok(!s.effectChoice);assert.equal(p.hand.length,before+1);
});
test('blud swaps physical chips and can immediately use the destination ability once per turn',()=>{
 const{s,p,q}=fixture(1);p.character='blud';q.hex=3;s.discard=[ingredient('extra')];
 action(s,p.id,{type:'hexPerk',hex:3,player:q.id});
 assert.equal(p.hex,3);assert.equal(q.hex,1);assert.equal(s.turnData.startHex,3);
 action(s,p.id,{type:'hexUse'});assert.equal(s.hexChoice.kind,'roots-brew');
});
test('water movement reaches two steps with one draw and harvests every hex on the path',()=>{
 const{s,p}=fixture(1);p.character='vodianyk';s.phase='move';
 s.hexes[0]=[ingredient()];s.hexes[4]=[ingredient()];s.deck=[ingredient()];
 action(s,p.id,{type:'hexMove',hex:4});
 assert.equal(p.hex,4);assert.equal(p.hand.length,3);assert.equal(s.hexes[0].length,0);
});
test('chugaister blocks incoming movement, allows a co-occupant to leave and releases on departure',()=>{
 const{s,p,q}=fixture(1);p.character='chugaister';q.hex=1;
 action(s,p.id,{type:'hexPerk',hex:1});
 assert.equal(view(s,q.id).hexMap.tiles[1].blocked,true);
 s.turn=1;s.phase='move';action(s,q.id,{type:'hexMove',hex:2});assert.equal(q.hex,2);
 s.turn=1;s.phase='move';assert.throws(()=>action(s,q.id,{type:'hexMove',hex:1}));
 s.turn=0;s.phase='move';action(s,p.id,{type:'hexMove',hex:0});assert.equal(p.hexLocked,false);
});
test('drawing a hidden harvest never leaks its identity to other animation histories',()=>{
 const{s,p,q}=fixture(1);s.phase='move';const secret=ingredient();s.hexes[2]=[secret];s.deck=[ingredient()];
 action(s,p.id,{type:'hexMove',hex:2});
 const event=view(s,q.id).events.find(e=>e.card?.id===secret.id);
 assert.equal(event.card.type,'back');assert.equal(event.card.color,undefined);
});
