
import test from 'node:test';
import assert from 'node:assert/strict';
import {action, botAction, botActor, makePlayer, makeRoom, view} from '../src/engine.js';
const card=(id,color='red')=>({id,name:id,color,type:'ingredient',points:1,negative:-1});
function table(){
 const a=makePlayer('A','a'),b=makePlayer('B','b'),s=makeRoom('HEX',a,{hexes:true});
 s.players.push(b);s.status='playing';s.phase='main';a.hex=1;b.hex=2;
 return {s,a,b};
}
test('entrant takes travel draw and one stationary occupant receives the new growth',()=>{
 const {s,a,b}=table();s.deck=Array.from({length:12},(_,i)=>card('c'+i));s.hexes[1]=[card('old')];
 action(s,a.id,{type:'end'});action(s,a.id,{type:'hexMove',hex:1});
 action(s,b.id,{type:'end'});action(s,b.id,{type:'hexMove',hex:1});
 assert.deepEqual(b.hand.map(c=>c.id),['old','c11']);
 assert.equal(a.hand.length,1);assert.equal(s.hexes[1].length,0);assert.equal(s.round,2);
});
test('movement is limited to a real neighbor or staying, and scouting is private',()=>{
 const {s,a,b}=table();a.hex=0;s.hexes[1]=[card('secret')];
 action(s,a.id,{type:'hexUse',mode:'scout',tiles:[1,2]});
 assert.deepEqual(view(s,a.id).hexMap.scouted[1],['secret']);
 assert.ok(!JSON.stringify(view(s,b.id)).includes('secret'));
 assert.throws(()=>action(s,a.id,{type:'hexUse',mode:'seed'}));
 action(s,a.id,{type:'end'});action(s,a.id,{type:'hexMove',hex:5});
 action(s,b.id,{type:'end'});
 assert.throws(()=>action(s,b.id,{type:'hexMove',hex:5}));
});
test('center seeds exactly one selected hidden card and bottoms the other',()=>{
 const {s,a,b}=table();a.hex=0;s.deck=[card('base'),card('bottom'),card('seed')];b.hex=1;
 action(s,a.id,{type:'hexUse',mode:'seed'});
 assert.equal(view(s,b.id).hexMap.choice,null);
 action(s,a.id,{type:'hexChoose',card:'seed',hex:1});
 assert.deepEqual(s.hexes[1].map(c=>c.id),['seed']);assert.equal(s.deck[0].id,'bottom');
 assert.ok(!JSON.stringify(view(s,b.id)).includes('"seed","name"'));
});
test('hex bots finish on two and six seats while conserving the physical deck',()=>{
 for(const size of [2,6])for(let run=0;run<3;run++){
  const p=makePlayer('A','a',true),s=makeRoom('HEX',p,{hexes:true,targetPotions:2});
  for(let i=1;i<size;i++)action(s,p.id,{type:'addBot'});
  action(s,p.id,{type:'start'});
  for(let i=0;i<4000&&s.status!=='finished';i++){
   const actor=botActor(s),move=botAction(s);assert.ok(move);action(s,actor.id,move);
   if(s.phase==='character')continue;
   const total=s.deck.length+s.discard.length+s.hexes.flat().length+s.players.reduce((n,p)=>n+p.hand.length+Number(!!p.starter)+p.brew.reduce((n,b)=>n+Number(b.card.type!=='essence')+b.attacks.length,0),0)+(s.effectChoice?.kind==='sift'?s.effectChoice.cards.length:0)+(['flowers','seed'].includes(s.hexChoice?.kind)?s.hexChoice.cards.length:0);
   assert.equal(total,80);
  }
  assert.equal(s.status,'finished');
 }
});

