'use strict';
let characterPayment=null,perkSlot=null;
const folkPortrait=tablePortrait;tablePortrait=function(p){const c=ch(p);if(c?.portraitSet==='folklore-v3')return `<span class="table-portrait folk-portrait" style="--px:${c.portrait%4*100/3}%;--py:${Math.floor(c.portrait/4)*100}%"></span>`;if(c?.portraitSet==='new-perks-v1'){const i=c.portrait-12;return `<span class="table-portrait selected-character-portrait" style="--px:${i%2*100}%;--py:${Math.floor(i/2)*100}%"></span>`;}return folkPortrait(p);};
const folkArt=tableArt;tableArt=function(c){return c.artSet==='folklore-v3'?`<span class="ingredient-art folk-ingredient" style="--px:${c.illustration%4*100/3}%;--py:${Math.floor(c.illustration/4)*100}%"></span>`:folkArt(c);};
points=function(p){if(Number.isFinite(p.brewPoints))return p.brewPoints;let n=0;for(const b of p.brew){if(b.sealed)continue;if(!b.disabled&&!b.substituted){n+=(b.card.points||0)+(b.boost||0)+(ch(p)?.color===b.card.color?1:0);if(b.card.effect==='resonance'&&!b.carried)n+=Math.min(3,p.brew.filter(x=>x!==b&&!x.disabled&&!x.substituted&&x.card.type==='ingredient'&&x.card.color===b.card.color).length);}n+=b.attacks.reduce((n,a)=>n+(a.cancelled?0:a.card.negative),0);}return n;};
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
 if(src.kind==='hand'){const c=p.hand.find(c=>c.id===src.card);if(!c)return false;if(c.type==='distill'&&own&&k==='ingredient'){const b=p.brew.find(b=>b.id===d.target);return isMine()&&['main','chain','post','defense'].includes(state.phase)&&!!b&&b.card.type==='ingredient'&&(!ch(p)?.preserveDistill||rec(p)?.potionMeta?.distillPreserved||b.attacks.length>0);}if(k==='trade')return state.status==='playing'&&!['draft','character'].includes(state.phase)&&(state.exchange?state.exchange.owner!==p.id:isMine());if(k==='character-perk')return own&&info?.ready&&info.mode==='mix'&&info.costCards.includes(c.id);if(c.type==='ingredient'){if(!own&&k==='attack'&&info?.mode==='aid'&&info.ready)return info.targetIds.includes(d.target)&&info.costCards.includes(c.id);if(own&&k==='attack'){const a=p.brew.flatMap(b=>b.attacks).find(a=>a.id===d.target&&!a.cancelled);return !!a&&isMine()&&(info?.ready&&info.mode==='catch'&&info.targetIds.includes(a.id)&&a.card.color===c.color||ch(p)?.ingredientWard&&!state.turnData.ingredientWardUsed&&['main','chain','post','defense'].includes(state.phase));}if(myResponse())return state.legal.react.includes(c.id)&&d.player===current().id&&(k==='brew'||k==='ingredient'&&d.target===state.turnData.last);if(own&&['brew','ingredient'].includes(k)){if(info?.ready&&info.mode==='insect'&&k==='ingredient'&&info.targetIds.includes(d.target)&&info.costCards.includes(c.id))return true;if(info?.ready&&info.mode==='mix'&&validCharacterPayment()&&c.id!==characterPayment.card&&p.hand.find(x=>x.id===characterPayment.card)?.color===c.color)return true;return ordinaryCharacterPlayable(c);}}}return folkTarget(src,target);};
