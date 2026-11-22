import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import fs from 'node:fs';
import{COLORS,CHARACTERS,makePlayer,makeRoom,action,view,botActor,botAction}from'../src/engine.js';import{prepareCharacters}from'./prepare.mjs';
function boot(){const owner=makePlayer('Host','secret'),room=makeRoom('ABCDEF',owner);action(room,owner.id,{type:'addBot'});action(room,owner.id,{type:'start'});prepareCharacters(room);while(room.phase==='draft'){const p=botActor(room);action(room,p.id,{type:'order',order:room.market[0].id});}action(room,owner.id,{type:'selectRecipe',order:owner.recipes[0].id});owner.recipes.find(r=>r.id===owner.current).colors[0]="red";owner.hand=[{id:'touch-card',name:'Лисичка',type:'ingredient',color:'red',points:2,negative:-2}];
 const listeners=new Map(),timers=new Map(),values=new Map(),classes={add(){},remove(){}},app={innerHTML:''},modal={innerHTML:'',contains(){return false;},querySelector(){return null;}},hand={scrollTop:100,scrollLeft:0},nodes=new Map([['#app',app],['#modal-root',modal],['#toast',{textContent:'',classList:classes}],['.table-hand',hand]]);let timerId=0;
 const context={console,URL,URLSearchParams,Map,Date,Math,Response,setTimeout(fn){timers.set(++timerId,fn);return timerId;},clearTimeout(id){timers.delete(id);},navigator:{vibrate(){}},location:{search:'',origin:'https://test.local'},localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)},KOREN_CATALOG:{COLORS,CHARACTERS},matchMedia(){return{matches:true};},getComputedStyle(){return{paddingTop:'0px',paddingBottom:'0px'};},addEventListener(){},document:{querySelector:s=>nodes.get(s)||null,querySelectorAll:()=>[],addEventListener(type,fn){const prior=listeners.get(type);listeners.set(type,prior?event=>{prior(event);fn(event);}:fn);},elementFromPoint(){return null;},documentElement:{style:{setProperty(){}}},body:{classList:classes,append(){}}}};context.window=context;vm.createContext(context);vm.runInContext(fs.readFileSync(new URL('../web/app.js',import.meta.url),'utf8'),context);vm.runInContext(fs.readFileSync(new URL('../web/tabletop.js',import.meta.url),'utf8'),context);vm.runInContext(fs.readFileSync(new URL('../web/feedback.js',import.meta.url),'utf8'),context);vm.runInContext(fs.readFileSync(new URL('../src/hex-layout.js',import.meta.url),'utf8').replace(/\bexport /g,''),context);vm.runInContext(fs.readFileSync(new URL('../web/characters.js',import.meta.url),'utf8'),context);context.__state=view(room,owner.id,1);vm.runInContext('applyState(__state);act=function(a){window.__lastMove=a;}',context);
 const card={dataset:{dragKind:'hand',cardId:'touch-card',owner:owner.id},closest(selector){if(selector==='.table-hand')return hand;if(selector.includes('[data-drag-kind]'))return this;return null;},setPointerCapture(){},matches(){return true;},cloneNode(){return{style:{},classList:classes,removeAttribute(){},remove(){}};},getBoundingClientRect(){return{width:90,height:120};}};
 const event=(x,y,target=card)=>({target,button:0,pointerId:1,pointerType:'touch',clientX:x,clientY:y,preventDefault(){}});return{context,listeners,timers,hand,card,event,owner};}
