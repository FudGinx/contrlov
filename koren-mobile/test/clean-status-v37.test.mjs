import test from 'node:test';import assert from 'node:assert/strict';
import {potPreview} from '../src/engine.js';
const card=(color)=>({id:color+Math.random(),name:color,type:'ingredient',color,points:1});
const pl=brew=>({character:null,current:'r',recipes:[{id:'r',name:'R',value:6,colors:['red','blue']}],brew:brew.map((b,i)=>({id:i,attacks:[],...b}))});
test('clean status is visible before closing and names the slot that broke it',()=>{
 assert.equal(potPreview(pl([{card:card('red'),slot:0}])).cleanPossible,true);
 const ok=potPreview(pl([{card:card('red'),slot:0},{card:card('blue'),slot:1},{card:card('green'),slot:null}]));
 assert.equal(ok.clean,true);assert.equal(ok.onClose,ok.now+6+2);
 const bad=potPreview(pl([{card:card('red'),slot:0},{card:card('blue'),slot:1,playedAs:'red'}]));
 assert.equal(bad.clean,false);assert.deepEqual(bad.cleanBroken,{slot:1,card:'blue'});
});