const folkDrop=tableDrop;
async function finishShortPotion(){if(!state.characterAction?.ready||busy)return;await act({type:'characterAction',mode:'shortcut'});if(state.phase==='chain'&&rec(me())?.potionMeta?.shortcut)await act({type:'stop'});}
async function usePerkTarget(target){if(!legalTableTarget({kind:'character-perk'},target))return toast('Ціль недоступна.');const info=state.characterAction,d=target.dataset;if(info.mode==='reorder'){const slot=Number(d.slot);if(!perkSlot||perkSlot.room!==state.code){perkSlot={room:state.code,slot};tableSelection={kind:'character-perk'};render();return;}const first=perkSlot.slot;perkSlot=null;tableSelection=null;return act({type:'characterAction',mode:'reorder',slots:[first,slot]});}tableSelection=null;return act({type:'characterAction',mode:info.mode,...(['swap','extend'].includes(info.mode)?{player:d.player}:info.mode==='pair'?{slot:Number(d.slot)}:info.mode==='seal'?{target:d.drop==='attack'?me().brew.find(b=>b.attacks.some(a=>a.id===d.target))?.id:d.target}:{})});}
tableDrop=async function(src,target){if(!target||busy)return;if(target.dataset.drop==='recipe-slot'&&src.kind!=='character-perk')target=target.closest('[data-drop="brew"]');const d=target.dataset,info=state.characterAction,p=me(),c=p.hand.find(c=>c.id===src.card);if(src.kind==='character-perk')return usePerkTarget(target);if(src.kind==='hand'&&c){if(!legalTableTarget(src,target))return toast('Ця ціль зараз недоступна.');if(d.drop==='character-perk'){characterPayment={room:state.code,card:c.id};render();return;}if(d.player!==p.id&&d.drop==='attack'&&info?.mode==='aid')return act({type:'characterAction',mode:'aid',target:d.target,card:c.id});if(d.player===p.id){if(d.drop==='attack'&&c.type==='ingredient')return act(info?.ready&&info.mode==='catch'?{type:'characterAction',mode:'catch',target:d.target,card:c.id}:{type:'white',card:c.id,target:d.target});if(d.drop==='ingredient'&&info?.ready&&info.mode==='insect'&&info.costCards.includes(c.id)&&info.targetIds.includes(d.target))return act({type:'characterAction',mode:'insect',target:d.target,card:c.id});if(['brew','ingredient'].includes(d.drop)&&validCharacterPayment()&&c.id!==characterPayment.card&&c.color===p.hand.find(x=>x.id===characterPayment.card)?.color){const first=characterPayment.card;characterPayment=null;return act({type:'characterAction',mode:'mix',cards:[first,c.id]});}}}return folkDrop(src,target);};
const folkBell=phaseBell;phaseBell=function(){return state.phase==='defense'&&isMine()&&!state.effectChoice?'<button class="turn-bell" data-folk-action="finishTurn">♧<span>Завершити хід</span></button>':folkBell();};
effectChoicePanel=function(){const c=state.effectChoice;if(!c||c.owner!==state.me)return '';const harvest=c.kind==='harvest',perk=['starter','mix','extend'].includes(c.kind),title=harvest?'Добір: '+(color(c.harvest)?.name||'інгредієнт'):({sift:'Залиште одну з двох',rebrew:'Повернення: у руку або відразу в казан',stoke:'Жар: складник у скид → ще одне додавання',starter:'Оберіть складник для наступного зілля',mix:'Оберіть складник для варки',extend:'Скиньте карту типу нової позиції'})[c.kind]||'Поверніть одну з верхніх п’яти';return `<section class="effect-choice-panel" data-zone="choice:${c.owner}"><header><b>${title}</b><span>${c.kind==='stoke'?'Перетягніть складник у скид':c.kind==='rebrew'?'У руку або на свій казан':perk?'Торкніться потрібної карти':'Утримайте й тягніть у руку ↓'}</span>${harvest?'<button data-folk-action="harvestSkip">Випадкова карта</button>':['starter','extend','stoke'].includes(c.kind)?'<button data-folk-action="harvestSkip">Пропустити</button>':''}</header><div class="effect-choice-scroll">${c.cards.map(card=>perk?tableCard(card,'','',`data-perk-choice="${card.id}"`):tableCard(card,'effect-choice',state.me)).join('')}</div></section>`;};
function handleFolkloreClick(e){const choice=e.target.closest('[data-perk-choice]');if(choice){e.stopImmediatePropagation();if(!busy&&Date.now()>=suppressTableClick&&state.effectChoice?.owner===state.me)act({type:'chooseEffect',choice:state.effectChoice.id,card:choice.dataset.perkChoice});return true;}const button=e.target.closest('[data-folk-action]');if(button){e.preventDefault();e.stopImmediatePropagation();if(Date.now()<suppressTableClick||busy)return true;const type=button.dataset.folkAction;act(type==='harvestSkip'?{type:'chooseEffect',choice:state.effectChoice.id}:{type});return true;}if(e.target.closest('[data-perk-plan-clear]')){e.stopImmediatePropagation();characterPayment=null;perkSlot=null;tableSelection=null;render();return true;}if(e.target.closest('[data-perk-control]')){e.preventDefault();e.stopImmediatePropagation();const info=state.characterAction;if(!info?.ready){inspectCharacter(state.me);return true;}if(info.mode==='shortcut'){finishShortPotion();return true;}if(['insect','catch','mix','aid'].includes(info.mode)){toast(info.mode==='aid'?'Перетягніть складник на негатив у чужому котлі':info.mode==='insect'?'Комаху з руки тягніть на свою Комаху':info.mode==='catch'?'Оплату з руки тягніть на негатив того самого типу':'Першу карту тягніть на перк, другу — на казан');return true;}tableSelection={kind:'character-perk'};perkSlot=null;toast(['swap','extend'].includes(info.mode)?'Перейдіть до чужого котла й торкніться його':info.mode==='seal'?'Оберіть свій інгредієнт':info.mode==='pair'?'Оберіть початок сусідньої пари':'Оберіть дві незаповнені позиції');render();return true;}const drop=e.target.closest('[data-drop]');if(tableSelection?.kind==='character-perk'&&drop&&!e.target.closest('[data-character]')){e.preventDefault();e.stopImmediatePropagation();usePerkTarget(drop);return true;}return false;}
function updateCharacterControls(){if(!state||typeof document.createElement!=='function')return;const p=me(),info=state.characterAction;if(characterPayment&&(!validCharacterPayment()||!info?.ready))characterPayment=null;if(tableSelection?.kind==='character-perk'&&!info?.ready){tableSelection=null;perkSlot=null;}if(info?.mode){const old=document.querySelector('.table-controls .perk-button,.table-controls .character-perk-wrapper'),key=JSON.stringify([p.character,info.ready,info.used,characterPayment?.card,perkSlot?.slot]);if(old&&old.dataset.perkKey!==key){const labels={insect:'◆ → ◆',catch:'Лови кулю',mix:'2 → 1',shortcut:'Здати −1',seal:'0 ↔ 0',reorder:'↔ позиції',pair:'✿ → ◈',swap:'↔ котли',extend:'+1 позиція',aid:'Захист'},help={insect:'Комаху → Комаху',catch:'Оплата → негатив',mix:characterPayment?'Друга → казан':'Карту сюди',shortcut:'Повна нагорода',seal:'Перк → складник',reorder:'Дві позиції',pair:'Сусідня пара',swap:'Чужий котел',extend:'Чужий рецепт',aid:'Карта → чужий негатив'};old.outerHTML=`<div class="character-perk-wrapper"><div class="character-perk-zone ${info.ready?'perk-ready':''} ${info.used?'perk-spent':''}" data-perk-control data-drop="character-perk" data-player="${p.id}" data-drag-kind="character-perk" tabindex="0" role="button" aria-label="Перк ${esc(ch(p).name)}">${tablePortrait(p)}<strong>${info.used?'✓':labels[info.mode]}</strong><small>${info.used?'Використано':help[info.mode]}</small></div>${characterPayment||tableSelection?.kind==='character-perk'?'<button class="perk-plan-clear" data-perk-plan-clear>×</button>':''}</div>`;document.querySelector('.character-perk-wrapper').dataset.perkKey=key;}}for(const el of document.querySelectorAll('.table-hand [data-card-id]'))el.classList.toggle('perk-payment-picked',el.dataset.cardId===characterPayment?.card);markLegalTargets(dragging?.active?dragging.source:tableSelection);}
const folkFeedback=updateTurnFeedback;updateTurnFeedback=function(){folkFeedback();updateCharacterControls();};
help=function(){modal('Правила біля казана',`<ol class="rules-list"><li>5 карт на старті. З мапою карти надходять з урожаю, руху та ефектів. Відьма отримує Гриб зі скиду або одну випадкову карту. Без мапи на початку ходу +3.</li><li>Тап — великий огляд. Утримайте карту ¼ секунди для перетягування. Швидкий свайп і смуга ↕ прокручують стіл.</li><li>Одне звичайне додавання за хід. Продовження і перки дозволяють більше. Новий рецепт раз за хід і викладання рецепта не витрачають варку.</li><li>Зупиніть комбінацію: суперники відповідають по черзі. Одна карта на відповідь, максимум 3 на інгредієнті. Відьма підкидає Гриби до будь-якого типу.</li><li>Після саботажу застосуйте захист і один раз натисніть «Завершити хід»: готове зілля порахується і хід перейде далі.</li><li>Чортів казан можна завершити навіть з одним інгредієнтом після відповідей. Завершення — на самому рецепті. Очки карт плюс кількість своїх і підкинутих інгредієнтів.</li><li>Ярмарок відкривають тільки у свій хід. Зустрічні пропозиції і завершення відкритого обміну — поза чергою.</li><li>Перки оглядаються через портрет. Активний перк тягніть на ціль або торкніться його й цілі. Відмітки зілля зберігаються при обміні котлами.</li><li>Множники: ×2, ×4, ×6 — лише надруковані очки; резонанс враховує саботаж. 98 карт, 16 звичайних продовжень, 18 нових комбінаційних складників, 6 Оберегів, 2 Дистиляції. Ліміту руки немає. Перше ${state.targetPotions||3}-є готове зілля: фінал і +5 слави; іншим по останньому ходу.</li></ol>`,true);};
const folkMotion=tableMotion;tableMotion=function(events,old){folkMotion(events,old);for(const e of events)if(e.type==='whiteUse'){const target=document.querySelector(`[data-zone="brew:${e.owner}"]`);if(target){target.classList.add(e.ward?'ward-flash':'distill-flash');setTimeout(()=>target.classList.remove('ward-flash','distill-flash'),1100);}}};
const folkInspectTable=inspectTable;inspectTable=function(el){const r=[...state.market,...state.players.flatMap(p=>p.recipes)].find(r=>r.id===el.dataset.recipeId);if(r?.chaos){inspectionSource=el.dataset.dragKind?tableGestureSource(el):null;modal(r.name,`<div class="inspect-grid"><div class="inspect-recipe">${recipeCard(r)}</div><div class="inspect-copy"><h3>Чортів казан</h3><p>Будь-які типи і будь-яка кількість. Можна завершити після першого власного інгредієнта, коли відповіді суперників завершені.</p><p><b>Очки своїх карт та ефектів + активні негативи + кількість усіх реальних інгредієнтів у котлі.</b> Мінімум 0.</p><p>Саботаж −2 дає −1 разом із бонусом за карту. Скасований саботаж дає +1 за карту. Білі карти та нейтральні замінники не рахуються.</p><p>Завершення знаходиться на самому котлі. Воно не передає хід.</p>${inspectionSource?'<button data-inspect-select>Обрати рецепт →</button>':''}</div></div>`,true);return;}folkInspectTable(el);const sealed=state.players.some(p=>p.brew.some(b=>b.sealed&&(b.card.id===el.dataset.cardId||b.attacks.some(a=>a.card.id===el.dataset.cardId))));if(sealed)modalRoot.querySelector('.inspect-copy')?.insertAdjacentHTML('beforeend','<p><b>Нульова змова:</b> числові очки цього складника й усіх його негативів — 0. Ефекти активні.</p>');};

