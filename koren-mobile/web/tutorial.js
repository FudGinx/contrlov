'use strict';
/* The lesson runs the same authoritative engine locally, never a user's online room. */
let lesson=null,lessonTimer=null,lessonFrame=null,lessonUntil=0,lessonFocusKey='',lessonPanelStage='';
const lessonKey='koren-lesson-v1';
const lessonAPI=window.KOREN_LESSON;
const lessonBaseHome=home,lessonBaseRender=render,lessonBaseAct=act,lessonBasePoll=poll;
function lessonSave(){if(lesson)try{storage.setItem(lessonKey,JSON.stringify(lesson));}catch{}}
function lessonGuided(){return !!lesson&&lesson.stage!=='free';}
function lessonBlocked(){return busy||!!hexPlayback||Date.now()<lessonUntil;}
function lessonRemove(){clearTimeout(lessonTimer);cancelAnimationFrame(lessonFrame);lessonTimer=lessonFrame=null;document.getElementById('lesson-overlay')?.remove();document.getElementById('lesson-showcase')?.remove();app.inert=false;document.body.classList.remove('lesson-active');}
home=function(){if(lesson){lessonSave();lesson=null;lessonRemove();}lessonBaseHome();const actions=app.querySelector('.hero-actions');actions?.insertAdjacentHTML('beforeend','<button class="lesson-launch" data-lesson-start><span aria-hidden="true">✧</span> Навчання</button>');};
function startLesson(resume=false){
 clearTimeout(pollTimer);if(hexPlayback)cancelHexPlayback();closeModal();lessonRemove();
 try{lesson=resume?lessonAPI.restoreLesson(JSON.parse(storage.getItem(lessonKey))):lessonAPI.createLesson(storage.getItem('koren-name')||'Травниця');}catch{lesson=lessonAPI.createLesson();}
 state=null;seenTableRoom=null;seenTableSeq=0;tableSelection=null;selected=null;busy=false;lessonUntil=0;lessonFocusKey='';lessonPanelStage='';
 lessonPush();
}
function openLesson(){
 let saved;try{saved=lessonAPI.restoreLesson(JSON.parse(storage.getItem(lessonKey)));}catch{}
 if(saved){modal('Стежка Мавки',`<p>${saved.stage==='free'?'Збережена вільна партія після уроку.':'Урок збережено. Можна продовжити з останнього кроку.'}</p><div class="form-actions"><button data-lesson-resume>Продовжити</button><button class="ghost" data-lesson-new>Почати навчання спочатку</button><button class="ghost" data-act="close">Назад</button></div>`);}
 else startLesson();
}
function lessonPush(){lessonSave();const next=lessonAPI.lessonView(lesson);applyState(next);render();lessonSchedule();}
function lessonDelay(a){
 if(['hexMove','hexPerk'].includes(a.type))return Math.max(900,(lesson.s.animationUntil||0)-Date.now()+150);
 if(a.type==='resolve')return 2000;
 if(['play','react','white','tradeBid','tradeTake','tradeOpen'].includes(a.type))return 1450;
 return 900;
}
function lessonSchedule(){
 clearTimeout(lessonTimer);if(!lesson)return;
 const auto=lessonAPI.lessonInfo(lesson).mode==='auto',free=lesson.stage==='free';
 if(!auto&&!free)return;
 lessonTimer=setTimeout(()=>{
  if(!lesson)return;
  if(lessonBlocked()||dragging||hexDrag){lessonSchedule();return;}
  try{
   if(free){if(!lessonAPI.lessonFreeTick(lesson)){lessonTimer=setTimeout(lessonSchedule,700);return;}}
   else lessonAPI.lessonBotStep(lesson);
   const last=(lesson.s.events||[]).at(-1),travel=(lesson.s.events||[]).filter(e=>e.type==='hexTravel').at(-1);
   const wait=travel&&travel.seq===last?.seq?Math.max(1400,(lesson.s.animationUntil||0)-Date.now()+180):1450;
   lessonUntil=Date.now()+wait;lessonPush();
  }catch(e){lessonError(e);}
 },Math.max(600,lessonUntil-Date.now()+80));
}
function lessonError(error){
 console.error('lesson_error',lesson?.stage,error);busy=false;lessonUntil=0;clearTimeout(lessonTimer);
 const panel=document.querySelector('.lesson-panel');if(panel)panel.innerHTML='<h2>Стежка призупинилася</h2><p>'+esc(error.message)+'</p><button data-lesson-retry>Повторити крок</button><button class="ghost" data-lesson-exit>Зберегти та вийти</button>';
 toast(error.message);
}
act=async function(a){
 if(!lesson)return lessonBaseAct(a);
 if(lessonBlocked())return;
 try{
  if(lesson.stage==='free')lessonAPI.lessonFreeAction(lesson,a);else lessonAPI.lessonAction(lesson,a);
  closeModal();tableSelection=null;selected=null;lessonUntil=Date.now()+lessonDelay(a);lessonFocusKey='';lessonPush();
 }catch(e){toast(e.message);render();}
};
poll=async function(){if(!lesson)return lessonBasePoll();lessonSchedule();};
function lessonUI(){
 const l=lesson,id=l.ids,p=l.owner,expected=lessonAPI.lessonExpected(l),unit=l.s.players[0].brew.find(b=>b.card.id===id.nectar),attack=l.s.players[0].brew.flatMap(b=>b.attacks).find(a=>a.card.id===id.firstAttack);
 const hand=key=>'.table-hand [data-card-id="'+id[key]+'"]',brew='[data-station="brew:'+p+'"] [data-drop="brew"]';
 const pair=(source,target)=>({source,target,allowed:[source,target]});
 switch(l.stage){
  case'hero':return {target:'[data-character-choice="mavka"]',allowed:['[data-character-choice="mavka"]']};
  case'hand':return {target:'#lesson-showcase',allowed:[]};
  case'recipe':return {target:'[data-recipe-id="'+id.recipe+'"]',allowed:['[data-recipe-id="'+id.recipe+'"]']};
  case'place':return pair('.table-hand [data-recipe-id="'+id.recipe+'"]',brew);
  case'root':case'nectar':case'moss':case'final':return pair(hand(l.stage),brew);
  case'rootResult':return {target:'[data-station="brew:'+p+'"] [data-card-id="'+id.root+'"]',allowed:[]};
  case'nectarResult':case'springResult':return {target:'[data-station="brew:'+p+'"] [data-card-id="'+id.nectar+'"],.hex-unit-target [data-card-id="'+id.nectar+'"]',allowed:[]};
  case'stopFirst':case'stopFinal':return {target:'[data-act="stop"]',allowed:['[data-act="stop"]']};
  case'sabotage':case'wardResult':return {target:'[data-drop="attack"][data-target="'+attack?.id+'"]',allowed:[]};
  case'ward':return pair(hand('ward'),'[data-drop="attack"][data-target="'+attack?.id+'"]');
  case'finishFirst':case'end':return {target:'[data-folk-action="finishTurn"],[data-act="end"]',allowed:['[data-folk-action="finishTurn"]','[data-act="end"]']};
  case'move':return pair('[data-hex-token="'+p+'"]','[data-hex-tile="6"]');
  case'arrival':return {target:'.table-hand-area',allowed:[]};
  case'attackBot':return pair(hand('playerAttack'),'[data-station="brew:'+l.s.players[1].id+'"] [data-drop="brew"]');
  case'passBot':return {target:'[data-act="pass"]',allowed:['[data-act="pass"]']};
  case'openMap':return {target:'button[data-table-view="hex"]',allowed:['button[data-table-view="hex"]']};
  case'springInfo':return {target:'.hex-panel',allowed:[]};
  case'spring':return pair(hand('liquid'),'.hex-unit-target[data-target="'+unit?.id+'"]');
  case'openBrew':return {target:'button[data-table-view="brew"]',allowed:['button[data-table-view="brew"]']};
  case'tradeInfo':return {target:'.trade-target',allowed:[]};
  case'offer':return pair(hand('offer'),'.trade-target');
  case'take':return pair('[data-drag-kind="bid"][data-card-id="'+id.moss+'"]','.table-hand-area');
  case'tradeResult':return {target:hand('moss'),allowed:[]};
  case'mavka':return {target:'[data-zone="avatar:'+p+'"] [data-character]',allowed:[]};
  case'finalResult':case'negatives':return {target:'[data-station="brew:'+p+'"] [data-card-id="'+id.final+'"]',allowed:[]};
  case'score':return {target:'[data-lesson-score]',allowed:['[data-lesson-score]']};
  case'scoreResult':case'victory':return {target:'[data-zone="fame:'+p+'"]',allowed:[]};
  case'stay':return {target:'[data-hex-tile="6"]',allowed:['[data-hex-token="'+p+'"]','[data-hex-tile="6"]','[data-hex-action="stay"]']};
  default:return {target:null,allowed:[]};
 }
}
const LESSON_MAP_STAGES=new Set(['move','arrival','springInfo','spring','springResult','openBrew','stay']);
function lessonSetup(){
 const bots=lesson.stage==='bots',info=lessonAPI.lessonInfo(lesson),value=bots?2:3;
 app.innerHTML=`<main class="screen lesson-setup">${topBar()}<section><span class="eyebrow">Стежка Мавки · підготовка ${bots?'1':'2'}/2</span><h1>${info.title}</h1><p>${info.text}</p><label for="lesson-setting">${bots?'Скільки ботів?':'Готових зіль до фіналу'}</label><select id="lesson-setting" aria-label="${bots?'Кількість ботів':'Зіль до фіналу'}"><option value="">Оберіть…</option>${[1,2,3,4,5].map(n=>`<option value="${n}" ${n!==value?'disabled':''}>${n}${bots?' боти':' зілля'}</option>`).join('')}</select><button data-lesson-next disabled>Далі</button><small>Тут буде 2 суперники, один спільний стіл і знайомство з комбінаціями.</small><button class="ghost lesson-setup-exit" data-lesson-exit>Повернутися в меню</button></section><div class="lesson-setup-portrait">${tablePortrait({character:'mavka'})}</div></main>`;
}
function lessonShowcase(){
 if(lesson.stage!=='hand'){document.getElementById('lesson-showcase')?.remove();return;}
 if(document.getElementById('lesson-showcase'))return;
 const labels={root:'↪ продовжує варку',nectar:'×2 до майбутніх очок',ward:'ᛟ вимикає один мінус',liquid:'◈ оплата Джерела',final:'+3 під множником'};
 const el=document.createElement('section');el.id='lesson-showcase';el.setAttribute('aria-label','Стартові карти');
 el.innerHTML=Object.entries(labels).map(([key,label])=>{const c=lesson.s.players[0].hand.find(c=>c.id===lesson.ids[key]);return '<div>'+tableCard(c)+'<b>'+label+'</b></div>';}).join('');document.body.append(el);
}
function lessonOverlay(){
 if(!lessonGuided()){lessonRemove();return;}
 document.body.classList.add('lesson-active');lessonShowcase();
 if(lesson.stage==='ward'&&!dragging){const target=document.querySelector('[data-drop="attack"]')?.closest('.table-unit');if(target&&!target.classList.contains('stack-fan-open'))openReadingStack(target);}
 let overlay=document.getElementById('lesson-overlay');
 if(!overlay){overlay=document.createElement('div');overlay.id='lesson-overlay';overlay.innerHTML='<svg class="lesson-shade" aria-hidden="true"><defs><mask id="lesson-cut"><rect width="100%" height="100%" fill="white"/><g class="lesson-holes"></g></mask></defs><rect width="100%" height="100%" fill="#020e0b" fill-opacity=".74" mask="url(#lesson-cut)"/></svg><svg class="lesson-guide" aria-hidden="true"></svg><div class="lesson-rings"></div><section class="lesson-panel" role="region" aria-label="Пояснення навчання"></section>';document.body.append(overlay);}
 const info=lessonAPI.lessonInfo(lesson),panel=overlay.querySelector('.lesson-panel'),stages=Object.keys(lessonAPI.LESSON_STAGES),n=Math.max(0,stages.indexOf(lesson.stage)-2),total=stages.length-4;
 app.inert=info.mode!=='action';
 if(lessonPanelStage!==lesson.stage){
  lessonPanelStage=lesson.stage;const portrait=lesson.stage==='mavka'?'<div class="lesson-mavka">'+tablePortrait({character:'mavka'})+'<b>Мавка · Моховий настил</b></div>':'';
  panel.innerHTML=`<div class="lesson-progress"><span>Стежка Мавки</span><span>${Math.min(n,total)}/${total}</span></div><div class="lesson-progress-track"><i style="width:${Math.round(n/total*100)}%"></i></div>${portrait}<h2>${esc(info.title)}</h2><p>${esc(info.text)}</p>${info.mode==='next'?`<button data-lesson-next ${lessonBlocked()?'disabled':''}>${lesson.stage==='done'?'Грати вільно':'Далі'}</button>`:info.mode==='auto'?'<span class="lesson-working">✧ Стежте за дією…</span>':'<div class="lesson-action-hint">Тягніть карту · або торкніться карти, потім цілі</div>'}${lesson.stage==='mavka'?'<p class="lesson-perk-rule">Перк витрачається лише після наступного доданого інгредієнта. Один раз за зілля.</p>':''}`;
 }
 overlay.dataset.stage=lesson.stage;overlay.dataset.mode=info.mode;
 cancelAnimationFrame(lessonFrame);lessonFrame=requestAnimationFrame(lessonPosition);
}
function lessonPosition(){
 if(!lessonGuided()||['bots','goal'].includes(lesson.stage))return;
 const overlay=document.getElementById('lesson-overlay');if(!overlay)return;
 const ui=lessonUI(),nodes=[ui.source,ui.target].filter(Boolean).map(s=>document.querySelector(s)).filter(Boolean),rects=nodes.map(e=>{const r=e.getBoundingClientRect();if(e.dataset.drop==='brew'&&r.width>250)return {x:r.right-160,y:r.y+12,right:r.right,bottom:r.bottom-12,width:160,height:r.height-24};return r;}).filter(r=>r.width>0&&r.height>0);
 const locked=lessonBlocked(),next=overlay.querySelector('[data-lesson-next]');if(next){next.disabled=locked;next.setAttribute('aria-disabled',String(locked));}
 overlay.classList.toggle('lesson-animating',locked);overlay.querySelector('.lesson-holes').innerHTML=rects.map(r=>`<rect x="${r.x-6}" y="${r.y-6}" width="${r.width+12}" height="${r.height+12}" rx="12" fill="black"/>`).join('');
 overlay.querySelector('.lesson-rings').innerHTML=rects.map((r,i)=>`<div class="lesson-ring ${i===0&&ui.source?'lesson-source':'lesson-destination'}" style="left:${r.x-5}px;top:${r.y-5}px;width:${r.width+10}px;height:${r.height+10}px"></div>`).join('');
 const panel=overlay.querySelector('.lesson-panel'),w=window.innerWidth,h=window.innerHeight;
 let left=w-panel.offsetWidth-12,top=Math.max(75,Math.round((h-panel.offsetHeight)/2));
 if(lesson.stage==='hand'){left=w-panel.offsetWidth-12;top=12;}
 else{
  const candidates=[left,12,Math.round((w-panel.offsetWidth)/2)].flatMap(x=>[top,8,Math.max(8,h-panel.offsetHeight-8)].map(y=>({x,y})));
  const overlap=c=>rects.reduce((sum,r)=>sum+Math.max(0,Math.min(c.x+panel.offsetWidth,r.right)-Math.max(c.x,r.x))*Math.max(0,Math.min(c.y+panel.offsetHeight,r.bottom)-Math.max(c.y,r.y)),0);
  candidates.sort((a,b)=>overlap(a)-overlap(b));left=candidates[0].x;top=candidates[0].y;
 }
 panel.style.left=Math.max(6,left)+'px';panel.style.top=Math.max(6,Math.min(top,h-panel.offsetHeight-6))+'px';
 const guide=overlay.querySelector('.lesson-guide');
 if(ui.source&&rects.length===2&&!locked&&!tableSelection){const [a,b]=rects,sx=a.x+a.width/2,sy=a.y+a.height/2,tx=b.x+b.width/2,ty=b.y+b.height/2;guide.innerHTML=`<path d="M${sx} ${sy} Q${sx} ${Math.min(sy,ty)-30} ${tx} ${ty}"/><circle r="9"><animateMotion dur="2.2s" repeatCount="indefinite" path="M${sx} ${sy} Q${sx} ${Math.min(sy,ty)-30} ${tx} ${ty}"/></circle>`;}else guide.innerHTML='';
 const key=lesson.stage+':'+(tableSelection?'picked':'source');
 if(lessonFocusKey!==key&&!locked){lessonFocusKey=key;const node=nodes[0];
  if(node&&lessonAPI.lessonInfo(lesson).mode==='action'){
   const hand=node.closest('.table-hand'),choices=node.closest('.character-choices'),cards=node.closest('.trade-cards');
   const area=hand||choices||cards;if(area)node.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
  }
  const target=ui.target&&document.querySelector(ui.target);if(target?.classList.contains('hex-unit-target'))target.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
 }
 lessonFrame=requestAnimationFrame(lessonPosition);
}
render=function(){
 if(lesson&&['bots','goal'].includes(lesson.stage)){lessonRemove();lessonSetup();return;}
 if(lessonGuided()){
  if(LESSON_MAP_STAGES.has(lesson.stage))tableView='hex';
  else if(['bids','take'].includes(lesson.stage))tableView='trade';
  else if(!['openMap','openBrew'].includes(lesson.stage)&&!hexPlayback){tableView='brew';tablePlayer=lesson.stage.startsWith('botOne')||lesson.stage==='attackBot'||lesson.stage==='attackResult'?lesson.s.players[1].id:lesson.stage.startsWith('botTwo')||lesson.stage==='passBot'?lesson.s.players[2].id:lesson.owner;}
 }
 lessonBaseRender();if(lesson){document.querySelector('[data-act="invite"]')?.remove();}if(lessonGuided())lessonOverlay();
};
const lessonBaseInspect=inspectTable;inspectTable=function(el){if(lessonGuided()){if(el.dataset.dragKind){tableSelection=tableGestureSource(el);selected=tableSelection.kind==='hand'?tableSelection.card:null;render();}return;}return lessonBaseInspect(el);};
const lessonBaseTile=tile;tile=function(r,clickable=true){return lessonGuided()?recipeCard(r,null,'order'):lessonBaseTile(r,clickable);};
const lessonBaseBell=phaseBell;phaseBell=function(){return lesson?.stage==='score'?'<button class="turn-bell" data-lesson-score>✦<span>Здати зілля</span></button>':lessonBaseBell();};
function lessonNextUI(){
 if(lessonBlocked())return;
 try{lessonAPI.lessonNext(lesson);tableSelection=null;selected=null;lessonFocusKey='';lessonPanelStage='';lessonPush();if(lesson.stage==='free'){lessonRemove();toast('Вільна гра. Тепер рішення за вами!');}}
 catch(e){toast(e.message);}
}
/* Window capture runs before the normal game's document handlers. */
function lessonGuard(e){
 const el=e.target instanceof Element?e.target:null;if(!el)return;
 const stop=()=>{e.preventDefault();e.stopImmediatePropagation();};
 if(e.type==='click'&&el.closest('[data-lesson-start],[data-lesson-new],[data-lesson-resume]')){stop();el.closest('[data-lesson-resume]')?startLesson(true):el.closest('[data-lesson-new]')?startLesson():openLesson();return;}
 if(!lesson)return;
 if(e.type==='click'&&el.closest('[data-lesson-exit]')){stop();home();return;}
 if(e.type==='click'&&el.closest('[data-lesson-retry]')){stop();lessonPanelStage='';lessonPush();return;}
 if(lesson.stage==='free')return;
 if(el.closest('.lesson-panel')||el.closest('.lesson-setup')){
  if(e.type==='click'&&el.closest('[data-lesson-next]')){stop();lessonNextUI();return;}
  if(el.closest('#lesson-setting'))return;
  if(e.type==='keydown'&&el.closest('[data-lesson-next]')&&['Enter',' ','Tab'].includes(e.key))return;
  if(['wheel','pointerdown','pointermove','pointerup','pointercancel'].includes(e.type))return;
  stop();return;
 }
 const info=lessonAPI.lessonInfo(lesson),ui=lessonUI(),matches=ui.allowed.some(s=>el.closest(s));
 if(info.mode!=='action'||lessonBlocked()){stop();return;}
 if(['pointermove','pointerup','pointercancel','lostpointercapture'].includes(e.type)&&(dragging||hexDrag))return;
 if(e.type==='wheel'&&el.closest('.table-hand,.hex-panel,.hex-overlay,.character-choices,.table-camera,.recipe-market'))return;
 if(!matches){stop();return;}
 if(e.type==='pointerdown'&&ui.source&&el.closest(ui.source)){setTimeout(()=>{if(lessonGuided()&&dragging?.source&&!dragging.active&&!dragging.scrolling)startTableDrag(dragging);},240);}
 if(e.type!=='click')return;
 if(Date.now()<suppressTableClick){stop();return;}
 if(el.closest('[data-lesson-score]')){stop();act({type:'resolve'});return;}
 if(['openMap','openBrew'].includes(lesson.stage)&&el.closest('[data-table-view]')){
  stop();const destination=el.closest('[data-table-view]').dataset.tableView;
  try{lessonAPI.lessonNavigate(lesson,destination);tableView=destination;hexMenu=me().hex;lessonPanelStage='';lessonPush();}catch(error){toast(error.message);}return;
 }
 if(lesson.stage==='recipe'){stop();act(lessonAPI.lessonExpected(lesson));return;}
 if(lesson.stage==='move'&&el.closest('[data-hex-tile="6"]')){stop();act({type:'hexMove',hex:6});return;}
 if(lesson.stage==='stay'&&el.closest('[data-hex-token],[data-hex-tile]')){stop();hexMenu=6;render();return;}
 if(ui.source&&el.closest(ui.source)&&!el.closest('.lesson-panel')){
  const source=el.closest(ui.source);
  if(source.dataset.dragKind){stop();tableSelection=tableGestureSource(source);selected=tableSelection.kind==='hand'?tableSelection.card:null;render();return;}
 }
 if(tableSelection&&ui.target&&el.closest(ui.target)){
  stop();const src=tableSelection;tableSelection=null;selected=null;tableDrop(src,el.closest(ui.target));
 }
}
for(const type of ['pointerdown','pointermove','pointerup','pointercancel','lostpointercapture','click','dblclick','contextmenu','wheel','keydown'])window.addEventListener(type,lessonGuard,{capture:true,passive:false});
window.addEventListener('change',e=>{if(!lesson||e.target.id!=='lesson-setting')return;const correct=lesson.stage==='bots'?'2':'3';document.querySelector('.lesson-setup [data-lesson-next]').disabled=e.target.value!==correct;},true);
window.addEventListener('pagehide',lessonSave);
if(!state)home();
