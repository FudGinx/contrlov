import test from 'node:test';
import assert from 'node:assert/strict';
import {HEX_GRID,hexMapLayout} from '../src/hex-layout.js';
test('the hex map fits its station on phones, tablets and large screens',()=>{
 for(const [width,height] of [[460,280],[650,372],[1000,650],[1290,900],[1900,1000]]){
  const s=hexMapLayout(width,height);
  assert.ok(s.boardWidth+s.panelWidth+s.gap<=width+1e-6);
  assert.ok(s.boardHeight<=height+1e-6);
  assert.ok(Math.abs(s.boardWidth/s.boardHeight-2.5*HEX_GRID.tileAspect/3)<1e-8);
  assert.ok(Math.abs(s.boardHeight-height)<1e-6||Math.abs(s.boardWidth+s.panelWidth+s.gap-width)<1e-6,'fills one available dimension');
 }
});
test('seven hexes occupy the whole fitted rectangle without the old empty margins',()=>{
 const s=hexMapLayout(1290,900),tw=s.boardWidth*.4,th=tw/HEX_GRID.tileAspect;
 const tiles=HEX_GRID.centers.map(([x,y])=>({left:s.boardWidth*x/100-tw/2,right:s.boardWidth*x/100+tw/2,top:s.boardHeight*y/100-th/2,bottom:s.boardHeight*y/100+th/2}));
 assert.ok(Math.abs(Math.min(...tiles.map(t=>t.left)))<1e-6);
 assert.ok(Math.abs(Math.max(...tiles.map(t=>t.right))-s.boardWidth)<1e-6);
 assert.ok(Math.abs(Math.min(...tiles.map(t=>t.top)))<1e-6);
 assert.ok(Math.abs(Math.max(...tiles.map(t=>t.bottom))-s.boardHeight)<1e-6);
 assert.ok(s.boardWidth>800,'large screens are no longer capped at a 419px footprint');
});
test('hex labels and physical pieces grow with the board and shrink on resize',()=>{
 const small=hexMapLayout(460,280),large=hexMapLayout(1290,900);
 assert.ok(large.tokenSize>small.tokenSize);
 assert.ok(large.labelSize>small.labelSize);
 assert.ok(large.counterSize>small.counterSize);
 assert.deepEqual(hexMapLayout(460,280),small);
});