/* The map is a separate station beside the cauldrons and market. */
let hexBludSource=null;
let hexScoutTiles=[],hexSeedCard=null,hexMenu=null,hexSkillOpen=false,hexScouting=false;
const hexCoordinates=HEX_GRID.centers;
const hexSigns=['✧','♠','✿','♜','❧','◆','◈'];
function hexNeighbor(a,b){return a!==b&&(a===0||b===0||Math.abs(a-b)===1||Math.abs(a-b)===5);}
function hexCardOptions(cards){return cards.map(c=>'<option value="'+esc(c.id)+'">'+esc(c.name)+'</option>').join('');}
function hexField(){
 const map=state.hexMap,p=me(),mine=isMine(),moving=mine&&state.phase==='move',choice=map.choice;
 const perk=map.perk,targets=map.targets||{},effective=map.skillHex??p.hex;
 const field=map.tiles.map((tile,i)=>{
  const [x,y]=hexCoordinates[tile.position],reachable=moving&&(map.moves||[]).includes(i);
  const canBorrow=canUseCurrentHex()&&targets.borrow?.includes(i);
  const canPay=(canUseCurrentHex()||choice)&&i===p.hex;
  const people=state.players.filter(q=>q.hex===i);
  const tokens=people.map(q=>'<span class="hex-token '+(q.id===p.id&&(moving||perk?.mode==='blud')?'hex-draggable':'')+'" data-hex-token="'+esc(q.id)+'" style="--token-hue:'+(state.players.indexOf(q)*61)+'" aria-label="'+esc(q.name)+'">'+tablePortrait(q)+'</span>').join('');
  return '<div class="hex-cell" '+(canBorrow||canPay?'data-drop="hex-payment" data-hex-destination="'+i+'" ':'')+'style="--hx:'+x+'%;--hy:'+y+'%"><button class="hex-tile '+(i===p.hex?'here ':'')+(reachable?'hex-reachable ':'')+(tile.blocked?'hex-blocked':'')+'" data-hex-tile="'+i+'" data-art="'+i+'" '+(canBorrow||canPay?'data-drop="hex-payment" ':'')+' aria-label="'+esc(tile.name)+'"><span class="hex-crest">'+hexSigns[i]+'</span><span class="hex-stock">'+(tile.blocked?'ᛟ ': '')+(tile.count?'▰ '+tile.count:'—')+'</span><strong>'+esc(tile.name)+'</strong></button><div class="hex-tokens">'+tokens+'</div></div>';
 }).join('');
 const selected=hexMenu??p.hex,shown=selected===p.hex?map.tiles[effective]:map.tiles[selected],here=selected===p.hex;
 let controls='';
 if(choice&&choice.kind!=='roots-brew'){
  controls='<p>'+(choice.kind==='seed'?'Оберіть карту й торкніться гекса для посіву.':'Завершіть вибір, розпочатий до оновлення.')+'</p><div class="hex-options">'+choice.cards.map(c=>'<button data-hex-action="legacyChoice" data-hex-card="'+esc(c.id)+'">'+esc(c.name)+'</button>').join('')+'</div>';
 }else if(choice){
  controls='<p class="hex-skill-status" role="status">'+esc(map.brewReason)+'</p><div class="hex-choice-cards" data-zone="hex-choice:'+p.id+'">'+choice.cards.map(c=>tableCard(c,'hex-choice',p.id,choice.play?.includes(c.id)?'data-combo-ready="true"':!choice.play?.length&&rec(p)?'data-keep-ready="true"':'data-combo-unavailable="true"')).join('')+'</div>'+(!choice.play?.length&&rec(p)?'<p>Жодна не підходить до рецепта — перетягніть одну карту в руку.</p><div class="hex-keep-zone" data-drop="hand" data-player="'+p.id+'" role="button" tabindex="0" aria-label="Забрати карту в руку">У руку ↓</div>':'')+'<button data-hex-action="skipChoice">'+(rec(p)?'Відмовитися (вміння гекса витрачено)':'Повернутися до варки')+'</button>';
 }else if(here){
  controls='<div class="hex-options">'+(moving?'<button data-hex-action="stay">Залишитися</button>':'')+'</div>';
  if(canUseCurrentHex()){
   if(effective===0){
    controls+='<div class="oak-steps"><b class="'+(targets.paid?'done':'active')+'">'+(targets.paid?'✓':'1.')+' Оплата Дуба</b><span>→</span><b class="'+(targets.paid?'active':'')+'">2. Вміння поляни</b></div><p>'+(targets.paid?'Дуб оплачено. Оберіть поляну — її вміння має власну ціну (наприклад, Джерело — ще одна Рідина).':'Перетягніть будь-який інгредієнт на Дуб: він іде в скид як плата за перехрестя. Потім оберіть поляну.')+'</p>';
    if(targets.paid)controls+='<div class="hex-borrow-options">'+targets.borrow.map(i=>'<button data-hex-action="borrow" data-hex-target="'+i+'">'+hexSigns[i]+' '+esc(map.tiles[i].name)+'</button>').join('')+'</div>';
   }
   else if(effective===3)controls+=(p.hex===0?'<div class="oak-steps"><b class="done">✓ Оплата Дуба</b><span>→</span><b class="active">2. '+esc(map.tiles[effective].name)+'</b></div>':'')+'<p class="hex-skill-status" role="status">'+esc(map.brewReason)+'</p><button data-hex-action="roots" '+(!state.discardCount?'disabled':'')+'>Переглянути скид · '+Math.min(3,state.discardCount)+'/3</button>';
   else if(effective===4)controls+='<p>Перетягніть атакований складник на свій гекс, щоб очистити ціною його очок та ефекту.</p>';
   else controls+='<p>'+(effective===5?'Перетягніть Комаху з руки на складник нижче.':effective===6?'Перетягніть Рідину на складник з ефектом нижче.':effective===2?'Перетягніть складник із руки на свій гекс: 0 очок та продовження.':'Перетягніть складник із руки на свій гекс: пошук Грибів.')+'</p>';
   if([4,5,6].includes(effective))controls+='<div class="hex-choice-cards">'+p.brew.filter(b=>targets.units?.includes(b.id)).map(b=>'<div class="hex-unit-target" data-drop="hex-unit" data-player="'+p.id+'" data-target="'+b.id+'">'+tableCard(b.card,effective===4?'hex-unit':'',p.id)+(effective===4?'<button data-hex-action="clean" data-hex-target="'+b.id+'">Очистити</button>':'')+'</div>').join('')+'</div>';
  }else controls+='<p>'+(map.used?'Уміння поляни вже використано.':'Уміння доступне у свій хід до переміщення.')+'</p>';
 }else{
  const legal=moving&&map.moves?.includes(selected);
  controls='<p>'+(map.tiles[selected].blocked?'Чугайстер закрив вхід.':legal?'Перехід: урожай і одна карта за рух.':'Оберіть шлях після варки.')+'</p>'+(legal?'<button data-hex-action="go">Перейти</button>':'');
 }
 if(perk?.mode==='blud')controls+='<div class="hex-options">'+state.players.filter(q=>perk.players?.includes(q.id)).map(q=>'<button data-hex-action="swap" data-hex-player="'+q.id+'" data-hex-target="'+q.hex+'">Обмінятися з '+esc(q.name)+'</button>').join('')+'</div>';
 if(perk?.mode==='chugaister')controls+='<button data-hex-action="lock">Закрити вхід</button>';
 if(perk?.mode==='mosskeeper'&&perk.targets.includes(selected))controls+='<button data-hex-action="character">Зібрати мохом</button>';
 return '<section class="world-station hex-station" data-station="hex"><div class="hex-layout"><div class="hex-field">'+field+'</div><aside class="hex-panel"><h2>'+esc(shown.name)+'</h2><p>'+esc(shown.rule)+'</p>'+controls+'<button class="ghost" data-hex-action="rules">Правила мапи</button></aside></div></section>';
}
function fitHexMap(){
 const station=document.querySelector('.hex-station'),layout=station?.querySelector('.hex-layout'),field=layout?.querySelector('.hex-field');
 if(!layout||!field)return;
 const style=getComputedStyle(station),height=station.clientHeight-(parseFloat(style.paddingTop)||0)-(parseFloat(style.paddingBottom)||0);
 const size=hexMapLayout(layout.clientWidth,height);
 layout.style.gridTemplateColumns='minmax(0,1fr) '+size.panelWidth+'px';
 layout.style.gap=size.gap+'px';
 field.style.width=size.boardWidth+'px';field.style.height=size.boardHeight+'px';
 field.style.setProperty('--hex-token-size',size.tokenSize+'px');
 field.style.setProperty('--hex-label-size',size.labelSize+'px');
 field.style.setProperty('--hex-counter-size',size.counterSize+'px');
}
const layoutBeforeHexFit=layoutSpatialTable;
layoutSpatialTable=function(){layoutBeforeHexFit();fitHexMap();};
const previousHexShell=updateTableShell;
updateTableShell=function(html){
 if(state?.hexMap&&state.status==='playing'){
  html=html.replace('</nav>','<button class="'+(tableView==='hex'?'chosen':'')+'" data-table-view="hex">Мапа</button></nav>');
  html=html.replace('<div class="table-world">','<div class="table-world">'+hexField());
 }
 previousHexShell(html);
 const root=$('.tabletop');if(root){root.dataset.currentView=tableView;root.classList.remove('hex-hand-open','hex-map-open');}
};
let hexMenuTurn=null;
const previousHexRender=render;
let hexAutoFocus=null,lastHexShown=null,hexDrag=null,hexMossPayment=null,hexMotionUntil=0;
let hexPlayback=null,hexPlaybackQueued=null;
const applyStateBeforeHexResult=applyState;
applyState=function(next){
 if(state?.me===next.me&&state.players.find(p=>p.id===state.me)?.hex!==next.players.find(p=>p.id===next.me)?.hex)hexMenu=null;
 if(tableView==='hex'&&state?.code===next.code&&next.events?.some(e=>e.type==='hexResult'&&e.moved&&e.seq>seenTableSeq))hexMotionUntil=Date.now()+950;
 return applyStateBeforeHexResult(next);
};
render=function(){
 if(hexPlayback){tableView='hex';previousHexRender();updateHexPlaybackOverlay();return;}
 const turn=state?.hexMap?state.code+':'+state.round+':'+state.turn:null;
 if(turn!==hexMenuTurn){hexMenuTurn=turn;hexMossPayment=null;hexBludSource=null;hexMenu=null;hexSkillOpen=false;hexScouting=false;hexScoutTiles=[];}
 const reacts=state?.status==='playing'&&state.phase==='reaction'&&state.reactionPlayer===state.me;
 const choosesCard=state?.effectChoice?.owner&&state.effectChoice.owner===state.me;
 const focus=state?.hexMap&&(state.phase==='move'||state.hexMap.choice)
   ?turn+':'+(state.hexMap.choice?.kind||'move'):null;
 const shown=state?.hexMap?state.code+':'+state.hexMap.shown:null;
 const shared=lastHexShown?.startsWith(state?.code+':')&&shown!==lastHexShown;
 if(reacts||choosesCard){
  if(tableView==='hex'||reacts&&tableView!=='brew'){
   tableView='brew';
   tablePlayer=state.players[state.turn]?.id;
  }
 }else if(shared||focus&&focus!==hexAutoFocus)tableView='hex';
 if(tableView==='hex'&&hexAutoFocus&&focus===null&&hexAutoFocus.endsWith(':move')&&!shared&&Date.now()>=hexMotionUntil)tableView='brew';
 lastHexShown=shown;
 hexAutoFocus=focus;
 previousHexRender();
};
const previousHexBell=phaseBell;
phaseBell=function(){if(state.hexMap&&state.phase==='move'&&isMine())return '<button class="turn-bell" data-table-view="hex">⬡<span>Оберіть шлях</span></button>';return previousHexBell();};
const previousHexPhase=phaseInfo;
phaseInfo=function(){return state?.hexMap&&state.phase==='move'?[isMine()?'Оберіть шлях':'Рух суперника','Один крок або залишитися']:previousHexPhase();};
function canUseCurrentHex(){
 const map=state?.hexMap,p=me();
 return !!(!hexPlayback&&map&&p&&isMine()&&p.hex===map.start&&!map.used&&!map.choice&&!state.effectChoice&&['main','chain','post','defense','move'].includes(state.phase));
}
function isHexPayment(c){
 return !!(canUseCurrentHex()&&c?.type==='ingredient'&&state.hexMap.targets?.payments?.includes(c.id));
}
const tableTargetBeforeHex=legalTableTarget;
legalTableTarget=function(src,target){
 const d=target?.dataset||{},p=me(),choice=state?.effectChoice;
 if(src?.kind==='effect-choice'&&choice?.owner===state.me){
  if(choice.kind==='stoke')return d.drop==='discard'&&choice.cards.some(c=>c.id===src.card);
  if(choice.kind==='rebrew')return d.drop==='hand'||d.player===p.id&&['brew','ingredient'].includes(d.drop)&&choice.play?.includes(src.card);
 }
 if(src?.kind==='hex-choice'&&!state.hexMap?.choice?.play?.length)return !!(isMine()&&d.drop==='hand'&&state.hexMap?.choice?.cards?.some(c=>c.id===src.card));
  if(src?.kind==='hex-choice')return !!(state.hexMap?.choice?.play?.includes(src.card)&&isMine()&&(d.drop==='hex-payment'&&Number(d.hexTile??d.hexDestination)===p.hex||d.player===p.id&&['brew','ingredient'].includes(d.drop)));
 if(tableView==='hex'){
  if(d.drop==='hex-unit')return src?.kind==='hand'&&isHexPayment(p.hand.find(c=>c.id===src.card))&&state.hexMap.targets?.units?.includes(d.target);
  if(d.drop==='hex-payment'){
   if(src?.kind==='hex-unit')return state.hexMap.skillHex===4&&state.hexMap.targets.units.some(id=>p.brew.some(b=>b.id===id&&b.card.id===src.card));
   if(src?.kind!=='hand'||!isHexPayment(p.hand.find(c=>c.id===src.card)))return false;
   if(state.hexMap.skillHex===0)return Number(d.hexTile??d.hexDestination)===p.hex||state.hexMap.targets.borrow.includes(Number(d.hexTile??d.hexDestination));
   return Number(d.hexTile??d.hexDestination)===p.hex&&[1,2].includes(state.hexMap.skillHex);
  }
 }
 return tableTargetBeforeHex(src,target);
};
const tableDropBeforeHex=tableDrop;
tableDrop=async function(src,target){
 if(!target||busy)return;
 const d=target.dataset,p=me(),choice=state.effectChoice;
 if(src.kind==='effect-choice'&&choice?.owner===state.me&&['rebrew','stoke'].includes(choice.kind)){
  if(!legalTableTarget(src,target))return;
  return act({type:'chooseEffect',choice:choice.id,card:src.card,play:d.drop!=='hand'&&choice.kind==='rebrew'});
 }
 if(src.kind==='hex-choice'){
  if(!legalTableTarget(src,target))return;
  return act({type:'hexChoose',card:src.card});
 }
 if(tableView==='hex'&&['hex-payment','hex-unit'].includes(d.drop)){
  if(!legalTableTarget(src,target))return;
  if(src.kind==='hex-unit')return act({type:'hexUse',target:p.brew.find(b=>b.card.id===src.card)?.id});
  if(state.hexMap.skillHex===0)hexMenu=p.hex;
  const flower=state.hexMap.skillHex===2;
  await act({type:'hexUse',card:src.card,target:d.target,hex:Number(d.hexTile??d.hexDestination)});
  if(flower&&state.turnData.flowerCard===src.card){
   tableView='brew';await act({type:'play',card:src.card});
  }
  return;
 }
 return tableDropBeforeHex(src,target);
};
const feedbackBeforeHex=updateTurnFeedback;
updateTurnFeedback=function(){
 feedbackBeforeHex();
 for(const el of document.querySelectorAll('.table-hand [data-card-id]')){
  const usable=tableView==='hex'&&isHexPayment(me()?.hand.find(c=>c.id===el.dataset.cardId));
  el.classList.toggle('hex-payable',usable);
 }
};
const previousHexClick=handleFolkloreClick;
handleFolkloreClick=function(e){
 const button=e.target.closest('[data-hex-tile],[data-hex-action]');
 if(!button)return previousHexClick(e);
 e.preventDefault();e.stopImmediatePropagation();
 if(busy||hexPlayback||!state?.hexMap)return true;
 const d=button.dataset,p=me();
 if(d.hexTile!==undefined){
  if(state.hexMap.choice?.kind==='seed'&&hexSeedCard){const card=hexSeedCard;hexSeedCard=null;act({type:'hexChoose',card,hex:Number(d.hexTile??d.hexDestination)});}
  else{hexMenu=Number(d.hexTile);hexSkillOpen=hexMenu===p.hex;render();}
 }
 else if(d.hexAction==='rules')modal('Правила мапи','<ol class="rules-list"><li>Уміння гекса початку ходу доступне до варки, між складниками та після саботажу. Кожне вміння — раз за хід.</li><li>Після варки перетягніть фішку на доступний гекс. Урожай і одна карта за рух надходять одразу. Водяник може пройти два кроки, урожай збирає у кінцевій точці.</li><li>Якщо фішка повернулася на той самий гекс — підтвердьте залишення.</li><li>Наприкінці круга виростає по карті. Перший за чергою з тих, хто залишився, отримує її.</li><li>Чугайстер закриває вхід, доки стоїть на зовнішньому гексі. Сусіди можуть вільно піти. Блуд обмінює фішки й отримує доступ до нового вміння.</li></ol>',true);
 else if(d.hexAction==='stay'&&isMine()&&state.phase==='move')act({type:'hexMove',hex:p.hex});
 else if(d.hexAction==='go'&&isMine()&&state.hexMap.moves?.includes(hexMenu))act({type:'hexMove',hex:hexMenu});
 else if(d.hexAction==='roots')act({type:'hexUse'});
 else if(d.hexAction==='borrow')act({type:'hexUse',hex:Number(d.hexTarget)});
 else if(d.hexAction==='clean')act({type:'hexUse',target:d.hexTarget});
 else if(d.hexAction==='skipChoice')act({type:'hexChoose'});
 else if(d.hexAction==='legacyChoice'){if(state.hexMap.choice?.kind==='seed'){hexSeedCard=d.hexCard;render();}else act({type:'hexChoose',card:d.hexCard});}
 else if(d.hexAction==='swap')act({type:'hexPerk',hex:Number(d.hexTarget),player:d.hexPlayer});
 else if(d.hexAction==='lock')act({type:'hexPerk',hex:p.hex});
 else if(d.hexAction==='character')act({type:'hexPerk',hex:hexMenu});
 return true;
};
function stopHexDrag(event,cancel=false){
 const drag=hexDrag;
 if(!drag||drag.pointer!==event.pointerId)return;
 hexDrag=null;drag.ghost.remove();
 if(cancel)return;
 if(!drag.moved){hexMenu=me().hex;hexSkillOpen=true;render();return;}
 const hit=document.elementFromPoint(event.clientX,event.clientY),token=hit?.closest('[data-hex-token]');const tile=hit?.closest('.hex-cell')?.querySelector('[data-hex-tile]')||hit?.closest('[data-hex-tile]');
 if(!tile||!tile.closest('.hex-station')||!isMine())return;if(state.hexMap.perk?.mode==='blud'&&state.phase!=='move'){const other=token?.dataset.hexToken||state.players.find(q=>q.id!==state.me&&q.hex===Number(tile.dataset.hexTile))?.id;if(other)return act({type:'hexPerk',hex:Number(tile.dataset.hexTile),player:other});return;}
 const hex=Number(tile.dataset.hexTile),p=me();
 if(hex===p.hex){hexMenu=hex;hexSkillOpen=false;render();return;}
 const map=state.hexMap;
 if(state.phase==='move'&&map.moves?.includes(hex))act({type:'hexMove',hex});
}
document.addEventListener('pointerdown',event=>{
 const token=event.target.closest('.hex-draggable');
 if(!token||event.button!==0||busy||hexDrag||hexPlayback)return;
 event.preventDefault();
 const ghost=token.cloneNode(true);ghost.classList.add('hex-ghost');
 const tokenRect=token.getBoundingClientRect();ghost.style.setProperty('width',tokenRect.width+'px','important');ghost.style.height=tokenRect.height+'px';
 ghost.style.left=event.clientX+'px';ghost.style.top=event.clientY+'px';
 document.body.append(ghost);token.setPointerCapture(event.pointerId);
 hexDrag={ghost,pointer:event.pointerId,x:event.clientX,y:event.clientY,moved:false};
});
document.addEventListener('pointermove',event=>{
 if(hexDrag?.pointer!==event.pointerId)return;
 hexDrag.moved ||= Math.hypot(event.clientX-hexDrag.x,event.clientY-hexDrag.y)>4;
 hexDrag.ghost.style.left=event.clientX+'px';hexDrag.ghost.style.top=event.clientY+'px';
});
document.addEventListener('pointerup',event=>stopHexDrag(event));
document.addEventListener('pointercancel',event=>stopHexDrag(event,true));
document.addEventListener('lostpointercapture',event=>stopHexDrag(event,true));

