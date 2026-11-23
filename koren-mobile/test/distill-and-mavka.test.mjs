import test from 'node:test';
import assert from 'node:assert/strict';
import {action,makePlayer,makeRoom,deck,canAdd,full,view} from '../src/engine.js';
function fixture(){
 const p=makePlayer('Пипа','p'),q=makePlayer('Бот 1','q'),z=makePlayer('Бот 2','z'),s=makeRoom('REPRO',p);
 s.players.push(q,z);s.status='playing';s.phase='main';s.turnData={actionUsed:false,allowance:0};
 p.character='mavka';q.character='molfar';z.character='chumak';
 p.recipes=[{id:'r',name:'Любисткова злагода',value:6,colors:['blue','blue','red']}];p.current='r';
 const cards=deck(),take=name=>{const i=cards.findIndex(c=>c.name===name);assert.ok(i>=0,name);return cards.splice(i,1)[0];};
 const wild=take('Сфагнум'),echo=take('Мох папоротевий'),extra=take('Мох-перелесник'),draw=take('Роса на лишайнику'),d1=take('Дистиляція'),d2=take('Дистиляція'),plain=cards.find(c=>c.type==='ingredient'&&c.color==='green'&&!c.effect);
 p.hand=[wild,echo,extra,draw,d1,d2,plain];q.hand=[take('Мох пірчастий')];z.hand=[take('Зозулин льон')];
 return {s,p,q,z,wild,echo,extra,draw,d1,d2,plain};
}
function responses(s,cards=false){action(s,s.players[s.turn].id,{type:'stop'});while(s.phase==='reaction'){const p=s.players[s.reactionQueue[s.reactionIndex]];action(s,p.id,{type:'react',...(cards?{card:p.hand[0].id}:{})});}}
function secondTurn(f){
 const{s,p,q,z,wild}=f;action(s,p.id,{type:'play',card:wild.id});responses(s);
 action(s,p.id,{type:'finishTurn'});action(s,q.id,{type:'end'});action(s,z.id,{type:'end'});
 assert.equal(s.turn,0);assert.equal(s.phase,'main');
}
function combo(f){secondTurn(f);const{s,p,echo,extra,draw}=f;for(const c of [echo,extra,draw])action(s,p.id,{type:'play',card:c.id});}
test('Mavka: after echo copies the previous-turn Sphagnum, the perk adds one more card only of the matching slot type',()=>{
 const f=fixture(),{s,p,plain,echo,extra,draw}=f;secondTurn(f);
 assert.equal(canAdd(s,p,echo),true);action(s,p.id,{type:'play',card:echo.id});assert.equal(p.brew[1].playedAs,'blue');assert.equal(p.brew[1].echoSource.name,'Сфагнум');
 assert.equal(canAdd(s,p,extra),false,'green moss no longer fills the red slot');
 const red={...plain,id:'red-plain',color:'red',name:'Червона'};p.hand.push(red);
 assert.equal(canAdd(s,p,red),true);action(s,p.id,{type:'play',card:red.id});
 assert.ok(p.brew[2].placementReason?.includes('Мавка')||p.recipes[0].potionMeta.mavkaUsed);assert.equal(full(p),true);
});
test('distillation removes the extra last ingredient and both sabotage cards, with one same-turn replacement',()=>{
 const f=fixture(),{s,p,d1,plain,draw,q,z}=f;p.recipes[0].colors=['blue','blue','green'];combo(f);responses(s,true);const last=p.brew.at(-1),bad=last.attacks.map(a=>a.card.id);
 assert.equal(last.slot,null);assert.equal(last.attacks.length,2);
 action(s,p.id,{type:'white',card:d1.id,target:last.id});assert.equal(p.brew.length,3);assert.equal(full(p),true);
 for(const id of [d1.id,draw.id,...bad])assert.ok(s.discard.some(c=>c.id===id));
 assert.equal(canAdd(s,p,plain),true);action(s,p.id,{type:'play',card:plain.id});
 assert.equal(p.brew.at(-1).slot,null);p.hand.push({...plain,id:'another-extra'});assert.equal(canAdd(s,p,p.hand.at(-1)),false);
 assert.equal(view(s,q.id).players[0].brew.length,4);assert.equal(view(s,z.id).players[0].brew.length,4);
});
test('two distilled extra ingredients grant two replacements without spending or manufacturing printed continuations',()=>{
 const f=fixture(),{s,p,d1,d2,plain}=f;p.character='chumak';
 const ingredient={...plain,id:'base'};p.brew=[0,1,2].map(slot=>({id:'slot'+slot,card:{...ingredient,id:'card'+slot},slot,attacks:[]}));
 p.brew.push(...[0,1].map(i=>({id:'extra'+i,card:{...ingredient,id:'old-extra'+i},slot:null,extra:true,attacks:[]})));
 s.phase='defense';s.turnData={actionUsed:true,allowance:0};p.hand=[d1,d2,...[0,1,2].map(i=>({...ingredient,id:'new-extra'+i}))];
 action(s,p.id,{type:'white',card:d1.id,target:'extra0'});action(s,p.id,{type:'white',card:d2.id,target:'extra1'});
 for(const id of ['new-extra0','new-extra1'])action(s,p.id,{type:'play',card:id});
 assert.equal(canAdd(s,p,p.hand[0]),false);assert.equal(s.turnData.allowance,0);assert.equal(p.brew.length,5);
});

test('a spent Mavka perk remains spent next turn even if a new echo is universally playable',()=>{
 const f=fixture();secondTurn(f);f.p.recipes[0].potionMeta={mavkaUsed:true};
 action(f.s,f.p.id,{type:'play',card:f.echo.id});assert.equal(canAdd(f.s,f.p,f.extra),false);
});
test('distilling an extra ingredient never grants a free replacement for a missing recipe position',()=>{
 const f=fixture(),{s,p,d1,plain}=f;p.character='chumak';
 p.brew=[{id:'slot0',slot:0,card:{...plain,id:'base'},attacks:[]},{id:'bonus',slot:null,extra:true,card:{...plain,id:'bonus-card'},attacks:[]}];
 s.phase='post';s.turnData={actionUsed:true,allowance:0};p.hand=[d1,{...plain,id:'blue',color:'blue'}];
 action(s,p.id,{type:'white',card:d1.id,target:'bonus'});assert.equal(canAdd(s,p,p.hand[0]),false);
 assert.equal(s.turnData.replacementExtras,1);assert.equal(s.turnData.replacementSlots,undefined);
});
