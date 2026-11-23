import test from 'node:test';
import assert from 'node:assert/strict';
import {action,makeRoom,makePlayer,brewScore,cleanPotion,startHand,SABOTAGE_PER_TURN,view} from '../src/engine.js';
let n=0;const ing=(color='red',points=1,effect=null)=>({id:'v37-'+(++n),type:'ingredient',name:color,color,points,negative:-2,effect});
function room(size=2,colors=['red']){const p=makePlayer('A','a'),s=makeRoom('V37',p);for(let i=1;i<size;i++)s.players.push(makePlayer('B'+i,'b'+i));s.status='playing';s.phase='main';s.turn=0;s.turnData={actionUsed:false,allowance:0};s.players.forEach(x=>x.character='domovyk');p.recipes=[{id:'r',name:'R',value:6,colors}];p.current='r';return{s,p};}
test('starting hands by seat are 4 / 5 / 6 / 7, capped at 10',()=>{assert.deepEqual([0,1,2,3,7].map(startHand),[4,5,6,7,10]);
 const p=makePlayer('A','a'),s=makeRoom('X',p);for(let i=0;i<3;i++)action(s,p.id,{type:'addBot'});action(s,p.id,{type:'start'});
 while(s.phase==='character')action(s,s.players[s.draft].id,{type:'chooseCharacter',character:['molfar','dyer','domovyk','blud'][s.draft]});
 assert.deepEqual(s.players.map(x=>x.hand.length),[4,5,6,7]);});
test('clean potion: +2 only when every slot holds its own printed type',()=>{
 const{s,p}=room(2,['red','blue']);p.hand=[ing('red',1,'extra'),ing('blue')];for(const c of [...p.hand])action(s,p.id,{type:'play',card:c.id});assert.equal(cleanPotion(p),true);
 action(s,p.id,{type:'stop'});action(s,s.players[1].id,{type:'react'});action(s,p.id,{type:'resolve'});assert.equal(p.score,1+1+6+2);
 const t=room(2,['red','blue']);t.p.hand=[ing('red',1,'extra'),ing('green',0,'brew-wild')];for(const c of [...t.p.hand])action(t.s,t.p.id,{type:'play',card:c.id});assert.equal(cleanPotion(t.p),false);});
test('a potion completed in the final round earns +3; the finale starter does not',()=>{
 const{s,p}=room(2,['red']);const q=s.players[1];s.finalStarter=q.id;s.finalQueue=[p.id];p.hand=[ing('red',1)];
 action(s,p.id,{type:'play',card:p.hand[0].id});action(s,p.id,{type:'stop'});action(s,q.id,{type:'react'});action(s,p.id,{type:'resolve'});
 assert.equal(p.score,1+6+2+3);});
test('sabotage: at most three cards per turn against one potion, even after distillation removes the target',()=>{
 assert.equal(SABOTAGE_PER_TURN,3);const{s,p}=room(5,['red','red','red']);
 p.hand=[ing('red',1,'extra'),ing('red',1,'extra'),ing('red',1)];
 action(s,p.id,{type:'play',card:p.hand[0].id});action(s,p.id,{type:'stop'});
 for(const q of s.players.slice(1))q.hand=[ing('red'),ing('red')];
 while(s.phase==='reaction'){const q=s.players[s.reactionQueue[s.reactionIndex]];action(s,q.id,{type:'react',card:q.hand[0].id});}
 assert.equal(p.brew[0].attacks.length,3);assert.equal(view(s,p.id).sabotageLeft,0);
 p.brew[0].attacks=[];const next={id:'next-unit',card:ing('red'),slot:1,attacks:[]};p.brew.push(next);s.turnData.last=next.id;s.phase='chain';
 action(s,p.id,{type:'stop'});assert.equal(s.phase,'defense','removing the attacked card does not reopen sabotage this turn');});
test('roots: declining the choice with a recipe selected uses the hex for this turn (no endless peeking)',()=>{
 const p=makePlayer('A','a'),q=makePlayer('B','b'),s=makeRoom('R',p,{hexes:true});s.players.push(q);s.status='playing';s.phase='main';
 p.character='domovyk';q.character='blud';p.hex=3;q.hex=0;s.turnData={actionUsed:false,allowance:0,startHex:3};
 p.recipes=[{id:'r',name:'R',value:6,colors:['red']}];p.current='r';s.discard=[ing('blue'),ing('green'),ing('black')];
 action(s,p.id,{type:'hexUse'});assert.equal(s.hexChoice.kind,'roots-brew');action(s,p.id,{type:'hexChoose'});
 assert.equal(s.turnData.hexUsed,true);assert.throws(()=>action(s,p.id,{type:'hexUse'}));});
test('roots: if none of the three cards fits, one can be taken into hand',()=>{
 const p=makePlayer('A','a'),q=makePlayer('B','b'),s=makeRoom('R',p,{hexes:true});s.players.push(q);s.status='playing';s.phase='main';
 p.character='domovyk';q.character='blud';p.hex=3;q.hex=0;s.turnData={actionUsed:false,allowance:0,startHex:3};
 p.recipes=[{id:'r',name:'R',value:6,colors:['red']}];p.current='r';const blue=ing('blue');s.discard=[ing('green'),ing('black'),blue];p.hand=[];
 action(s,p.id,{type:'hexUse'});action(s,p.id,{type:'hexChoose',card:blue.id});
 assert.ok(p.hand.some(c=>c.id===blue.id));assert.equal(p.brew.length,0);assert.equal(s.turnData.hexUsed,true);});
test('mushroom glade always yields at least one mushroom when one exists in the deck',()=>{
 const p=makePlayer('A','a'),q=makePlayer('B','b'),s=makeRoom('G',p,{hexes:true});s.players.push(q);s.status='playing';s.phase='main';
 p.character='domovyk';q.character='blud';p.hex=1;q.hex=0;s.turnData={actionUsed:false,allowance:0,startHex:1};
 p.recipes=[{id:'r',name:'R',value:6,colors:['red']}];p.current='r';const pay=ing('blue');p.hand=[pay];
 const shroom=ing('red');s.deck=[shroom,...Array.from({length:8},()=>ing('green'))];
 action(s,p.id,{type:'hexUse',card:pay.id});assert.ok(p.hand.some(c=>c.id===shroom.id));});
