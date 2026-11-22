'use strict';
/* The lesson runs the same authoritative engine locally, never a user's online room. */
let lesson=null,lessonTimer=null,lessonFrame=null,lessonUntil=0,lessonFocusKey='',lessonPanelStage='';
const lessonKey='koren-lesson-v2';
let lessonFinaleTimer=null,lessonFinaleFocus='';
const lessonAPI=window.KOREN_LESSON;
function lessonFirefly(name='panel'){
 return '<svg class="lesson-firefly" viewBox="0 0 100 100" role="img" aria-label="Світлячок-провідник"><defs><radialGradient id="fly-'+name+'"><stop stop-color="#fffbd2"/><stop offset=".4" stop-color="#e5ee8b" stop-opacity=".7"/><stop offset="1" stop-color="#b3da6d" stop-opacity="0"/></radialGradient></defs><circle class="firefly-aura" cx="50" cy="60" r="39" fill="url(#fly-'+name+')"/><g class="firefly-body"><g class="firefly-wing wing-left"><path d="M46 47C8 7 7 55 43 62Z" fill="#b6d8b1" fill-opacity=".8" stroke="#edf3ba" stroke-width="1.5"/></g><g class="firefly-wing wing-right"><path d="M54 47C92 7 93 55 57 62Z" fill="#b6d8b1" fill-opacity=".8" stroke="#edf3ba" stroke-width="1.5"/></g><path d="M41 58Q50 48 59 58L61 73Q50 90 39 73Z" fill="#f5dd70" stroke="#c9ae57" stroke-width="2"/><path d="M40 65h20M41 72h18" stroke="#aa934c" stroke-width="2"/><ellipse cx="50" cy="45" rx="14" ry="16" fill="#244e3b" stroke="#cadb93" stroke-width="2"/><path d="M43 31 38 23M57 31 62 23" stroke="#dfe5a7" stroke-width="2"/><circle cx="44" cy="43" r="3" fill="#fff7c7"/><circle cx="56" cy="43" r="3" fill="#fff7c7"/><path d="M46 51Q50 54 54 51" fill="none" stroke="#c4dba3" stroke-width="1.5"/></g></svg>';
}
const portraitBeforeLessonFix=tablePortrait;
tablePortrait=function(p){const c=ch(p);if(!c)return portraitBeforeLessonFix(p);const folk=c.portraitSet==='folklore-v3',selected=c.portraitSet==='new-perks-v1',index=selected?c.portrait-12:c.portrait||0,grid=portraitViewBox(selected?2:4,selected||folk?2:3,index),asset=folk?'folklore-v3':selected?'selected-characters-v1':'character-atlas';return '<span class="table-portrait portrait-cropped"><svg class="portrait-window" viewBox="'+grid.viewBox+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><image href="/assets/'+asset+'.webp" width="'+grid.width+'" height="'+grid.height+'"/></svg></span>';};
function lessonElementRect(el){
 if(!el)return null;
 if(tableView==='hex'&&el.closest('[data-station^="brew:"]'))return null;
 const clips=[];for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(/auto|scroll|hidden|clip/.test(s.overflow+s.overflowX+s.overflowY))clips.push(p.getBoundingClientRect());}
 return lessonClipRect(el.getBoundingClientRect(),{width:innerWidth,height:innerHeight},clips);
}
function lessonExplore(){
 lesson.exploring=true;closeModal();document.getElementById('lesson-overlay')?.remove();document.getElementById('lesson-showcase')?.remove();cancelAnimationFrame(lessonFrame);app.inert=false;document.body.classList.remove('lesson-active');
 render();lessonSave();
}
function lessonExploreBar(){
 document.getElementById('lesson-explore')?.remove();
 const box=document.createElement('aside');box.id='lesson-explore';box.innerHTML=lessonFirefly('explore')+'<div><b>Огляньте стіл</b><span>Можна оглядати карти, персонажів, мапу та скид. Гра на паузі.</span></div><button data-lesson-continue>Продовжити навчання</button>';document.body.append(box);
}
function lessonInspectPublic(el){
 const portrait=el.closest('[data-character]');if(portrait){inspectCharacter(portrait.dataset.character);return;}
 const pile=el.closest('[data-zone="discard"],[data-map-zone="discard"]');if(pile){modal('Відкритий скид','<p>'+lesson.s.discard.length+' карт. Тапніть карту для великого огляду.</p><div class="lesson-discard-view">'+[...lesson.s.discard].reverse().map(c=>tableCard(c)).join('')+'</div>',true);return;}
 if(el.closest('[data-zone="deck"]')){modal('Спільна колода','<p>'+lesson.s.deck.length+' закритих карт. Урожай, рух та ефекти добору дають нові карти. Коли колода закінчиться, скид перемішується.</p>');return;}
 const card=el.closest('[data-card-id],[data-recipe-id]');if(card){lessonBaseInspect(card);modalRoot.querySelector('[data-inspect-select]')?.remove();return;}
 const tile=el.closest('[data-hex-tile]');if(tile){const hex=state.hexMap.tiles[Number(tile.dataset.hexTile)];modal(hex.name,'<p>'+esc(hex.rule)+'</p><p>Урожай: '+hex.count+' карт.</p>');}
}