test('quick swipe starting on a card scrolls without selecting or playing it',()=>{const b=boot();b.listeners.get('pointerdown')(b.event(100,200));b.listeners.get('pointermove')(b.event(100,150));assert.equal(b.hand.scrollTop,150);assert.equal(vm.runInContext('dragging.active',b.context),false);b.listeners.get('pointerup')(b.event(100,150));assert.equal(b.context.__lastMove,undefined);assert.equal(vm.runInContext('selected',b.context),null);});
test('holding a touch card before moving starts drag and drops the correct owned card',()=>{const b=boot();b.listeners.get('pointerdown')(b.event(100,200));[...b.timers.values()].at(-1)();assert.equal(vm.runInContext('dragging.active',b.context),true);const brew={dataset:{drop:'brew',player:b.owner.id},closest(){return this;},classList:{add(){}}};b.context.document.elementFromPoint=()=>brew;b.listeners.get('pointermove')(b.event(100,130));b.listeners.get('pointerup')(b.event(100,130));assert.equal(b.context.__lastMove.type,'play');assert.equal(b.context.__lastMove.card,'touch-card');});
test('remote player opening an exchange moves this client to the market too',()=>{const b=boot(),s=structuredClone(b.context.__state);s.version++;s.exchange={id:'remote-trade',owner:s.players[1].id,card:{id:'offer',name:'Пропозиція',type:'ingredient',color:'blue',points:2,negative:-2},bids:[]};b.context.__remote=s;vm.runInContext('tableView="brew";applyState(__remote)',b.context);assert.equal(vm.runInContext('tableView',b.context),'trade');});
test('compact height budgeting fits a full card in both hand and table even with a short browser viewport',()=>{const b=boot();for(const height of[240,270,320,375,390]){const props=new Map();b.context.visualViewport={height};b.context.__root={style:{setProperty:(k,v)=>props.set(k,parseFloat(v))}};vm.runInContext('fitCompactTable(__root)',b.context);const card=props.get('--card-h'),table=height-props.get('--header-h')-props.get('--phase-h')-props.get('--hand-h');assert.ok(card<=table,JSON.stringify({height,card,table}));assert.ok(card<=props.get('--hand-h')-28);}});


test('map fitting updates actual board and piece dimensions after the station is resized',()=>{
 const b=boot(),props=new Map(),field={style:{setProperty:(k,v)=>props.set(k,v)}},layout={clientWidth:1290,style:{},querySelector:s=>s==='.hex-field'?field:null},station={clientHeight:900,querySelector:s=>s==='.hex-layout'?layout:null};
 const query=b.context.document.querySelector;b.context.document.querySelector=s=>s==='.hex-station'?station:query(s);
 vm.runInContext('fitHexMap()',b.context);
 const large=parseFloat(field.style.width);assert.ok(large>800);assert.equal(parseFloat(field.style.height),900);assert.ok(parseFloat(props.get('--hex-token-size'))>50);
 layout.clientWidth=460;station.clientHeight=280;vm.runInContext('fitHexMap()',b.context);
 assert.ok(parseFloat(field.style.width)<large);assert.equal(parseFloat(field.style.height),280);assert.equal(parseFloat(props.get('--hex-token-size')),26);
});


test('a distillation in hand highlights and targets a beyond-recipe ingredient',async()=>{
 const b=boot(),s=b.context.__state,me=s.players[0];
 s.phase='defense';me.hand=[{id:'distill-extra',type:'distill'}];
 me.brew=[{id:'over-unit',card:{id:'over-card',type:'ingredient',color:'red',points:1},slot:null,extra:true,attacks:[]}];
 b.context.__target={dataset:{drop:'ingredient',target:'over-unit',player:me.id}};
 vm.runInContext('state=__state',b.context);
 assert.equal(vm.runInContext('playable(state.players[0].hand[0])',b.context),true);
 assert.equal(vm.runInContext("legalTableTarget({kind:'hand',card:'distill-extra'},__target)",b.context),true);
 await vm.runInContext("tableDrop({kind:'hand',card:'distill-extra'},__target)",b.context);
 assert.equal(b.context.__lastMove.type,'white');assert.equal(b.context.__lastMove.target,'over-unit');
});
test('expanded stacks distinguish extra ingredients from named sabotage instead of numbering beyond-recipe slots',()=>{
 const b=boot(),s=b.context.__state,me=s.players[0];
 me.brew=[{id:'over-unit',card:{id:'own-extra',type:'ingredient'},slot:null,extra:true,attacks:[{id:'bad',card:{id:'bad-card'},from:'Бот 1',cancelled:false}]}];
 b.context.__unit={dataset:{brewIds:'over-unit'},closest(){return {dataset:{station:'brew:'+me.id}};}};
 vm.runInContext('state=__state',b.context);const cards=vm.runInContext('stackContents(__unit).cards',b.context);
 assert.equal(cards[0].label,'Поза рецептом');assert.equal(cards[1].label,'Саботаж');assert.equal(cards[1].sub,'Бот 1');
});