const previousHexMotion=tableMotion;
tableMotion=function(events,oldRects){
 previousHexMotion(events,oldRects);
 for(const [index,event] of events.filter(e=>e.type==='hexResult').entries()){
  setTimeout(()=>{
   const map=$('.hex-station'),tile=map?.querySelector('[data-hex-tile="'+(event.action==='hexPerk'&&!event.moved?event.target:event.tile)+'"]');
   if(!tile)return;
   const player=state?.players.find(p=>p.id===event.owner);
   const label=event.moved?'Перехід':event.action==='hexMove'?'Залишається':event.action==='hexPerk'?'Уміння персонажа':event.mode==='scout'?'Розвідка':event.mode==='seed'?'Посів':'Уміння гекса';
   const message=document.createElement('div');
   message.className='hex-result';
   message.textContent=(player?.name?player.name+' · ':'')+label+(event.gained?' · +'+event.gained+' карт':'');
   map.append(message);
   tile.classList.add('hex-result-pulse');
   const rect=tile.getBoundingClientRect(),hand=$('.table-hand')?.getBoundingClientRect();
   if(event.gained&&hand&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    for(let i=0;i<Math.min(4,event.gained);i++){
     const card=document.createElement('div');card.className='hex-fly-card';card.textContent='✧';
     Object.assign(card.style,{left:rect.x+rect.width/2+'px',top:rect.y+rect.height/2+'px'});
     document.body.append(card);
     card.animate([{transform:'translate(-50%,-50%) scale(.65)',opacity:1},{transform:'translate('+(hand.left+Math.min(hand.width*.45,120)+i*16-rect.x-rect.width/2)+'px,'+(hand.top-rect.y-rect.height/2)+'px) scale(1)',opacity:0}],{duration:470,delay:85*i,easing:'ease-in-out',fill:'both'}).finished.then(()=>card.remove(),()=>card.remove());
    }
   }
   setTimeout(()=>{tile.classList.remove('hex-result-pulse');message.remove();},950);
  },index*150+(event.moved?260:0));
 }
};

