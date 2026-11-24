import test from 'node:test';
import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer,view} from '../src/engine.js';
let serial=0;
const card=(color='red')=>({id:'map31-'+(++serial),name:color,type:'ingredient',color,points:1,negative:-2});
function fixture(hex=0){
 const p=makePlayer('A','a'),q=makePlayer('B','b'),s=makeRoom('MAPFIX',p,{hexes:true});
 s.players.push(q);p.hex=hex;q.hex=0;p.character='molfar';q.character='mavka';
 s.status='playing';s.phase='main';s.turnData={startHex:hex,actionUsed:false,allowance:0};
 p.current='r';p.recipes=[{id:'r',name:'Test',colors:['red','blue','green'],value:5}];
 return {s,p,q};
}
test('oak accepts center payment and chooses an outer skill without paying twice',()=>{
 const{s,p}=fixture(),payment=card();p.hand=[payment];
 action(s,p.id,{type:'hexUse',card:payment.id,hex:0});
 assert.equal(s.discard[0].id,payment.id);assert.equal(s.turnData.actionUsed,false);
 assert.equal(view(s,p.id).hexMap.targets.paid,true);
 assert.deepEqual(view(s,p.id).hexMap.targets.borrow,[1,2,3,4,5,6]);
 assert.throws(()=>action(s,p.id,{type:'hexUse',card:payment.id}));
 action(s,p.id,{type:'hexUse',hex:3});assert.equal(view(s,p.id).hexMap.skillHex,3);
 action(s,p.id,{type:'hexUse'});action(s,p.id,{type:'hexChoose',card:payment.id});
 assert.equal(p.brew[0].card.id,payment.id);assert.equal(s.turnData.hexUsed,true);
});
test('roots inspection before selecting a recipe can be closed and reused',()=>{
 const{s,p}=fixture(3);p.current=null;s.discard=[card()];
 assert.match(view(s,p.id).hexMap.brewReason,/рецепт/);
 action(s,p.id,{type:'hexUse'});assert.equal(view(s,p.id).hexMap.choice.play.length,0);
 action(s,p.id,{type:'hexChoose'});assert.equal(s.turnData.hexUsed,undefined);
 action(s,p.id,{type:'selectRecipe',order:'r'});
 action(s,p.id,{type:'hexUse'});const choice=view(s,p.id).hexMap.choice;
 action(s,p.id,{type:'hexChoose',card:choice.play[0]});assert.equal(p.brew.length,1);
});
test('map explains empty discard, consumed addition and mismatching cards',()=>{
 const{s,p}=fixture(3);
 assert.match(view(s,p.id).hexMap.brewReason,/порожній/);
 s.discard=[card()];s.turnData.actionUsed=true;
 assert.match(view(s,p.id).hexMap.brewReason,/витрачено/);
 s.turnData.actionUsed=false;s.discard=[card('purple')];
 assert.match(view(s,p.id).hexMap.brewReason,/немає складника/);
 assert.equal(view(s,p.id).discardCount,1);
});
test('travel reports harvest and deck reward separately and keeps faces private',()=>{
 const{s,p,q}=fixture(1);s.phase='move';const harvest=[card(),card('green')],ids=harvest.map(c=>c.id),reward=card('blue');
 s.hexes[2]=harvest;s.deck=[reward];action(s,p.id,{type:'hexMove',hex:2});
 const event=s.events.find(e=>e.type==='hexTravel');
 assert.equal(event.owner,p.id);assert.equal(event.harvest,2);assert.equal(event.travelDraw,1);
 assert.deepEqual(event.harvestIds,ids);assert.deepEqual(event.travelIds,[reward.id]);
 assert.deepEqual(event.path,[1,2]);assert.ok(event.duration>=2200);assert.ok(s.animationUntil>Date.now());
 const other=view(s,q.id).events.filter(e=>e.type==='move'&&[...ids,reward.id].includes(e.card.id));
 assert.ok(other.every(e=>e.card.type==='back'&&e.card.color===undefined));
});
test('water travel shows the intermediate step but collects only the destination harvest',()=>{
 const{s,p}=fixture(1);p.character='vodianyk';s.phase='move';s.hexes[0]=[card()];s.hexes[4]=[card()];s.deck=[card()];
 action(s,p.id,{type:'hexMove',hex:4});const event=s.events.find(e=>e.type==='hexTravel');
 assert.deepEqual(event.path,[1,0,4]);assert.equal(event.harvest,1);assert.equal(event.travelDraw,1);
 assert.equal(s.hexes[0].length,1);assert.ok(event.duration>=2800);
});
test('moss gathering and token swap produce distinct movement feedback',()=>{
 const{s,p}=fixture(1);p.character='mosskeeper';s.phase='move';s.hexes[2]=[card(),card()];
 action(s,p.id,{type:'hexPerk',hex:2});const event=s.events.find(e=>e.type==='hexTravel');
 assert.equal(event.mode,'mosskeeper');assert.equal(event.harvestHex,2);assert.equal(event.harvest,2);assert.equal(event.travelDraw,0);
 const swap=fixture(1);swap.s.legacy=true;swap.p.character='blud';swap.q.hex=4;
 action(swap.s,swap.p.id,{type:'hexPerk',hex:4,player:swap.q.id});
 const movement=swap.s.events.find(e=>e.type==='hexTravel');assert.equal(movement.companion.owner,swap.q.id);assert.equal(movement.harvest,0);
});