function lessonClearFinale(){
 clearTimeout(lessonFinaleTimer);lessonFinaleTimer=null;
 const box=document.getElementById('lesson-finale');if(box){box.remove();app.inert=false;}
 document.querySelectorAll('.lesson-finale-mark').forEach(el=>el.classList.remove('lesson-finale-mark'));
}
function lessonResultBanner(){
 if(state?.status!=='finished')return;
 const info=lessonAPI.lessonResultInfo(lesson||{stage:'free',owner:state.me,s:state});
 if(!info||document.getElementById('lesson-result-message'))return;
 const title=app.querySelector('.lobby h1');
 title?.insertAdjacentHTML('afterend','<section id="lesson-result-message" class="lesson-result-message '+info.outcome+'" aria-label="Підсумки пригоди">'+lessonFirefly('result')+'<div><h2>'+esc(info.title)+'</h2><p>'+esc(info.text)+'</p></div></section>');
 app.querySelector('.form-actions [data-act="home"]')?.classList.add('story-invite');
}
const lessonBaseResults=results;
results=function(){lessonBaseResults();lessonResultBanner();};
function lessonFinaleOverlay(){
 clearTimeout(lessonFinaleTimer);lessonFinaleTimer=null;
 const info=lesson&&lessonAPI.lessonFinaleInfo(lesson);
 if(!info){lessonClearFinale();return;}
 clearTimeout(lessonTimer);lessonTimer=null;
 if(lessonBlocked()||dragging||hexDrag){lessonFinaleTimer=setTimeout(()=>{if(lesson?.stage==='free')render();},120);return;}
 let overlay=document.getElementById('lesson-finale');
 if(!overlay){closeModal();tableSelection=null;selected=null;overlay=document.createElement('div');overlay.id='lesson-finale';overlay.innerHTML='<section class="lesson-finale-panel" role="dialog" aria-modal="true" aria-labelledby="lesson-finale-title"></section>';document.body.append(overlay);}
 app.inert=true;overlay.dataset.key=info.key;
 const panel=overlay.querySelector('.lesson-finale-panel');
 if(panel.dataset.key!==info.key){
  panel.dataset.key=info.key;
  panel.innerHTML='<div class="lesson-guide-heading">'+lessonFirefly('finale')+'<span>Світлячок · фінал історії</span></div><h2 id="lesson-finale-title">'+esc(info.title)+'</h2><p>'+esc(info.text)+'</p><footer>'+(info.kind==='result'?'<button data-lesson-story>Нова історія</button><button class="ghost" data-lesson-finale-next>Переглянути підсумки</button>':'<button data-lesson-finale-next>Далі</button>')+'</footer>';
  panel.querySelector('button')?.focus({preventScroll:true});
 }
 document.querySelectorAll('.lesson-finale-mark').forEach(el=>el.classList.remove('lesson-finale-mark'));
 if(info.focus)[...document.querySelectorAll('[data-zone]')].find(el=>el.dataset.zone==='avatar:'+info.focus)?.classList.add('lesson-finale-mark');
}