const comboChoicesBefore=effectChoicePanel;
effectChoicePanel=function(){
 let html=comboChoicesBefore();
 if(['rebrew','stoke'].includes(state.effectChoice?.kind)){
  html=html.replace('class="effect-choice-panel"','class="effect-choice-panel combo-choice-panel"');
  if(state.effectChoice.kind==='rebrew')html=html.replace('</header>','<span class="combo-keep-zone" data-drop="hand" role="button" tabindex="0">У руку ↓</span></header>');
 }
 return html.replace(/data-card-id="([^"]+)"/g,(match,id)=>match+(state.effectChoice?.play?.includes(id)?' data-combo-ready="true"':''));
};
const comboMotionBefore=tableMotion;
tableMotion=function(events,oldRects){
 comboMotionBefore(events,oldRects);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 for(const [index,event]of events.filter(e=>e.type==='combo').entries()){
  setTimeout(()=>{
   const anchor=findCardElement(event.card)||document.querySelector('[data-zone="brew:'+event.owner+'"]');
   if(!anchor)return;
   const bounds=anchor.getBoundingClientRect(),label=document.createElement('span');
   label.className='combo-result';label.textContent=event.text;
   label.style.left=(bounds.x+bounds.width/2)+'px';label.style.top=(bounds.y+bounds.height/2)+'px';
   document.body.append(label);
   label.animate([{transform:'translate(-50%,0) scale(.65)',opacity:0},{transform:'translate(-50%,-25px) scale(1.1)',opacity:1,offset:.2},{transform:'translate(-50%,-55px) scale(1)',opacity:0}],{duration:1400,fill:'forwards'}).finished.then(()=>label.remove());
  },450+index*400);
 }
};
const comboBrewBefore=tableBrew;
tableBrew=function(p){
 let html=comboBrewBefore(p);
 if(p.pendingMultiplier)html=html.replace('<div class="recipe-position">','<div class="combo-meter">Наступний складник ×'+p.pendingMultiplier+'</div><div class="recipe-position">');
 return html;
};
const comboInspectBefore=inspectTable;
inspectTable=function(el){
 comboInspectBefore(el);
 const unit=state.players.flatMap(p=>p.brew).find(b=>b.card.id===el.dataset.cardId);
 if(!unit)return;
 const copy=modalRoot.querySelector('.inspect-copy');
 if(unit.multiplier)copy?.insertAdjacentHTML('beforeend','<p><b>Підсилено ×'+unit.multiplier+': '+unit.card.points+' × '+unit.multiplier+' = '+unit.card.points*unit.multiplier+' слави.</b></p>');
 if(unit.zeroed)copy?.insertAdjacentHTML('beforeend','<p><b>Очки цього складника обнулено вмінням поляни.</b></p>');
 if(unit.echoResonance)copy?.insertAdjacentHTML('beforeend','<p><b>Відлуння скопіювало резонанс: кожен власний і підкинутий складник того ж типу, що «'+(unit.echoSource?.name||'попередня карта')+'», дає ще +1.</b></p>');
};


