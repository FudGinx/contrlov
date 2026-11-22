import test from 'node:test';
import assert from 'node:assert/strict';
import {lessonPreviewSize,lessonClipRect,lessonPanelPosition,portraitViewBox} from '../src/tutorial-layout.js';
test('lesson previews preserve card proportions across phone and desktop sizes',()=>{
 for(const [width,height] of [[667,300],[844,390],[2048,1080]]){
  const s=lessonPreviewSize(width,height);
  assert.ok(Math.abs(s.cardWidth/s.cardHeight-.73)<1e-9);
  assert.ok(s.width+s.panel+24<=width);
  assert.ok(s.cardHeight<height-80);
 }
});
test('tutorial highlights the entire visible drop field and ignores offscreen cards',()=>{
 const viewport={width:844,height:390},field={x:85,y:80,width:620,height:145};
 assert.equal(lessonClipRect(field,viewport).width,620);
 assert.equal(lessonClipRect({x:-400,y:80,width:100,height:145},viewport),null);
 assert.equal(lessonClipRect({x:80,y:80,width:200,height:145},viewport,[{x:100,y:80,width:100,height:145}]).width,100);
});
test('explanations stay near the described card and inside the screen',()=>{
 const card={x:100,y:100,width:100,height:140,right:200,bottom:240};
 const p=lessonPanelPosition(card,260,230,{width:844,height:390},[card]);
 assert.equal(p.side,'right');assert.equal(p.left,214);
 assert.ok(p.top>=8&&p.top+230<=382);
 assert.deepEqual(portraitViewBox(4,3,5),{viewBox:'100 100 100 100',width:400,height:300});
});
