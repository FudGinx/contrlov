import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as api from '../src/tutorial.js';
function boot(finished=false){
 const nodes=new Map(),timers=new Map(),values=new Map();let timerId=0;
 class Element{
  constructor(){this.dataset={};this.classList={add(){},remove(){}};this.html='';}
  set innerHTML(s){this.html=s;}get innerHTML(){return this.html;}
  querySelector(s){return s==='.lesson-finale-panel'?this.panel:s==='button'?this.button:null;}
  closest(s){return this.matches?.[s]||null;}
  focus(){this.focused=true;}
  remove(){nodes.delete(this.id);}
 }
 const app={inert:false,querySelector(){return null;}},body={classList:{add(){},remove(){}},append(el){nodes.set(el.id,el);}};
 const document={body,activeElement:null,createElement(){const el=new Element();el.panel=new Element();el.panel.button=new Element();return el;},getElementById:id=>nodes.get(id)||null,querySelector(){return null;},querySelectorAll(){return [];}};
 const ctx={console,Element,document,app,state:{},storage:{setItem:(k,v)=>values.set(k,v)},KOREN_LESSON:api,tablePortrait(){return '';},ch(){return {};},home(){},render(){},act(){},poll(){},results(){},inspectTable(){},tile(){},phaseBell(){},closeModal(){},toast(){},esc:s=>String(s),busy:false,hexPlayback:null,dragging:null,hexDrag:null,tableSelection:null,selected:null,tableView:'brew',tablePlayer:null,modalRoot:{},setTimeout(fn){timers.set(++timerId,fn);return timerId;},clearTimeout(id){timers.delete(id);},requestAnimationFrame(){},cancelAnimationFrame(){},addEventListener(){}};
 ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync(new URL('../web/tutorial.js',import.meta.url),'utf8'),ctx);
 ctx.fixture={stage:'free',owner:'human',version:1,s:{status:finished?'finished':'playing',targetPotions:3,finalStarter:'bot1',turn:1,finalQueue:['bot2','human'],players:[{id:'human',name:'Травниця',completed:1,score:10},{id:'bot1',name:'Бот 1',completed:3,score:30,bot:true},{id:'bot2',name:'Бот 2',completed:1,score:20,bot:true}]}};
 vm.runInContext('lesson=fixture;lessonFinaleOverlay()',ctx);
 function click(story=false){
  const target=new Element(),box=nodes.get('lesson-finale');
  target.matches={'#lesson-finale':box,'[data-lesson-finale-next],[data-lesson-story]':target};
  if(story)target.matches['[data-lesson-story]']=target;
  ctx.event={type:'click',target,preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}};
  vm.runInContext('lessonGuard(event)',ctx);return ctx.event;
 }
 return {ctx,nodes,timers,app,click};
}
test('finale explanation closes on Next, resumes the bots and releases inert on the table',()=>{
 const b=boot();assert.equal(b.app.inert,true);assert.equal(b.nodes.get('lesson-finale').dataset.key,'trigger');
 assert.equal(b.timers.size,0);assert.equal(b.click().stopped,true);
 assert.equal(b.nodes.get('lesson-finale').dataset.key,'last-turns');
 b.click();assert.equal(b.nodes.has('lesson-finale'),false);assert.equal(b.app.inert,false);assert.ok(b.timers.size>0);
});
test('a completed lesson can show supportive results and return home through New Story',()=>{
 const b=boot(true),box=b.nodes.get('lesson-finale');assert.equal(box.dataset.key,'result');
 assert.ok(box.panel.innerHTML.includes('data-lesson-story'));assert.ok(box.panel.innerHTML.includes('Цього разу'));
 b.click(true);assert.equal(vm.runInContext('lesson',b.ctx),null);assert.equal(b.app.inert,false);
 assert.equal(b.nodes.has('lesson-finale'),false);assert.equal(b.timers.size,0);
});
test('viewing the results instead of starting over removes every finale input lock',()=>{
 const b=boot(true);b.click();assert.equal(b.app.inert,false);assert.equal(b.nodes.has('lesson-finale'),false);
 assert.equal(api.lessonFinaleInfo(b.ctx.fixture),null);assert.equal(b.timers.size,0);
});