const lessonBaseHome=home,lessonBaseRender=render,lessonBaseAct=act,lessonBasePoll=poll;
function lessonSave(){if(lesson)try{storage.setItem(lessonKey,JSON.stringify(lesson));}catch{}}
function lessonGuided(){return !!lesson&&lesson.stage!=='free';}
function lessonBlocked(){return busy||!!hexPlayback||Date.now()<lessonUntil;}
function lessonRemove(){lessonClearFinale();clearTimeout(lessonTimer);cancelAnimationFrame(lessonFrame);lessonTimer=lessonFrame=null;document.getElementById('lesson-overlay')?.remove();document.getElementById('lesson-showcase')?.remove();document.getElementById('lesson-explore')?.remove();app.inert=false;document.body.classList.remove('lesson-active');}
home=function(){if(lesson){lessonSave();lesson=null;lessonRemove();}lessonBaseHome();const actions=app.querySelector('.hero-actions');actions?.insertAdjacentHTML('beforeend','<button class="lesson-launch" data-lesson-start><span aria-hidden="true">✧</span> Навчання</button>');};
function startLesson(resume=false){
 clearTimeout(pollTimer);if(hexPlayback)cancelHexPlayback();closeModal();lessonRemove();lessonFinaleFocus='';
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
 clearTimeout(lessonTimer);if(!lesson||lesson.exploring)return;
 if(lesson.stage==='free'&&(lessonAPI.lessonFinaleInfo(lesson)||lesson.s.status==='finished'))return;
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
 if(lesson.exploring){if(a.type!=='hexShow')toast('Оглядаємо стіл. Щоб грати далі, продовжіть навчання.');return;}
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
  case'rootInspect':return {target:'[data-station="brew:'+p+'"] [data-card-id="'+id.root+'"]',allowed:['[data-station="brew:'+p+'"] [data-card-id="'+id.root+'"]']};
  case'rootResult':return {anchor:'.lesson-inspect-modal .inspect-copy',target:'.lesson-inspect-modal .inspect-card',extra:['.lesson-inspect-modal .inspect-grid'],allowed:[]};
  case'rootResultUnused':return {target:'[data-station="brew:'+p+'"] [data-card-id="'+id.root+'"]',allowed:[]};
  case'nectarResult':case'springResult':return {extra:['[data-station="brew:'+p+'"] .combo-meter','[data-station="brew:'+p+'"] .amplifier-state'],target:'[data-station="brew:'+p+'"] [data-card-id="'+id.nectar+'"],.hex-unit-target [data-card-id="'+id.nectar+'"]',allowed:[]};
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
  case'mavka':return {extra:['[data-station="brew:'+p+'"] .combo-meter','[data-station="brew:'+p+'"] .amplifier-state'],target:'[data-zone="avatar:'+p+'"] [data-character]',allowed:[]};
  case'finalResult':case'negatives':return {target:'[data-station="brew:'+p+'"] [data-card-id="'+id.final+'"]',allowed:[]};
  case'score':return {target:'[data-lesson-score]',allowed:['[data-lesson-score]']};
  case'scoreResult':case'victory':return {target:'[data-zone="fame:'+p+'"]',allowed:[]};
  case'finalMove':return {source:'[data-hex-token="'+p+'"]',target:'[data-hex-tile="5"]',allowed:['[data-hex-token="'+p+'"]','[data-hex-tile="5"]']};
  case'openOrders':return {target:'button[data-table-view="orders"]',allowed:['button[data-table-view="orders"]']};
  case'newOrder':return {source:'[data-station="orders"] [data-recipe-id="'+id.nextRecipe+'"]',target:'.table-hand-area',allowed:['[data-station="orders"] [data-recipe-id="'+id.nextRecipe+'"]','.table-hand-area']};
  case'newOrderResult':return {target:'.table-hand [data-recipe-id="'+id.nextRecipe+'"]',allowed:[]};
  case'harvestAgain':return {target:'.table-hand-area',allowed:[]};
  case'stayUnused':return {target:'[data-hex-tile="6"]',allowed:['[data-hex-token="'+p+'"]','[data-hex-tile="6"]','[data-hex-action="stay"]']};
  default:return {target:null,allowed:[]};
 }
}
const LESSON_MAP_STAGES=new Set(['move','arrival','springInfo','spring','finalMove']);
function lessonSetup(){
 const bots=lesson.stage==='bots',info=lessonAPI.lessonInfo(lesson),value=bots?2:3;
 app.innerHTML=`<main class="screen lesson-setup">${topBar()}<section><span class="eyebrow">Стежка Мавки · підготовка ${bots?'1':'2'}/2</span><div class="lesson-guide-heading">${lessonFirefly()}<span>Світлячок · ваш провідник</span></div><h1>${info.title}</h1><p>${info.text}</p><label for="lesson-setting">${bots?'Скільки ботів?':'Готових зіль до фіналу'}</label><select id="lesson-setting" aria-label="${bots?'Кількість ботів':'Зіль до фіналу'}"><option value="">Оберіть…</option>${[1,2,3,4,5].map(n=>`<option value="${n}" ${n!==value?'disabled':''}>${n}${bots?' боти':' зілля'}</option>`).join('')}</select><button data-lesson-next disabled>Далі</button><small>Тут буде 2 суперники, один спільний стіл і знайомство з комбінаціями.</small><button class="ghost lesson-setup-exit" data-lesson-exit>Повернутися в меню</button></section><div class="lesson-setup-portrait">${tablePortrait({character:'mavka'})}</div></main>`;
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
 if(lesson.stage==='rootResult'&&!modalRoot.querySelector('.lesson-inspect-modal')){
  const card=document.querySelector('[data-station="brew:'+lesson.owner+'"] [data-card-id="'+lesson.ids.root+'"]');
  if(card){lessonBaseInspect(card);const box=modalRoot.querySelector('.modal');box?.classList.add('lesson-inspect-modal');box?.querySelector('.close')?.remove();box?.querySelector('[data-inspect-select]')?.remove();}
 }
 if(lesson.stage==='ward'&&!dragging){const target=document.querySelector('[data-drop="attack"]')?.closest('.table-unit');if(target&&!target.classList.contains('stack-fan-open'))openReadingStack(target);}
 let overlay=document.getElementById('lesson-overlay');
 if(!overlay){overlay=document.createElement('div');overlay.id='lesson-overlay';overlay.innerHTML='<svg class="lesson-shade" aria-hidden="true"><defs><mask id="lesson-cut"><rect width="100%" height="100%" fill="white"/><g class="lesson-holes"></g></mask></defs><rect width="100%" height="100%" fill="#020e0b" fill-opacity=".32" mask="url(#lesson-cut)"/></svg><svg class="lesson-guide" aria-hidden="true"></svg><div class="lesson-rings"></div><section class="lesson-panel" role="region" aria-label="Пояснення навчання"></section>';document.body.append(overlay);}
 const info=lessonAPI.lessonInfo(lesson),panel=overlay.querySelector('.lesson-panel'),stages=Object.keys(lessonAPI.LESSON_STAGES),n=Math.max(0,stages.indexOf(lesson.stage)-2),total=stages.length-4;
 app.inert=info.mode!=='action';
 if(lessonPanelStage!==lesson.stage){
  lessonPanelStage=lesson.stage;const portrait=lesson.stage==='mavka'?'<div class="lesson-mavka">'+tablePortrait({character:'mavka'})+'<b>Мавка · Моховий настил</b></div>':'';
  panel.innerHTML=`<div class="lesson-progress"><span>Стежка Мавки</span><span>${Math.min(n,total)}/${total}</span></div><div class="lesson-progress-track"><i style="width:${Math.round(n/total*100)}%"></i></div><div class="lesson-guide-heading">${lessonFirefly()}<span>Світлячок підказує</span></div>${portrait}<h2>${esc(info.title)}</h2><p>${esc(info.text)}</p>${info.mode==='next'?`<button data-lesson-next ${lessonBlocked()?'disabled':''}>${lesson.stage==='done'?'Грати вільно':'Далі'}</button>`:info.mode==='auto'?'<span class="lesson-working">✧ Стежте за дією…</span>':'<div class="lesson-action-hint">Тягніть карту · або торкніться карти, потім цілі</div>'}${lesson.stage==='mavka'?'<p class="lesson-perk-rule">Перк витрачається лише після наступного доданого інгредієнта. Один раз за зілля.</p>':''}`;
 }
 overlay.dataset.stage=lesson.stage;overlay.dataset.mode=info.mode;
 cancelAnimationFrame(lessonFrame);lessonFrame=requestAnimationFrame(lessonPosition);
}
function lessonPosition(){
 if(!lessonGuided()||lesson.exploring||['bots','goal'].includes(lesson.stage))return;
 const overlay=document.getElementById('lesson-overlay');if(!overlay)return;
 const ui=lessonUI(),nodes=[ui.source,ui.target,...(ui.extra||[])].filter(Boolean).flatMap(s=>[...document.querySelectorAll(s)]).filter((e,i,a)=>a.indexOf(e)===i),rects=nodes.map(lessonElementRect).filter(Boolean),locked=lessonBlocked(),next=overlay.querySelector('[data-lesson-next]');
 if(next)next.disabled=locked;overlay.classList.toggle('lesson-animating',locked);
 overlay.querySelector('.lesson-holes').innerHTML=rects.map(r=>'<rect x="'+(r.x-6)+'" y="'+(r.y-6)+'" width="'+(r.width+12)+'" height="'+(r.height+12)+'" rx="12" fill="black"/>').join('');
 overlay.querySelector('.lesson-rings').innerHTML=rects.map((r,i)=>'<div class="lesson-ring '+(i===0&&ui.source?'lesson-source':'lesson-destination')+'" style="left:'+(r.x-5)+'px;top:'+(r.y-5)+'px;width:'+(r.width+10)+'px;height:'+(r.height+10)+'px"></div>').join('');
 const panel=overlay.querySelector('.lesson-panel'),w=innerWidth,h=innerHeight,showcase=document.getElementById('lesson-showcase');
 if(showcase){const s=lessonPreviewSize(w,h);showcase.style.setProperty('--lesson-card-w',s.cardWidth+'px');showcase.style.setProperty('--lesson-card-h',s.cardHeight+'px');showcase.style.gap=s.gap+'px';showcase.style.padding=s.padding+'px';showcase.style.left=Math.max(12,(w-s.width-panel.offsetWidth-24)/2)+'px';}
 const anchorSelector=ui.anchor||ui.source||ui.target;
 const anchor=anchorSelector?lessonElementRect(document.querySelector(anchorSelector)):null;
 let pos=lessonPanelPosition(anchor,panel.offsetWidth,panel.offsetHeight,{width:w,height:h},rects);
 if(lesson.stage==='hand'&&showcase){const r=showcase.getBoundingClientRect();pos={left:r.right+20,top:(h-panel.offsetHeight)/2,side:'right'};}
 if(lesson.stage==='rootResult'&&anchor)pos={left:anchor.x,top:anchor.y,side:'right'};
 panel.style.left=Math.max(8,Math.min(pos.left,w-panel.offsetWidth-8))+'px';panel.style.top=Math.max(8,Math.min(pos.top,h-panel.offsetHeight-8))+'px';
 const guide=overlay.querySelector('.lesson-guide'),from=lessonElementRect(ui.source&&document.querySelector(ui.source)),to=lessonElementRect(ui.target&&document.querySelector(ui.target));
 if(from&&to&&!locked&&!tableSelection){const sx=Math.round(from.x+from.width/2),sy=Math.round(from.y+from.height/2),tx=Math.round(to.x+to.width/2),ty=Math.round(to.y+to.height/2),path='M'+sx+' '+sy+' Q'+sx+' '+(Math.min(sy,ty)-30)+' '+tx+' '+ty;if(guide.dataset.path!==path){guide.dataset.path=path;guide.innerHTML='<path class="lesson-travel-path" d="'+path+'"/><g>'+lessonFirefly('trail').replace('<svg ','<svg x="-24" y="-24" width="48" height="48" ')+'<animateMotion dur="2.6s" repeatCount="indefinite" path="'+path+'"/></g>';}}
 else if(guide.dataset.path){delete guide.dataset.path;guide.innerHTML='';}
 const key=lesson.stage+':'+(tableSelection?'picked':'source');if(lessonFocusKey!==key&&!locked){lessonFocusKey=key;const node=nodes[0];if(node&&lessonAPI.lessonInfo(lesson).mode==='action'&&node.closest('.table-hand,.character-choices,.trade-cards'))node.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});const target=ui.target&&document.querySelector(ui.target);if(target?.classList.contains('hex-unit-target'))target.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
 lessonFrame=requestAnimationFrame(lessonPosition);
}

