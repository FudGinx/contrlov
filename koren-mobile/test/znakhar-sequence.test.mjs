import test from'node:test';import assert from'node:assert/strict';import{makeRoom,makePlayer,action,CHARACTERS}from'../src/engine.js';
let serial=0;const card=(color,effect=null)=>({id:'sequence-'+(++serial),type:'ingredient',name:color,color,effect,points:1,negative:-2});
function room(colors=['black','purple','blue']){const p=makePlayer('A','a'),q=makePlayer('B','b'),s=makeRoom('ABCDEF',p);s.players.push(q);s.status='playing';s.phase='main';s.turnData={actionUsed:false,allowance:0};p.character='znakhar';p.recipes=[{id:'r',colors,value:5}];p.current='r';return{s,p,q};}

test('Znakhar earns one continuation per potion from a plain +1 or +2 ingredient',()=>{
 const {s,p}=room(['green','blue','red']);
 p.hand=[{...card('green'),points:2},card('blue'),card('red')];
 action(s,p.id,{type:'play',card:p.hand[0].id});
 assert.equal(s.turnData.allowance,1);
 action(s,p.id,{type:'play',card:p.hand[0].id});
 assert.equal(s.turnData.allowance,0);
 assert.equal(p.recipes[0].potionMeta.plainExtraUsed,true);
 assert.throws(()=>action(s,p.id,{type:'play',card:p.hand[0].id}));
});
test('A plain +3 or a printed effect does not grant Znakhar continuation',()=>{
 for(const cardTemplate of [{...card('green'),points:3},card('green','draw')]){
  const {s,p}=room(['green','blue']);p.hand=[cardTemplate];
  action(s,p.id,{type:'play',card:p.hand[0].id});
  assert.equal(s.turnData.allowance,0);
  assert.equal(p.recipes[0].potionMeta.plainExtraUsed,undefined);
 }
});
