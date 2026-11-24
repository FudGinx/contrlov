import test from 'node:test';import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer} from '../src/engine.js';
let n=0;const ing=(color,points,effect)=>({id:'e'+(++n),type:'ingredient',name:effect||color,color,points,negative:-2,effect});
function room(legacy=false){const p=makePlayer('A','a'),s=makeRoom('EC',p,{legacy});s.players.push(makePlayer('B','b'));s.status='playing';s.phase='main';s.turn=0;s.turnData={actionUsed:false,allowance:0};s.players.forEach(x=>x.character='domovyk');s.deck=Array.from({length:20},()=>ing('red',1));p.recipes=[{id:'r',name:'R',value:6,colors:['red','blue','green','purple']}];p.current='r';return{s,p};}
test('echo lets you pick any own effect card in the pot',()=>{
 const{s,p}=room();const a=ing('red',1,'draw'),b=ing('blue',1,'extra'),c=ing('green',1),e=ing('purple',0,'echo');
 p.brew=[{id:'u1',card:a,slot:0,attacks:[]},{id:'u2',card:b,slot:1,attacks:[]},{id:'u3',card:c,slot:2,attacks:[]}];p.hand=[e];
 action(s,p.id,{type:'play',card:e.id});
 assert.equal(s.effectChoice?.kind,'echo');assert.equal(s.effectChoice.cards.length,2);
 const pick=s.effectChoice.cards.find(x=>x.effect==='draw'),before=p.hand.length;
 action(s,p.id,{type:'chooseEffect',choice:s.effectChoice.id,card:pick.id});
 assert.equal(p.hand.length,before+1);assert.equal(p.brew.at(-1).echoSource.effect,'draw');
});
test('tutorial (legacy) echo still repeats only the previous card',()=>{
 const{s,p}=room(true);p.hand=[ing('red',1,'extra'),ing('blue',1,'draw'),ing('green',1,'extra'),ing('purple',0,'echo')];
 for(const c of [...p.hand]){while(s.phase==='reaction')action(s,s.players[1].id,{type:'react'});if(s.phase==='defense')action(s,p.id,{type:'resolve'});try{action(s,p.id,{type:'play',card:c.id});}catch(e){}}
 assert.notEqual(s.effectChoice?.kind,'echo');
});
