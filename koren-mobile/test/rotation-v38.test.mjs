import test from 'node:test';import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer,START_HAND} from '../src/engine.js';
test('rooms with rotation: everyone starts with 5 cards and the first player moves one seat each round',()=>{
 const p=makePlayer('A','a'),s=makeRoom('RT',p,{rotate:true});for(let i=0;i<3;i++)action(s,p.id,{type:'addBot'});
 action(s,p.id,{type:'start'});
 s.players.forEach(q=>{q.character=q.character||'domovyk';});
 while(s.phase==='character'){const q=s.players[s.draft];action(s,q.id,{type:'chooseCharacter',character:['mavka','molfar','znakhar','vidma'][s.draft]});}
 assert.ok(s.players.every(q=>q.hand.length===START_HAND));
 while(s.phase==='draft'){const q=s.players[s.draft];action(s,q.id,{type:'order',order:s.market[0].id});}
 const order=[];for(let i=0;i<8;i++){order.push(s.turn);const q=s.players[s.turn];s.phase='post';s.turnData.actionUsed=true;q.hand.splice(5);action(s,q.id,{type:'end'});}
 assert.deepEqual(order,[0,1,2,3,1,2,3,0]);
});
