import test from 'node:test';import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer,botAction,HAND_LIMIT} from '../src/engine.js';
let n=0;const card=()=>({id:'h'+(++n),type:'ingredient',name:'x',color:'red',points:1,negative:-2});
function room(hexes){const p=makePlayer('A','a'),s=makeRoom('HL',p,{hexes});s.players.push(makePlayer('B','b'));s.status='playing';s.phase='post';s.turn=0;s.round=1;s.turnData={actionUsed:true,allowance:0};s.players.forEach(x=>x.character='domovyk');s.deck=Array.from({length:30},card);return{s,p};}
test('turn cannot pass with more than 10 cards; discarding down to 10 passes it',()=>{
 const{s,p}=room(false);p.hand=Array.from({length:12},card);
 action(s,p.id,{type:'finishTurn'});assert.equal(s.phase,'discard');assert.equal(s.turn,0);
 action(s,p.id,{type:'discardFree',card:p.hand[0].id});assert.equal(s.phase,'discard');
 action(s,p.id,{type:'discardFree',card:p.hand[0].id});assert.equal(p.hand.length,HAND_LIMIT);assert.equal(s.turn,1);
});
test('bots discard down to the limit',()=>{
 const{s,p}=room(false);p.bot=true;p.hand=Array.from({length:13},card);
 action(s,p.id,{type:'finishTurn'});let g=0;while(s.phase==='discard'&&g++<10){const a=botAction(s);action(s,p.id,a);}
 assert.equal(p.hand.length,HAND_LIMIT);assert.equal(s.turn,1);
});
