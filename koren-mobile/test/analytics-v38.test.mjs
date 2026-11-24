import test from 'node:test';import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer,botAction,botActor,botTrade,view} from '../src/engine.js';
test('a finished game carries analytics for export; tutorial rooms do not',()=>{
 const p=makePlayer('Host','t',true),s=makeRoom('AN',p,{hexes:true,rotate:true,targetPotions:2});for(let i=0;i<3;i++)action(s,p.id,{type:'addBot'});action(s,p.id,{type:'start'});
 for(let i=0;i<6000&&s.status!=='finished';i++){const tr=botTrade(s);if(tr){action(s,tr.pid,tr.action);continue;}const a=botActor(s),m=botAction(s);action(s,a.id,m);}
 assert.equal(s.status,'finished');const A=view(s,p.id).analytics;assert.ok(A);assert.equal(A.format,'koren-analytics');assert.equal(A.players.length,4);
 assert.ok(A.players.every(x=>x.character&&typeof x.score==='number'));assert.ok(A.players.some(x=>x.winner));assert.ok(A.log.length>20);assert.ok(A.rounds>=1);
 assert.ok(A.players.some(x=>Object.keys(x.plays).length));assert.ok(A.players.reduce((n,x)=>n+x.potions.length,0)>=2);
 const L=makeRoom('LS',makePlayer('A','a'),{legacy:true});assert.equal(L.analytics,undefined);
});
