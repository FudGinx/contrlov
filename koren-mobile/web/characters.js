'use strict';
let characterPayment=null,perkSlot=null;
const folkPortrait=tablePortrait;tablePortrait=function(p){const c=ch(p);if(c?.portraitSet==='folklore-v3')return `<span class="table-portrait folk-portrait" style="--px:${c.portrait%4*100/3}%;--py:${Math.floor(c.portrait/4)*100}%"></span>`;if(c?.portraitSet==='new-perks-v1'){const i=c.portrait-12;return `<span class="table-portrait selected-character-portrait" style="--px:${i%2*100}%;--py:${Math.floor(i/2)*100}%"></span>`;}return folkPortrait(p);};
const folkArt=tableArt;tableArt=function(c){return c.artSet==='folklore-v3'?`<span class="ingredient-art folk-ingredient" style="--px:${c.illustration%4*100/3}%;--py:${Math.floor(c.illustration/4)*100}%"></span>`:folkArt(c);};
points=function(p){let n=0;for(const b of p.brew){if(b.sealed)continue;if(!b.disabled&&!b.substituted){n+=(b.card.points||0)+(b.boost||0)+(ch(p)?.color===b.card.color?1:0);if(b.card.effect==='resonance'&&!b.carried)n+=Math.min(3,p.brew.filter(x=>x!==b&&!x.disabled&&!x.substituted&&x.card.type==='ingredient'&&x.card.color===b.card.color).length);}n+=b.attacks.reduce((n,a)=>n+(a.cancelled?0:a.card.negative),0);}return n;};
const chaosCount=p=>p.brew.reduce((n,b)=>n+(b.card.type==='ingredient'?1:0)+b.attacks.filter(a=>a.card.type==='ingredient').length,0),folkRecipe=recipeCard;
recipeCard=function(r,p=null,kind=''){if(r.chaos){const ready=p?.id===state.me&&p.current===r.id&&isMine()&&['main','post','defense'].includes(state.phase)&&p.brew.some(b=>b.card.type==='ingredient');return `<div class="recipe-card chaos-recipe" data-recipe-id="${r.id}" ${kind?`data-drag-kind="${kind}" data-order="${r.id}"`:''} tabindex="0" role="button"><div class="recipe-card-heading"><span>РЕЦЕПТ · ∞</span><b>+${p?chaosCount(p):'N'}</b></div><h3>${esc(r.name)}</h3><p>Будь-які типи<br>Будь-яка кількість</p><p>+1 за кожен інгредієнт<br>Свій або саботаж<br>Плюс звичайні очки карт</p>${p?`<small>Зараз: ${Math.max(0,points(p)+chaosCount(p))} слави</small>`:''}${ready?'<button class="cauldron-context" data-folk-action="chaosFinish">Завершити зілля</button>':''}</div>`;}let html=folkRecipe({...r,value:r.value},p,kind);if(r.potionMeta?.shortcut)html=html.replace('<h3>','<small class="shortcut-label">Тиховар · на складник менше</small><h3>');if(r.potionMeta?.extended)html=html.replace('<h3>','<small class="shortcut-label">Блуд · +1 позиція</small><h3>');if(p?.starter)html=html.replace('<h3>','<small class="shortcut-label">Запас: '+esc(p.starter.name)+'</small><h3>');if(p?.current===r.id){let i=0;html=html.replace(/<li class="([^"]*)">/g,(_,cl)=>`<li class="${cl} ${perkSlot?.slot===i?'perk-slot-selected':''}" data-drop="recipe-slot" data-player="${p.id}" data-slot="${i++}">`);}return html;};
const folkBrew=tableBrew;tableBrew=function(p){let html=folkBrew(p);for(const b of p.brew.filter(b=>b.sealed))html=html.replace(`data-brew-ids="${b.id}"`,`data-brew-ids="${b.id}" data-sealed="true"`);return html;};
const folkPlayable=playable;function ordinaryCharacterPlayable(c){return state.rulesVersion>=3?state.legal.play.includes(c.id):folkPlayable(c);}
playable=function(c){if(!state||state.effectChoice)return false;if(myResponse())return state.legal?.react.includes(c.id)||false;if(c.type!=='ingredient')return folkPlayable(c);return ordinaryCharacterPlayable(c)||!!(state.characterAction?.ready&&state.characterAction.costCards.includes(c.id))||!!(ch(me())?.ingredientWard&&isMine()&&!state.turnData.ingredientWardUsed&&me().brew.some(b=>b.attacks.some(a=>!a.cancelled)));};
function validCharacterPayment(){return characterPayment?.room===state.code&&me().hand.some(c=>c.id===characterPayment.card)&&state.characterAction?.mode==='mix';}
const folkStacks=handStacks;handStacks=function(p){return !validCharacterPayment()?folkStacks(p):groupIdentical(p.hand).map(cards=>stackMarkup(cards,tableCard(cards.find(c=>c.id!==characterPayment.card)||cards[0],'hand',p.id))).join('');};
const folkTarget=legalTableTarget;
legalTableTarget=function(src,target){if(!state||!src||!target)return false;const p=me(),info=state.characterAction,d=target.dataset,k=d.drop,own=d.player===p.id;if(k==='recipe-slot'&&src.kind!=='character-perk')return legalTableTarget(src,target.closest('[data-drop="brew"]'));if(state.effectChoice)return src.kind==='effect-choice'&&state.effectChoice.owner===p.id&&k==='hand';
 if(src.kind==='character-perk'){if(!info?.ready)return false;if(['swap','extend'].includes(info.mode))return info.players.includes(d.player)&&['brew','ingredient','attack'].includes(k);if(info.mode==='seal')return own&&(k==='ingredient'&&info.targetIds.includes(d.target)||k==='attack'&&p.brew.some(b=>info.targetIds.includes(b.id)&&b.attacks.some(a=>a.id===d.target)));if(info.mode==='shortcut')return own&&['brew','ingredient'].includes(k);return own&&['pair','reorder'].includes(info.mode)&&k==='recipe-slot'&&info.slots.includes(Number(d.slot));}
 if(src.kind==='recipe')return isMine()&&['main','post','defense'].includes(state.phase)&&!p.brew.length&&own&&['brew','ingredient'].includes(k);
 if(src.kind==='order')return isMine()&&['main','post','defense'].includes(state.phase)&&!state.turnData.orderTaken&&p.recipes.length<3&&(k==='hand'||own&&!p.brew.length&&['brew','ingredient'].includes(k));
 if(src.kind==='hand'){const c=p.hand.find(c=>c.id===src.card);if(!c)return false;if(c.type==='distill'&&own&&k==='ingredient'){const b=p.brew.find(b=>b.id===d.target);return isMine()&&['main','chain','post','defense'].includes(state.phase)&&!!b&&b.card.type==='ingredient'&&b.slot!==null&&(!ch(p)?.preserveDistill||rec(p)?.potionMeta?.distillPreserved||b.attacks.length>0);}if(k==='trade')return state.status==='playing'&&!['draft','character'].includes(state.phase)&&(state.exchange?state.exchange.owner!==p.id:isMine());if(k==='character-perk')return own&&info?.ready&&info.mode==='mix'&&info.costCards.includes(c.id);if(c.type==='ingredient'){if(!own&&k==='attack'&&info?.mode==='aid'&&info.ready)return info.targetIds.includes(d.target)&&info.costCards.includes(c.id);if(own&&k==='attack'){const a=p.brew.flatMap(b=>b.attacks).find(a=>a.id===d.target&&!a.cancelled);return !!a&&isMine()&&(info?.ready&&info.mode==='catch'&&info.targetIds.includes(a.id)&&a.card.color===c.color||ch(p)?.ingredientWard&&!state.turnData.ingredientWardUsed&&['main','chain','post','defense'].includes(state.phase));}if(myResponse())return state.legal.react.includes(c.id)&&d.player===current().id&&(k==='brew'||k==='ingredient'&&d.target===state.turnData.last);if(own&&['brew','ingredient'].includes(k)){if(info?.ready&&info.mode==='insect'&&k==='ingredient'&&info.targetIds.includes(d.target)&&info.costCards.includes(c.id))return true;if(info?.ready&&info.mode==='mix'&&validCharacterPayment()&&c.id!==characterPayment.card&&p.hand.find(x=>x.id===characterPayment.card)?.color===c.color)return true;return ordinaryCharacterPlayable(c);}}}return folkTarget(src,target);};
const folkDrop=tableDrop;
async function finishShortPotion(){if(!state.characterAction?.ready||busy)return;await act({type:'characterAction',mode:'shortcut'});if(state.phase==='chain'&&rec(me())?.potionMeta?.shortcut)await act({type:'stop'});}
async function usePerkTarget(target){if(!legalTableTarget({kind:'character-perk'},target))return toast('Ціль недоступна.');const info=state.characterAction,d=target.dataset;if(info.mode==='reorder'){const slot=Number(d.slot);if(!perkSlot||perkSlot.room!==state.code){perkSlot={room:state.code,slot};tableSelection={kind:'character-perk'};render();return;}const first=perkSlot.slot;perkSlot=null;tableSelection=null;return act({type:'characterAction',mode:'reorder',slots:[first,slot]});}tableSelection=null;return act({type:'characterAction',mode:info.mode,...(['swap','extend'].includes(info.mode)?{player:d.player}:info.mode==='pair'?{slot:Number(d.slot)}:info.mode==='seal'?{target:d.drop==='attack'?me().brew.find(b=>b.attacks.some(a=>a.id===d.target))?.id:d.target}:{})});}
tableDrop=async function(src,target){if(!target||busy)return;if(target.dataset.drop==='recipe-slot'&&src.kind!=='character-perk')target=target.closest('[data-drop="brew"]');const d=target.dataset,info=state.characterAction,p=me(),c=p.hand.find(c=>c.id===src.card);if(src.kind==='character-perk')return usePerkTarget(target);if(src.kind==='hand'&&c){if(!legalTableTarget(src,target))return toast('Ця ціль зараз недоступна.');if(d.drop==='character-perk'){characterPayment={room:state.code,card:c.id};render();return;}if(d.player!==p.id&&d.drop==='attack'&&info?.mode==='aid')return act({type:'characterAction',mode:'aid',target:d.target,card:c.id});if(d.player===p.id){if(d.drop==='attack'&&c.type==='ingredient')return act(info?.ready&&info.mode==='catch'?{type:'characterAction',mode:'catch',target:d.target,card:c.id}:{type:'white',card:c.id,target:d.target});if(d.drop==='ingredient'&&info?.ready&&info.mode==='insect'&&info.costCards.includes(c.id)&&info.targetIds.includes(d.target))return act({type:'characterAction',mode:'insect',target:d.target,card:c.id});if(['brew','ingredient'].includes(d.drop)&&validCharacterPayment()&&c.id!==characterPayment.card&&c.color===p.hand.find(x=>x.id===characterPayment.card)?.color){const first=characterPayment.card;characterPayment=null;return act({type:'characterAction',mode:'mix',cards:[first,c.id]});}}}return folkDrop(src,target);};
const folkBell=phaseBell;phaseBell=function(){return state.phase==='defense'&&isMine()&&!state.effectChoice?'<button class="turn-bell" data-folk-action="finishTurn">♧<span>Завершити хід</span></button>':folkBell();};
effectChoicePanel=function(){const c=state.effectChoice;if(!c||c.owner!==state.me)return '';const harvest=c.kind==='harvest',perk=['starter','mix','extend'].includes(c.kind),title=harvest?'Добір: '+(color(c.harvest)?.name||'інгредієнт'):({sift:'Залиште одну з двох',starter:'Оберіть складник для наступного зілля',mix:'Оберіть складник для варки',extend:'Скиньте карту типу нової позиції'})[c.kind]||'Поверніть одну з верхніх п’яти';return `<section class="effect-choice-panel" data-zone="choice:${c.owner}"><header><b>${title}</b><span>${perk?'Торкніться потрібної карти':'Утримайте й тягніть у руку ↓'}</span>${harvest?'<button data-folk-action="harvestSkip">Випадкова карта</button>':['starter','extend'].includes(c.kind)?'<button data-folk-action="harvestSkip">Пропустити</button>':''}</header><div class="effect-choice-scroll">${c.cards.map(card=>perk?tableCard(card,'','',`data-perk-choice="${card.id}"`):tableCard(card,'effect-choice',state.me)).join('')}</div></section>`;};
function handleFolkloreClick(e){const choice=e.target.closest('[data-perk-choice]');if(choice){e.stopImmediatePropagation();if(!busy&&Date.now()>=suppressTableClick&&state.effectChoice?.owner===state.me)act({type:'chooseEffect',choice:state.effectChoice.id,card:choice.dataset.perkChoice});return true;}const button=e.target.closest('[data-folk-action]');if(button){e.preventDefault();e.stopImmediatePropagation();if(Date.now()<suppressTableClick||busy)return true;const type=button.dataset.folkAction;act(type==='harvestSkip'?{type:'chooseEffect',choice:state.effectChoice.id}:{type});return true;}if(e.target.closest('[data-perk-plan-clear]')){e.stopImmediatePropagation();characterPayment=null;perkSlot=null;tableSelection=null;render();return true;}if(e.target.closest('[data-perk-control]')){e.preventDefault();e.stopImmediatePropagation();const info=state.characterAction;if(!info?.ready){inspectCharacter(state.me);return true;}if(info.mode==='shortcut'){finishShortPotion();return true;}if(['insect','catch','mix','aid'].includes(info.mode)){toast(info.mode==='aid'?'Перетягніть складник на негатив у чужому котлі':info.mode==='insect'?'Комаху з руки тягніть на свою Комаху':info.mode==='catch'?'Оплату з руки тягніть на негатив того самого типу':'Першу карту тягніть на перк, другу — на казан');return true;}tableSelection={kind:'character-perk'};perkSlot=null;toast(['swap','extend'].includes(info.mode)?'Перейдіть до чужого котла й торкніться його':info.mode==='seal'?'Оберіть свій інгредієнт':info.mode==='pair'?'Оберіть початок сусідньої пари':'Оберіть дві незаповнені позиції');render();return true;}const drop=e.target.closest('[data-drop]');if(tableSelection?.kind==='character-perk'&&drop&&!e.target.closest('[data-character]')){e.preventDefault();e.stopImmediatePropagation();usePerkTarget(drop);return true;}return false;}
function updateCharacterControls(){if(!state||typeof document.createElement!=='function')return;const p=me(),info=state.characterAction;if(characterPayment&&(!validCharacterPayment()||!info?.ready))characterPayment=null;if(tableSelection?.kind==='character-perk'&&!info?.ready){tableSelection=null;perkSlot=null;}if(info?.mode){const old=document.querySelector('.table-controls .perk-button,.table-controls .character-perk-wrapper'),key=JSON.stringify([p.character,info.ready,info.used,characterPayment?.card,perkSlot?.slot]);if(old&&old.dataset.perkKey!==key){const labels={insect:'◆ → ◆',catch:'Лови кулю',mix:'2 → 1',shortcut:'Здати −1',seal:'0 ↔ 0',reorder:'↔ позиції',pair:'✿ → ◈',swap:'↔ котли',extend:'+1 позиція',aid:'Захист'},help={insect:'Комаху → Комаху',catch:'Оплата → негатив',mix:characterPayment?'Друга → казан':'Карту сюди',shortcut:'Повна нагорода',seal:'Перк → складник',reorder:'Дві позиції',pair:'Сусідня пара',swap:'Чужий котел',extend:'Чужий рецепт',aid:'Карта → чужий негатив'};old.outerHTML=`<div class="character-perk-wrapper"><div class="character-perk-zone ${info.ready?'perk-ready':''} ${info.used?'perk-spent':''}" data-perk-control data-drop="character-perk" data-player="${p.id}" data-drag-kind="character-perk" tabindex="0" role="button" aria-label="Перк ${esc(ch(p).name)}">${tablePortrait(p)}<strong>${info.used?'✓':labels[info.mode]}</strong><small>${info.used?'Використано':help[info.mode]}</small></div>${characterPayment||tableSelection?.kind==='character-perk'?'<button class="perk-plan-clear" data-perk-plan-clear>×</button>':''}</div>`;document.querySelector('.character-perk-wrapper').dataset.perkKey=key;}}for(const el of document.querySelectorAll('.table-hand [data-card-id]'))el.classList.toggle('perk-payment-picked',el.dataset.cardId===characterPayment?.card);markLegalTargets(dragging?.active?dragging.source:tableSelection);}
const folkFeedback=updateTurnFeedback;updateTurnFeedback=function(){folkFeedback();updateCharacterControls();};
help=function(){modal('Правила біля казана',`<ol class="rules-list"><li>5 карт на старті. На початку ходу +3; Чумак +4. Збирачі можуть вибрати одну карту свого типу зі скиду замість випадкової.</li><li>Тап — великий огляд. Утримайте карту ¼ секунди для перетягування. Швидкий свайп і смуга ↕ прокручують стіл.</li><li>Одне звичайне додавання за хід. Продовження і перки дозволяють більше. Новий рецепт раз за хід і викладання рецепта не витрачають варку.</li><li>Зупиніть комбінацію: суперники відповідають по черзі. Одна карта на відповідь, максимум 3 на інгредієнті. Відьма підкидає Гриби до будь-якого типу.</li><li>Після саботажу застосуйте захист і один раз натисніть «Завершити хід»: готове зілля порахується і хід перейде далі.</li><li>Чортів казан можна завершити навіть з одним інгредієнтом після відповідей. Завершення — на самому рецепті. Очки карт плюс кількість своїх і підкинутих інгредієнтів.</li><li>Ярмарок відкривають тільки у свій хід. Зустрічні пропозиції і завершення відкритого обміну — поза чергою.</li><li>Перки оглядаються через портрет. Активний перк тягніть на ціль або торкніться його й цілі. Відмітки зілля зберігаються при обміні котлами.</li><li>80 карт, 16 продовжень, 6 Оберегів, 2 Дистиляції. Ліміту руки немає. Перше ${state.targetPotions||3}-є готове зілля: фінал і +5 слави; іншим по останньому ходу.</li></ol>`,true);};
const folkMotion=tableMotion;tableMotion=function(events,old){folkMotion(events,old);for(const e of events)if(e.type==='whiteUse'){const target=document.querySelector(`[data-zone="brew:${e.owner}"]`);if(target){target.classList.add(e.ward?'ward-flash':'distill-flash');setTimeout(()=>target.classList.remove('ward-flash','distill-flash'),1100);}}};
const folkInspectTable=inspectTable;inspectTable=function(el){const r=[...state.market,...state.players.flatMap(p=>p.recipes)].find(r=>r.id===el.dataset.recipeId);if(r?.chaos){inspectionSource=el.dataset.dragKind?tableGestureSource(el):null;modal(r.name,`<div class="inspect-grid"><div class="inspect-recipe">${recipeCard(r)}</div><div class="inspect-copy"><h3>Чортів казан</h3><p>Будь-які типи і будь-яка кількість. Можна завершити після першого власного інгредієнта, коли відповіді суперників завершені.</p><p><b>Очки своїх карт та ефектів + активні негативи + кількість усіх реальних інгредієнтів у котлі.</b> Мінімум 0.</p><p>Саботаж −2 дає −1 разом із бонусом за карту. Скасований саботаж дає +1 за карту. Білі карти та нейтральні замінники не рахуються.</p><p>Завершення знаходиться на самому котлі. Воно не передає хід.</p>${inspectionSource?'<button data-inspect-select>Обрати рецепт →</button>':''}</div></div>`,true);return;}folkInspectTable(el);const sealed=state.players.some(p=>p.brew.some(b=>b.sealed&&(b.card.id===el.dataset.cardId||b.attacks.some(a=>a.card.id===el.dataset.cardId))));if(sealed)modalRoot.querySelector('.inspect-copy')?.insertAdjacentHTML('beforeend','<p><b>Нульова змова:</b> числові очки цього складника й усіх його негативів — 0. Ефекти активні.</p>');};

/* The map is a separate station beside the cauldrons and market. */
let hexBludSource=null;
let hexScoutTiles=[],hexSeedCard=null,hexMenu=null,hexSkillOpen=false,hexScouting=false;
const hexCoordinates=[[50,50],[50,17],[69.35,33.5],[69.35,66.5],[50,83],[30.65,66.5],[30.65,33.5]];
const hexSigns=['✧','♠','✿','♜','❧','◆','◈'];
function hexNeighbor(a,b){return a!==b&&(a===0||b===0||Math.abs(a-b)===1||Math.abs(a-b)===5);}
function hexCardOptions(cards){return cards.map(c=>'<option value="'+esc(c.id)+'">'+esc(c.name)+'</option>').join('');}
function hexField(){
 const map=state.hexMap,p=me(),mine=isMine(),move=mine&&state.phase==='move',choice=map.choice;
 const perk=map.perk;
 const enabled=mine&&!map.used&&!state.effectChoice&&['main','post','defense','move'].includes(state.phase);
 const seed=choice?.kind==='seed';
 const field=map.tiles.map((t,i)=>{
  const [x,y]=hexCoordinates[t.position],people=state.players.filter(q=>q.hex===i);
  const can=!seed||t.count<t.cap;
  const tokens=people.map(q=>'<span class="hex-token" data-hex-token="'+esc(q.id)+'" style="--token-hue:'+(state.players.indexOf(q)*61)+'" title="'+esc(q.name)+'" aria-label="'+esc(q.name)+'">'+tablePortrait(q)+'</span>').join('');
  const scout=map.scouted[i];
  return '<div class="hex-cell" style="--hx:'+x+'%;--hy:'+y+'%"><button class="hex-tile '+(i===p.hex?'here ':'')+(hexScoutTiles.includes(i)?'scout-picked':'')+'" data-hex-tile="'+i+'" data-art="'+i+'" '+(!can?'disabled':'')+' aria-label="'+esc(t.name)+' · '+t.count+'"><span class="hex-crest">'+hexSigns[i]+'</span><span class="hex-stock">'+(t.count?'▰ '+t.count:'—')+'</span><strong>'+esc(t.name)+'</strong></button><div class="hex-tokens">'+tokens+'</div>'+(scout?'<small class="hex-scout-peek">'+esc(scout.join(', ')||'Порожньо')+'</small>':'')+'</div>';
 }).join('');
 const selected=hexMenu??p.hex??0,t=map.tiles[selected],here=selected===p.hex,neighbor=hexNeighbor(t.position,map.tiles[p.hex].position),ingredient=(p.hand||[]).filter(c=>c.type==='ingredient');
 const type={3:'brown',4:'green',6:'purple'}[p.hex];
 const all=ingredient.filter(c=>!type||c.color===type);
 const attacks=p.brew.flatMap(b=>b.attacks.filter(a=>!a.cancelled).map(a=>({...a,name:a.card.name+' '+a.card.negative})));
 let controls='';
 if(choice)controls=seed?'<p>Оберіть карту й торкніться гекса з вільним місцем.</p>':'<p>Оберіть одну карту.</p>';
 if(choice)controls+='<div class="hex-options">'+choice.cards.map(c=>'<button data-hex-card="'+esc(c.id)+'" class="'+(hexSeedCard===c.id?'picked':'')+'">'+esc(c.name)+'</button>').join('')+'</div>';

 else if(here&&hexSkillOpen&&enabled&&p.hex===0)controls='<div class="hex-options"><button data-hex-action="scout">'+(hexScouting?'Розвідати '+hexScoutTiles.length+'/2':'Розвідка')+'</button><button data-hex-action="seed" '+(!map.tiles.some(t=>t.count<t.cap)?'disabled':'')+'>Посів</button></div>'+(hexScouting?'<p>Позначте дві поляни на мапі.</p>':'');
 else if(here&&hexSkillOpen&&enabled&&p.hex!==5&&all.length&&(p.hex!==4||attacks.length)&&(p.hex!==6||state.phase==='main'))controls='<div class="hex-options"><select id="hex-payment" aria-label="Складник">'+hexCardOptions(all)+'</select>'+(p.hex===4?'<select id="hex-attack" aria-label="Негатив">'+hexCardOptions(attacks)+'</select>':'')+'<button data-hex-action="power">Застосувати</button></div>';
 else if(here&&hexSkillOpen)controls='<p>'+(map.used?'Уміння вже використано.':p.hex===5?'Спрацьовує під час варки Комахи.':'Зараз бракує потрібної карти, цілі або фази варки.')+'</p>';
 if(!choice){
  const skill=perk?.targets.includes(selected)
   ?({mosskeeper:'Зібрати мохом',vodianyk:'Підземна течія',blud:'Звідси перенести'})[perk.mode]:null;
  if(hexMenu===null)controls='<p>Торкніться гекса, щоб відкрити дії.</p>';
  else if(here)controls='<div class="hex-options"><button data-hex-action="stay" '+(!move?'disabled':'')+'>Залишитися</button><button data-hex-action="skill" '+(!enabled?'disabled':'')+'>Уміння гекса</button></div>'+controls;
  else controls='<p>'+(move&&neighbor?'Перейти сюди? Ви одразу зберете урожай і доберете карту.':!neighbor?'Цей гекс не є сусіднім.':'Перехід відкриється після варки, у фазі руху.')+'</p><div class="hex-options">'+(move&&neighbor?'<button data-hex-action="go">Перейти</button>':'')+'<button class="ghost" data-hex-action="cancel">Ні</button></div>';
 }
 if(!choice&&hexMenu!==null){
  if(skill)controls+='<button data-hex-action="character">'+skill+'</button>';
  if(hexBludSource!==null&&perk?.mode==='blud'&&selected!==hexBludSource&&perk.destinations.includes(selected))controls+='<button data-hex-action="bludTo">Перенести сюди</button>';
 }
 return '<section class="world-station hex-station" data-station="hex"><div class="hex-layout"><div class="hex-field">'+field+'</div><aside class="hex-panel"><h2>'+esc(t.name)+'</h2><p>'+esc(t.rule)+'</p>'+controls+'<button class="ghost" data-hex-action="rules">Правила мапи</button></aside></div></section>';
}
const previousHexShell=updateTableShell;
updateTableShell=function(html){
 if(state?.hexMap&&state.status==='playing'){
  const old=new Map([...document.querySelectorAll('[data-hex-token]')].map(el=>[el.dataset.hexToken,el.getBoundingClientRect()]));
  html=html.replace('</nav>', '<button class="'+(tableView==='hex'?'chosen':'')+'" data-table-view="hex">Мапа</button></nav>');
  html=html.replace('</div></section><aside class="table-controls">',hexField()+'</div></section><aside class="table-controls">');
  previousHexShell(html);
  $('.tabletop')?.classList.toggle('hex-map-open',tableView==='hex');
  if(tableView==='hex'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
   for(const token of document.querySelectorAll('[data-hex-token]')){
    const from=old.get(token.dataset.hexToken),to=token.getBoundingClientRect();
    if(from&&token.animate&&(Math.abs(from.x-to.x)>5||Math.abs(from.y-to.y)>5))token.animate([{transform:'translate('+(from.x-to.x)+'px,'+(from.y-to.y)+'px)'},{transform:'translate(0,0)'}],{duration:390,easing:'ease-out'});
   }
  }
  return;
 }
 previousHexShell(html);
};
let hexMenuTurn=null;
const previousHexRender=render;
let hexAutoFocus=null;
render=function(){
 const turn=state?.hexMap?state.code+':'+state.round+':'+state.turn:null;
 if(turn!==hexMenuTurn){hexMenuTurn=turn;hexBludSource=null;hexMenu=null;hexSkillOpen=false;hexScouting=false;hexScoutTiles=[];}
 const reacts=state?.status==='playing'&&state.phase==='reaction'&&state.reactionPlayer===state.me;
 const choosesCard=state?.effectChoice?.owner&&state.effectChoice.owner===state.me;
 const focus=state?.hexMap&&isMine()&&(state.phase==='move'||state.hexMap.choice)
   ?turn+':'+(state.hexMap.choice?.kind||'move'):null;
 if(reacts||choosesCard){
  if(tableView==='hex'||reacts&&tableView!=='brew'){
   tableView='brew';
   tablePlayer=state.players[state.turn]?.id;
  }
 }else if(focus&&focus!==hexAutoFocus)tableView='hex';
 hexAutoFocus=focus;
 previousHexRender();
};
const previousHexBell=phaseBell;
phaseBell=function(){if(state.hexMap&&state.phase==='move'&&isMine())return '<button class="turn-bell" data-table-view="hex">⬡<span>Оберіть шлях</span></button>';return previousHexBell();};
const previousHexPhase=phaseInfo;
phaseInfo=function(){return state?.hexMap&&state.phase==='move'?[isMine()?'Оберіть шлях':'Рух суперника','Один крок або залишитися']:previousHexPhase();};
const previousHexClick=handleFolkloreClick;
handleFolkloreClick=function(e){
 const button=e.target.closest('[data-hex-tile],[data-hex-action],[data-hex-card]');
 if(!button)return previousHexClick(e);
 e.stopImmediatePropagation();
 if(busy||!state?.hexMap)return true;
 const d=button.dataset,p=me(),choice=state.hexMap.choice;
 if(d.hexAction==='rules'){
  modal('Правила мапи','<ol class="rules-list"><li>Наприкінці ходу відкрито зробіть один крок або залишіться. Сусідні гекси з’єднані спільною стороною. Шість полян щоразу перемішуються, дуб лишається в центрі.</li><li>За вхід візьміть увесь закритий урожай і одну карту з колоди. Кілька фішок можуть стояти разом.</li><li>Наприкінці круга на гексах з місцем з’являється по карті. Нову карту отримує перший за чергою серед тих, хто залишився на гексі. Якщо таких немає, вона лежить закритою.</li><li>Уміння своєї поляни доступне раз за хід. На Перехресті оберіть розвідку або посів. Посіяна карта одразу є частиною урожаю.</li></ol>',true);
 }else if(d.hexCard){
  if(choice?.kind==='seed'){hexSeedCard=d.hexCard;render();}else if(choice)act({type:'hexChoose',card:d.hexCard});
 }else if(d.hexTile!==undefined){
  const hex=Number(d.hexTile);
  if(choice?.kind==='seed'){
   if(!hexSeedCard)return (toast('Спочатку оберіть карту.'),true);
   const card=hexSeedCard;hexSeedCard=null;act({type:'hexChoose',card,hex});
  }else if(hexScouting&&hex!==0){hexScoutTiles=hexScoutTiles.includes(hex)?hexScoutTiles.filter(i=>i!==hex):[...hexScoutTiles.slice(-1),hex];render();}
  else{hexMenu=hex;hexSkillOpen=false;render();}
 }else if(d.hexAction==='stay'&&isMine()&&state.phase==='move')act({type:'hexMove',hex:p.hex});
 else if(d.hexAction==='character'&&isMine()&&state.hexMap.perk?.targets.includes(hexMenu)){
  if(state.hexMap.perk.mode==='blud'){hexBludSource=hexMenu;hexMenu=null;toast('Оберіть гекс, куди перенести карту.');render();}
  else act({type:'hexPerk',hex:hexMenu});
 }
 else if(d.hexAction==='bludTo'&&isMine()&&hexBludSource!==null){const hex=hexBludSource;hexBludSource=null;act({type:'hexPerk',hex,to:hexMenu});}
 else if(d.hexAction==='go'&&isMine()&&state.phase==='move'&&hexMenu!==null)act({type:'hexMove',hex:hexMenu});
 else if(d.hexAction==='cancel'){hexMenu=null;hexSkillOpen=false;render();}
 else if(d.hexAction==='skill'){hexSkillOpen=!hexSkillOpen;hexScouting=false;hexScoutTiles=[];render();}
 else if(d.hexAction==='scout'){if(!hexScouting){hexScouting=true;render();}else if(hexScoutTiles.length===2){const tiles=hexScoutTiles;hexScoutTiles=[];hexScouting=false;act({type:'hexUse',mode:'scout',tiles});}else toast('Позначте дві поляни.');}
 else if(d.hexAction==='seed'){hexScouting=false;hexScoutTiles=[];hexSeedCard=null;act({type:'hexUse',mode:'seed'});}
 else if(d.hexAction==='power')act({type:'hexUse',card:$('#hex-payment')?.value,target:$('#hex-attack')?.value});
 return true;
};

