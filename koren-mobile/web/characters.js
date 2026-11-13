'use strict';
let characterPayment=null;
const oldCharacterPortrait=tablePortrait;
tablePortrait=function(p){const c=ch(p);if(c?.portraitSet==='new-perks-v1'){const i=c.portrait-12;return `<span class="table-portrait selected-character-portrait" style="--px:${i%2*100}%;--py:${Math.floor(i/2)*100}%"></span>`;}return oldCharacterPortrait(p);};
function ordinaryCharacterPlayable(c){if(state?.effectChoice)return false;if(c.type!=='ingredient'||myResponse())return oldCharacterPlayable(c);if(!isMine())return false;const p=me(),r=rec(p),slot=r?.colors.findIndex((_,i)=>!hasSlot(p,i)),replacement=(state.turnData.replacementSlots||[]).includes(slot);if(!['main','chain'].includes(state.phase)&&!replacement)return false;if(state.phase==='main'&&state.turnData.actionUsed&&!replacement||state.phase==='chain'&&state.turnData.actionUsed&&state.turnData.allowance<1&&!replacement)return false;const n=need(p),chp=ch(p);return n!==undefined&&(n===null||n===c.color||c.effect==='brew-wild'||chp?.firstWild&&slot===0||chp?.wildColor===c.color&&!state.turnData.wildUsed);}
const oldCharacterPlayable=playable;
playable=function(c){if(ordinaryCharacterPlayable(c))return true;const info=state?.characterAction;return !!(info?.ready&&info.costCards.includes(c.id));};
function validCharacterPayment(){return characterPayment&&characterPayment.room===state.code&&characterPayment.character===me().character&&me().hand.some(c=>c.id===characterPayment.card);}
const oldCharacterHandStacks=handStacks;
handStacks=function(p){if(!validCharacterPayment())return oldCharacterHandStacks(p);return groupIdentical(p.hand).map(cards=>{const top=cards.find(c=>c.id!==characterPayment.card)||cards[0];return stackMarkup(cards,tableCard(top,'hand',p.id));}).join('');};
function secondCharacterCard(c){const info=state.characterAction;if(!info?.ready||!validCharacterPayment()||c.id===characterPayment.card)return false;const first=me().hand.find(c=>c.id===characterPayment.card);return info.costCards.includes(c.id)&&(info.mode==='insect'?c.color==='black':info.mode==='mix'&&c.color===first.color);}
const oldCharacterLegalTarget=legalTableTarget;
legalTableTarget=function(src,target){if(!state||!src||!target)return false;const info=state.characterAction,p=me(),d=target.dataset,own=d.player===p.id,k=d.drop;
 if(src.kind==='character-perk')return !!(info?.ready&&info.mode==='shortcut'&&own&&['brew','ingredient'].includes(k));
 if(src.kind==='hand'){const c=p.hand.find(c=>c.id===src.card);if(!c)return false;
  if(k==='character-perk')return !!(own&&info?.ready&&['insect','mix'].includes(info.mode)&&info.costCards.includes(c.id));
  if(c.type==='ingredient'&&own&&['brew','ingredient'].includes(k)&&!myResponse()){
   if(info?.ready&&info.mode==='moss'&&k==='ingredient'&&info.targetIds.includes(d.target)&&info.costCards.includes(c.id))return true;
   if(secondCharacterCard(c))return true;
   return ordinaryCharacterPlayable(c);
  }
 }
 return oldCharacterLegalTarget(src,target);
};
const oldCharacterDrop=tableDrop;
tableDrop=async function(src,target){if(!target||busy)return;const info=state.characterAction,d=target.dataset,p=me();
 if(src.kind==='character-perk'){if(legalTableTarget(src,target))return act({type:'characterAction',mode:'shortcut'});return toast('Перк поки недоступний. Умови можна подивитися в огляді персонажа.');}
 if(src.kind==='hand'){const c=p.hand.find(c=>c.id===src.card);if(!c)return;
  if(d.drop==='character-perk'){if(!legalTableTarget(src,target))return toast('На цей перк потрібна інша карта.');characterPayment={room:state.code,character:p.character,card:c.id};render();return;}
  if(d.player===p.id&&['brew','ingredient'].includes(d.drop)){
   if(info?.ready&&info.mode==='moss'&&d.drop==='ingredient'&&info.targetIds.includes(d.target)&&info.costCards.includes(c.id))return act({type:'characterAction',mode:'moss',card:c.id,target:d.target});
   if(secondCharacterCard(c)){const first=characterPayment.card;characterPayment=null;return act(info.mode==='insect'?{type:'characterAction',mode:'insect',cost:first,card:c.id}:{type:'characterAction',mode:'mix',cards:[first,c.id]});}
  }
 }
 return oldCharacterDrop(src,target);
};
function updateCharacterControls(){const root=$('.tabletop');if(!root||!state||typeof document.createElement!=='function')return;const p=me(),info=state.characterAction,mode=info?.mode;if(characterPayment&&(!validCharacterPayment()||!isMine()||!info?.ready))characterPayment=null;
 if(mode){const old=document.querySelector('.table-controls .perk-button,.table-controls .character-perk-wrapper');if(old){const label=mode==='insect'?'◆ → ◆':mode==='mix'?'2 → 1':mode==='shortcut'?'−1 позиція':'Мох → Мох';old.outerHTML=`<div class="character-perk-wrapper"><div class="character-perk-zone ${info.ready?'perk-ready':''} ${info.used?'perk-spent':''}" data-drop="character-perk" data-player="${p.id}" data-drag-kind="character-perk" data-character="${p.id}" tabindex="0" role="button" aria-label="Оглянути перк ${esc(ch(p).name)}">${tablePortrait(p)}<strong>${info.used?'✓':label}</strong><small>${characterPayment?'Оплата обрана':mode==='insect'||mode==='mix'?'Карту сюди':mode==='shortcut'?'Перк → казан':'Мох із руки'}</small></div>${characterPayment?'<button class="perk-plan-clear" data-perk-plan-clear aria-label="Скасувати вибір оплати">×</button>':''}</div>`;}}
 for(const el of document.querySelectorAll('.table-hand [data-card-id]'))el.classList.toggle('perk-payment-picked',characterPayment?.card===el.dataset.cardId);
 for(const el of document.querySelectorAll('.table-hand .card-stack'))el.classList.toggle('payment-stack',!!characterPayment&&el.dataset.stackIds.split(',').includes(characterPayment.card));
 if(characterPayment){const hint=document.querySelector('.table-status>span'),first=p.hand.find(c=>c.id===characterPayment.card);if(hint)hint.textContent=info.mode==='insect'?'Тепер іншу Комаху ◆ тягніть на казан':'Тепер іншу карту типу «'+color(first.color).name+'» тягніть на казан';}
 if(info?.ready&&mode==='shortcut'&&!dragging?.active)document.querySelector(`[data-station="brew:${p.id}"] [data-drop="brew"]`)?.classList.add('field-available');
}
const oldCharacterFeedback=updateTurnFeedback;updateTurnFeedback=function(){oldCharacterFeedback();updateCharacterControls();};
document.addEventListener('click',e=>{if(e.target.closest('[data-perk-plan-clear]')){e.preventDefault();e.stopImmediatePropagation();characterPayment=null;render();}},true);
const oldInspectCharacter=inspectCharacter;
inspectCharacter=function(pid){oldInspectCharacter(pid);const p=state.players.find(p=>p.id===pid),mode=ch(p)?.characterAction;if(pid!==state.me||!mode)return;const copy=modalRoot.querySelector('.inspect-copy');if(!copy)return;const text=mode==='insect'?'Як застосувати: першу Комаху з руки перетягніть на значок перка праворуч. Потім іншу Комаху — на казан. Обидві карти витратяться лише після другого кроку.':mode==='mix'?'Як застосувати: перший інгредієнт перетягніть на значок перка праворуч. Потім інший інгредієнт того самого типу — на казан. Дві карти підуть у скид, позиція отримає нейтральний купаж.':mode==='moss'?'Як застосувати: перетягніть новий Мох із руки на конкретний Мох у своєму зіллі. Стопка розкриється для точного вибору.':'Як застосувати: коли не вистачає лише останньої позиції, перетягніть значок перка праворуч на свій казан. Це один раз за всю партію.';copy.insertAdjacentHTML('beforeend',`<p class="character-action-help">${text}</p>`);};
const oldCharacterRecipeCard=recipeCard;
recipeCard=function(r,p=null,kind=''){if(p?.shortcutRecipe===r.id)return oldCharacterRecipeCard({...r,value:r.value-3},p,kind).replace('<h3>','<small class="shortcut-label">Тиховар · рецепт −3</small><h3>');return oldCharacterRecipeCard(r,p,kind);};