render=function(){
 const finale=lesson&&lessonAPI.lessonFinaleInfo(lesson);
 if(finale?.focus&&!hexPlayback&&lessonFinaleFocus!==finale.key){lessonFinaleFocus=finale.key;tableView='brew';tablePlayer=finale.focus;}
 if(lesson?.exploring){lessonBaseRender();lessonExploreBar();return;}
 if(lesson&&['bots','goal'].includes(lesson.stage)){lessonRemove();lessonSetup();return;}
 if(lessonGuided()){
  if(LESSON_MAP_STAGES.has(lesson.stage))tableView='hex';
  else if(['bids','take'].includes(lesson.stage))tableView='trade';
  else if(lesson.stage==='newOrder')tableView='orders';
  else if(!['openMap','openBrew','openOrders'].includes(lesson.stage)&&!hexPlayback){tableView='brew';tablePlayer=lesson.stage==='orderWait'?lesson.s.players[lesson.s.turn].id:lesson.stage.startsWith('botOne')||lesson.stage==='attackBot'||lesson.stage==='attackResult'?lesson.s.players[1].id:lesson.stage.startsWith('botTwo')||lesson.stage==='passBot'?lesson.s.players[2].id:lesson.owner;}
 }
 lessonBaseRender();if(lesson){document.querySelector('[data-act="invite"]')?.remove();}if(lessonGuided())lessonOverlay();else if(lesson?.stage==='free')lessonFinaleOverlay();
};
const lessonBaseInspect=inspectTable;inspectTable=function(el){if(lesson?.exploring){lessonInspectPublic(el);return;}if(lessonGuided()){if(el.dataset.dragKind){tableSelection=tableGestureSource(el);selected=tableSelection.kind==='hand'?tableSelection.card:null;render();}return;}return lessonBaseInspect(el);};
const lessonBaseTile=tile;tile=function(r,clickable=true){return lessonGuided()?recipeCard(r,null,'order'):lessonBaseTile(r,clickable);};
const lessonBaseBell=phaseBell;phaseBell=function(){return lesson?.stage==='score'?'<button class="turn-bell" data-lesson-score>✦<span>Здати зілля</span></button>':lessonBaseBell();};
function lessonNextUI(skipExplore=false){
 if(lessonBlocked())return;
 const breaks=['rootResult','nectarResult','arrival','tradeResult','mavka','scoreResult','newOrderResult'];
 if(!skipExplore&&breaks.includes(lesson.stage)){lesson.explored??=[];if(!lesson.explored.includes(lesson.stage)){lesson.explored.push(lesson.stage);lessonExplore();return;}}
 closeModal();
 try{lessonAPI.lessonNext(lesson);tableSelection=null;selected=null;lessonFocusKey='';lessonPanelStage='';lessonPush();if(lesson.stage==='free'){lessonRemove();lessonSchedule();toast('Вільна гра. Тепер рішення за вами!');}}
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
 if(lesson.stage==='free'&&lessonAPI.lessonFinaleInfo(lesson)){
  if(el.closest('#lesson-finale')){
   if(e.type==='click'&&el.closest('[data-lesson-finale-next],[data-lesson-story]')){
    stop();if(lessonBlocked())return;
    const info=lessonAPI.lessonFinaleInfo(lesson);lessonAPI.lessonFinaleNext(lesson,info.key);lessonClearFinale();lessonSave();
    if(el.closest('[data-lesson-story]'))home();else{render();lessonSchedule();}return;
   }
   if(e.type==='keydown'&&e.key==='Tab'){
    const buttons=[...document.querySelectorAll('#lesson-finale button')],i=buttons.indexOf(document.activeElement);stop();buttons[(i+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus();return;
   }
   if(['wheel','pointerdown','pointermove','pointerup','pointercancel'].includes(e.type)||e.type==='keydown'&&['Enter',' '].includes(e.key))return;
  }
  stop();return;
 }
 if(lesson.stage==='free')return;
 if(lesson.exploring){
  if(e.type==='click'&&el.closest('[data-lesson-continue]')){stop();lesson.exploring=false;document.getElementById('lesson-explore')?.remove();lessonNextUI(true);return;}
  if(e.type==='click'&&el.closest('[data-character],[data-card-id],[data-recipe-id],[data-zone="deck"],[data-zone="discard"],[data-hex-tile]')){stop();lessonInspectPublic(el);return;}
  if(e.type==='pointerdown'&&el.closest('[data-drag-kind]'))return;
  return;
 }
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
 if(['openMap','openBrew','openOrders'].includes(lesson.stage)&&el.closest('[data-table-view]')){
  stop();const destination=el.closest('[data-table-view]').dataset.tableView;
  try{lessonAPI.lessonNavigate(lesson,destination);tableView=destination;hexMenu=me().hex;lessonPanelStage='';lessonPush();}catch(error){toast(error.message);}return;
 }
 if(['recipe','rootInspect','newOrder'].includes(lesson.stage)){stop();act(lessonAPI.lessonExpected(lesson));return;}
 if(['move','finalMove'].includes(lesson.stage)&&el.closest(lesson.stage==='move'?'[data-hex-tile="6"]':'[data-hex-tile="5"]')){stop();act({type:'hexMove',hex:lesson.stage==='move'?6:5});return;}
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
