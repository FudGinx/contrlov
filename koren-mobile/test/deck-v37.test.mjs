import test from 'node:test';
import assert from 'node:assert/strict';
import {deck,COPY_PLAN,makePlayer,makeRoom,action} from '../src/engine.js';
const key=c=>c.effect||('p'+c.points);
test('v37 deck follows the copy plan: 90 ingredients, 15 of every type, whites unchanged',()=>{
 for(let run=0;run<5;run++){const d=deck(),ing=d.filter(c=>c.type==='ingredient');
  assert.equal(d.length,98);assert.equal(new Set(d.map(c=>c.id)).size,98);assert.equal(ing.length,90);
  for(const [k,n] of Object.entries(COPY_PLAN))assert.equal(ing.filter(c=>key(c)===k).length,n,k);
  for(const color of ['red','blue','brown','green','black','purple'])assert.equal(ing.filter(c=>c.color===color).length,15,color);
  assert.equal(d.filter(c=>c.type==='cancel').length,6);assert.equal(d.filter(c=>c.type==='distill').length,2);}
});
test('lesson rooms keep the full scripted v36 catalog, ordinary rooms use the v37 plan',()=>{
 for(const full of [true,false]){const p=makePlayer('A','a'),s=makeRoom('X',p,{hexes:true,fullDeck:full});action(s,p.id,{type:'addBot'});action(s,p.id,{type:'start'});
  while(s.phase==='character')action(s,s.players[s.draft].id,{type:'chooseCharacter',character:s.draft?'blud':'mavka'});
  const all=[...s.deck,...s.players.flatMap(x=>x.hand),...(s.hexes||[]).flat()].filter(c=>c.type==='ingredient');
  assert.equal(all.filter(c=>c.effect==='extra').length,full?16:9);}
});