const applyStateBeforeTravel=applyState;
applyState=function(next){
 if(hexPlayback){
  if(next.code!==hexPlayback.next.code)cancelHexPlayback();
  else{if(next.version>hexPlayback.next.version&&(!hexPlaybackQueued||next.version>=hexPlaybackQueued.version))hexPlaybackQueued=next;return;}
 }
 const travel=state?.code===next.code&&next.events?.filter(e=>e.type==='hexTravel'&&e.seq>seenTableSeq).at(-1);
 if(travel&&state.hexMap&&typeof document.createElement==='function'){beginHexPlayback(next,travel);return;}
 return applyStateBeforeTravel(next);
};
function mapPoint(hex){
 const rect=document.querySelector('.hex-station [data-hex-tile="'+hex+'"]')?.getBoundingClientRect();
 return rect?{x:rect.x+rect.width/2,y:rect.y+rect.height/2}:null;
}
function playbackLater(playback,callback,delay){
 playback.timers.push(setTimeout(()=>{if(hexPlayback===playback)callback();},delay));
}
function updateHexPlaybackOverlay(){
 const playback=hexPlayback,map=document.querySelector('.hex-station');
 if(!playback||!map)return;
 document.querySelector('.tabletop')?.classList.add('hex-playback-active');
 let status=map.querySelector('.hex-playback-status');
 if(!status){status=document.createElement('div');status.className='hex-playback-status';status.setAttribute('role','status');map.append(status);}
 status.dataset.stage=playback.stage;
 status.innerHTML='<b>'+esc(playback.name)+' · '+esc(playback.title)+'</b><span>'+esc(playback.detail)+'</span>';
 for(const owner of playback.owners){const token=map.querySelector('[data-hex-token="'+owner+'"]');if(token)token.style.visibility='hidden';}
}
function playbackStage(playback,stage,title,detail){
 playback.stage=stage;playback.title=title;playback.detail=detail;updateHexPlaybackOverlay();
}
function playbackPiece(playback,owner,path){
 const player=playback.next.players.find(p=>p.id===owner),token=document.querySelector('.hex-station [data-hex-token="'+owner+'"]');
 const rect=token?.getBoundingClientRect(),destination=mapPoint(path.at(-1));
 if(!player||!destination)return;
 const source=rect?{x:rect.x+rect.width/2,y:rect.y+rect.height/2}:mapPoint(path[0]);
 if(!source)return;
 const points=[source,...path.slice(1).map(mapPoint).filter(Boolean)];
 const piece=document.createElement('div');piece.className='hex-travel-piece';piece.dataset.owner=owner;
 piece.innerHTML=tablePortrait(player);document.body.append(piece);playback.nodes.push(piece);
 const frames=points.map((point,i)=>({transform:'translate('+(point.x-26)+'px,'+(point.y-26)+'px)',offset:i/(points.length-1)}));
 if(playback.reduced)piece.style.transform=frames.at(-1).transform;
 else piece.animate(frames,{duration:Math.max(1,path.length-1)*620,easing:'ease-in-out',fill:'forwards'}).finished.catch(()=>{});
}
function playbackResources(playback,from,count,label){
 const target=playback.event.owner===state.me?document.querySelector('.table-hand-area'):document.querySelector('[data-zone="avatar:'+playback.event.owner+'"]');
 const rect=target?.getBoundingClientRect();
 if(!from||!rect)return;
 const to={x:rect.x+Math.min(rect.width/2,110),y:rect.y+rect.height/2};
 const caption=document.createElement('div');caption.className='hex-resource-caption';caption.textContent=label;
 Object.assign(caption.style,{left:Math.max(5,from.x-45)+'px',top:Math.max(75,from.y-30)+'px'});
 document.body.append(caption);playback.nodes.push(caption);
 for(let i=0;i<count&&!playback.reduced;i++){
  const card=document.createElement('div');card.className='hex-resource-flight';card.textContent='❧';card.dataset.resourceSource=playback.stage;
  Object.assign(card.style,{left:from.x-21+'px',top:from.y-29+'px'});document.body.append(card);playback.nodes.push(card);
  card.animate([{transform:'translate(0,0) rotate(-8deg) scale(.8)',opacity:0},{transform:'translate(0,-12px) scale(1)',opacity:1,offset:.15},{transform:'translate('+(to.x-from.x)+'px,'+(to.y-from.y)+'px) rotate(6deg) scale(.75)',opacity:1}],{duration:600,delay:i*100,easing:'cubic-bezier(.3,.1,.2,1)',fill:'both'}).finished.then(()=>card.remove(),()=>card.remove());
 }
 playbackLater(playback,()=>caption.remove(),600+Math.max(0,count-1)*100);
}
function beginHexPlayback(next,event){
 const actor=next.players.find(p=>p.id===event.owner);
 if(!actor){applyStateBeforeTravel(next);return;}
 const playback={next,event,name:actor.name,stage:'movement',title:event.mode==='swap'?'Обмін фішками':event.mode==='mosskeeper'?'Мохові пагони':'Перехід',detail:next.hexMap.tiles[event.from].name+' → '+next.hexMap.tiles[event.tile].name,owners:event.path.length>1?[event.owner,...(event.companion?[event.companion.owner]:[])]:[],timers:[],nodes:[],reduced:matchMedia('(prefers-reduced-motion: reduce)').matches};
 hexPlayback=playback;hexPlaybackQueued=null;tableView='hex';hexMenu=null;render();
 if(event.path.length>1)playbackPiece(playback,event.owner,event.path);
 if(event.companion)playbackPiece(playback,event.companion.owner,[event.companion.from,event.companion.tile]);
 const movement=Math.max(0,event.path.length-1)*620;
 playbackLater(playback,()=>{
  document.querySelector('.hex-station [data-hex-tile="'+(event.harvestHex??event.tile)+'"]')?.classList.add('hex-arrival-glow');
  playbackStage(playback,'arrival','Прибув на поляну',next.hexMap.tiles[event.tile].name);
 },movement);
 const harvestStart=movement+180,harvestDuration=event.harvest?600+(event.harvest-1)*100:220;
 playbackLater(playback,()=>{
  playbackStage(playback,'harvest',event.harvest?'Збирає урожай · +'+event.harvest:'Урожаю немає',next.hexMap.tiles[event.harvestHex??event.tile].name);
  if(event.harvest)playbackResources(playback,mapPoint(event.harvestHex??event.tile),event.harvest,'Урожай +'+event.harvest);
 },harvestStart);
 playbackLater(playback,()=>{
  const stock=document.querySelector('.hex-station [data-hex-tile="'+(event.harvestHex??event.tile)+'"] .hex-stock');
  if(stock&&event.harvest)stock.textContent='—';
 },harvestStart+harvestDuration);
 const travelStart=harvestStart+harvestDuration+120;
 if(event.travelDraw)playbackLater(playback,()=>{
  playbackStage(playback,'travel-card','Карта за рух · +'+event.travelDraw,'З колоди в руку '+actor.name);
  const rect=document.querySelector('.hex-map-pile[data-map-zone="deck"]')?.getBoundingClientRect();
  if(rect)playbackResources(playback,{x:rect.x+rect.width/2,y:rect.y+rect.height/2},event.travelDraw,'За крок +'+event.travelDraw);
 },travelStart);
 playbackLater(playback,()=>{
  const queued=hexPlaybackQueued,ids=new Set([...event.harvestIds,...event.travelIds]);
  const rendered={...next,events:next.events.filter(e=>e.type!=='hexTravel'&&!(e.type==='hexResult'&&e.owner===event.owner)&&!(e.type==='move'&&ids.has(e.card.id)))};
  cancelHexPlayback();tableView=next.phase==='move'||next.hexMap.choice?'hex':'brew';tablePlayer=next.players[next.turn]?.id;
  applyStateBeforeTravel(rendered);
  if(queued)applyState(queued);
 },event.duration);
}
function cancelHexPlayback(){
 if(!hexPlayback)return;
 hexPlayback.timers.forEach(clearTimeout);hexPlayback.nodes.forEach(node=>node.remove());
 document.querySelector('.tabletop')?.classList.remove('hex-playback-active');
 document.querySelector('.hex-playback-status')?.remove();
 document.querySelectorAll('.hex-arrival-glow').forEach(node=>node.classList.remove('hex-arrival-glow'));
 document.querySelectorAll('.hex-station [data-hex-token]').forEach(node=>node.style.visibility='');
 hexPlayback=null;hexPlaybackQueued=null;
}
