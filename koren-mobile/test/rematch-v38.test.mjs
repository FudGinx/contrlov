import test from 'node:test';import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer,view} from '../src/engine.js';
test('host restarts a finished game in the same room with the same players and settings',()=>{
 const h=makePlayer('Host','t1'),s=makeRoom('RM',h,{hexes:true,targetPotions:4,handLimit:12});const g=makePlayer('Guest','t2');s.players.push(g);action(s,h.id,{type:'addBot'});
 action(s,h.id,{type:'start'});s.status='finished';s.phase='finished';s.players.forEach(p=>{p.score=20;p.completed=2;});
 assert.throws(()=>action(s,g.id,{type:'rematch'}));
 action(s,h.id,{type:'rematch'});
 assert.equal(s.status,'lobby');assert.equal(s.code,'RM');assert.equal(s.players.length,3);assert.deepEqual(s.players.map(p=>p.token),['t1','t2','']);
 assert.ok(s.players.every(p=>p.score===0&&p.completed===0&&!p.character&&!p.hand.length));assert.equal(s.targetPotions,4);assert.equal(s.handLimit,12);assert.ok(s.hexes);
 action(s,h.id,{type:'start'});assert.equal(s.phase,'character');assert.equal(view(s,g.id).status,'playing');
});
