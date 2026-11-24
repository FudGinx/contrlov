import test from 'node:test';
import assert from 'node:assert/strict';
import {lessonFinaleInfo,lessonFinaleNext,lessonResultInfo,lessonFreeAction,lessonFreeTick} from '../src/tutorial.js';
function finale(starter='human'){
 const players=[{id:'human',name:'Травниця',score:30,completed:1},{id:'bot1',name:'Бот 1',score:28,completed:1,bot:true},{id:'bot2',name:'Бот 2',score:20,completed:1,bot:true}];
 const first=players.findIndex(p=>p.id===starter);players[first].completed=3;
 return {stage:'free',owner:'human',version:1,s:{status:'playing',targetPotions:3,players,turn:first,finalStarter:starter,finalQueue:[players[(first+1)%3].id,players[(first+2)%3].id]}};
}
test('the human or either bot can trigger the final explanation and pause all gameplay',()=>{
 for(const starter of ['human','bot1','bot2']){
  const l=finale(starter),before=JSON.stringify(l.s),info=lessonFinaleInfo(l);
  assert.equal(info.key,'trigger');assert.equal(info.focus,starter);assert.ok(info.text.includes('+5'));
  assert.equal(lessonFreeTick(l),false);assert.throws(()=>lessonFreeAction(l,{type:'end'}));
  assert.equal(JSON.stringify(l.s),before);
  lessonFinaleNext(l,'trigger');assert.equal(lessonFinaleInfo(l).key,'last-turns');
 }
});
test('each remaining player receives exactly one final-turn explanation in engine queue order',()=>{
 const l=finale('bot1');
 lessonFinaleNext(l,'trigger');lessonFinaleNext(l,'last-turns');assert.equal(lessonFinaleInfo(l),null);
 for(const pid of [...l.s.finalQueue]){
  l.s.turn=l.s.players.findIndex(p=>p.id===pid);
  assert.equal(lessonFinaleInfo(l).key,'turn:'+pid);lessonFinaleNext(l,'turn:'+pid);
  assert.equal(lessonFinaleInfo(l),null);
  l.s.finalQueue=l.s.finalQueue.filter(id=>id!==pid);
 }
 l.s.status='finished';assert.equal(lessonFinaleInfo(l).key,'result');lessonFinaleNext(l,'result');
 assert.equal(lessonFinaleInfo(l),null);assert.equal(lessonFreeTick(l),false);
});
test('acknowledgements survive saving and stale clicks cannot skip the next explanation',()=>{
 let l=finale();lessonFinaleNext(l,'trigger');l=JSON.parse(JSON.stringify(l));
 assert.equal(lessonFinaleInfo(l).key,'last-turns');
 assert.throws(()=>lessonFinaleNext(l,'trigger'));assert.equal(lessonFinaleInfo(l).key,'last-turns');
 lessonFinaleNext(l,'last-turns');assert.equal(lessonFinaleInfo(l),null);
});
test('results congratulate the fame winner or joint winners and support a defeated learner',()=>{
 const l=finale('bot1');l.s.status='finished';
 assert.equal(lessonResultInfo(l).outcome,'win');
 l.s.players[1].score=30;assert.equal(lessonResultInfo(l).outcome,'tie');
 l.s.players[1].score=32;const lost=lessonResultInfo(l);assert.equal(lost.outcome,'loss');
 assert.ok(lost.text.includes('Нова історія'));assert.deepEqual(lost.winners,['Бот 1']);
 lessonFinaleNext(l,'result');assert.equal(lessonFinaleInfo(l),null);
 assert.equal(lessonResultInfo(l).outcome,'loss','result message remains after dismissing the guide');
});
test('finale prompts never interrupt the guided recipe or an unfinished free match',()=>{
 const l=finale();l.stage='root';assert.equal(lessonFinaleInfo(l),null);
 l.stage='free';l.s.finalStarter=null;assert.equal(lessonFinaleInfo(l),null);assert.equal(lessonResultInfo(l),null);
});
