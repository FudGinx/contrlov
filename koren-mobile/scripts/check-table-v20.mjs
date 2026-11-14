
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
export function verifyTableUI({tabletop,feedback,css,engine}){
 const check=(ok,message)=>{if(!ok)throw Error(message);};
 for(const [name,source]of Object.entries({tabletop,feedback}))try{new Function(source);}catch(e){throw Error(name+': '+e.message);}
 const colors=new Function(engine.split('\n')[0].replace('export ', '')+';return COLORS;')();
 const color=id=>colors.find(c=>c.id===id),esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const names=['cardStackKey','groupIdentical','stackMarkup','handStacks','tableBrew','groupBrewCards','recipeCard'];
 const functions=names.map(name=>tabletop.split('\n').find(l=>l.startsWith('function '+name+'('))).join('\n');
 const state={me:'me',phase:'main',turnData:{},players:[]};
 const api=new Function('state','color','esc','tableCard','rec','hasSlot','isMine','need',functions+';return {handStacks,tableBrew,groupBrewCards,recipeCard};')(state,color,esc,(c,kind,owner,extra)=>'<div data-card-id="'+c.id+'" '+(extra||'')+'></div>',p=>p.recipe,(p,i)=>p.brew.some(b=>b.slot===i),()=>true,()=>undefined);
 const card=(id,name='Квіти')=>({id,type:'ingredient',name,color:'blue',points:1,negative:-2});
 const attack=(id,cid,cancelled=false)=>({id,card:card(cid),cancelled,from:'Бот'});
 const brew=[{id:'b1',card:card('c1'),slot:0,attacks:[attack('a1','n1'),attack('a2','n2',true)]},{id:'b2',card:card('c2','Коріння'),slot:1,attacks:[]},{id:'b3',card:card('c3'),slot:2,attacks:[]}];
 const recipe={id:'r1',name:'Ніч папороті',value:11,colors:['green','black','blue','brown','purple']};
 const player={id:'me',name:'QA',brew,hand:[card('h1'),card('h2')],recipe};
 state.players=[player];
 check(api.groupBrewCards(brew).map(g=>g[0].id).join(',')==='b1,b2,b3','Brew order changed or duplicates merged');
 const html=api.tableBrew(player);
 check((html.match(/class="table-unit"/g)||[]).length===3,'Duplicate brewed ingredients must stay separate');
 check(html.indexOf('data-brew-ids="b1"')<html.indexOf('data-brew-ids="b2"')&&html.indexOf('data-brew-ids="b2"')<html.indexOf('data-brew-ids="b3"'),'Brew display order differs from play order');
 check(html.includes('data-target="a1"')&&html.includes('data-target="a2"'),'Identical sabotage cards disappeared');
 check(html.includes('data-stack-size="3"'),'Physical card count is missing');
 check(api.handStacks(player).includes('×2'),'Identical hand cards no longer stack');
 for(const n of [5,6]){
  const r={...recipe,colors:n===5?recipe.colors:[...recipe.colors,'red']},markup=api.recipeCard(r);
  check((markup.match(/<li /g)||[]).length===n,'Recipe omitted a requirement');
  check(markup.includes(color(r.colors.at(-1)).name),'Last recipe type is missing');
 }
 const classSet=()=>{const values=new Set();return {add:c=>values.add(c),remove:c=>values.delete(c),contains:c=>values.has(c),toggle:(c,on)=>on?values.add(c):values.delete(c)};};
 const grid={style:{gridTemplateColumns:'repeat(3,106px)'}},unit={dataset:{brewIds:'b1'},style:{width:'',gridColumn:'1'},classList:classSet(),innerHTML:'original',parentElement:grid,closest:()=>({dataset:{station:'brew:me'}}),querySelectorAll:()=>[]};
 const getComputedStyle=()=>({getPropertyValue:k=>k==='--card-w'?'106px':'3'});
 const helper=feedback.slice(feedback.indexOf('let readingStack=null;'),feedback.indexOf("document.addEventListener('pointerover'"));
 const close=feedback.split('\n').find(l=>l.startsWith('function closeWhiteSpread('));
 const fan=new Function('state','getComputedStyle','tableCard','esc','restoreSettledCardVisibility','markLegalTargets','tableSelection','clearTimeout','toast',helper+'\n'+close+';return {stackContents,openReadingStack,closeReadingStack};')(state,getComputedStyle,(c,...args)=>'<div data-card-id="'+c.id+'" '+args[2]+'></div>',esc,()=>{},()=>{},null,()=>{},()=>{});
 const contents=fan.stackContents(unit);
 check(contents.cards.map(x=>x.card.id).join(',')==='c1,n1,n2','Expanded stack order or contents differ');
 check(contents.cards[2].cancelled,'Cancelled sabotage missing from inspection');
 check(fan.openReadingStack(unit),'Stack did not open');
 check(unit.classList.contains('stack-fan-open')&&unit.style.width==='334px','Fan did not allocate space in current grid');
 check((unit.innerHTML.match(/class="fan-card/g)||[]).length===3,'Expanded stack hides a physical card');
 check(unit.innerHTML.includes('left:114px')&&unit.innerHTML.includes('left:228px'),'Cards are not fully separated');
 fan.closeReadingStack();
 check(unit.innerHTML==='original'&&unit.style.width===''&&grid.style.gridTemplateColumns==='repeat(3,106px)','Closing stack failed to restore layout');

 const update=feedback.split('\n').find(l=>l.startsWith('function updateTurnFeedback('));
 const root={dataset:{}},hands=['h1','h2'].map(id=>({dataset:{cardId:id},classList:classSet()}));
 const document={querySelector:()=>null,querySelectorAll:sel=>sel==='.table-hand [data-card-id]'?hands:[]};
 let mine=true;
 const refresh=new Function('state','document','$','restoreSettledCardVisibility','myResponse','isMine','me','playable','current','dragging','tableSelection','markLegalTargets','color',update+';return updateTurnFeedback;')(state,document,()=>root,()=>{},()=>false,()=>mine,()=>player,c=>c.id==='h1',()=>player,null,null,()=>{},color);
 refresh();
 check(hands[0].classList.contains('can-play')&&!hands[0].classList.contains('cannot-play'),'Available card was dimmed');
 check(hands[1].classList.contains('cannot-play'),'Unavailable card was not dimmed on own turn');
 mine=false;refresh();
 check(!hands[1].classList.contains('cannot-play'),'Hand stays dimmed outside own turn');
 check(css.includes('.tabletop .table-hand .table-card.cannot-play{filter:brightness(.78) saturate(.85);opacity:1}'),'Dimming must keep hand cards opaque');
 check(css.includes('.tabletop .world-station .recipe-card:not(.chaos-recipe){height:auto;'),'Orders still have a fixed height');
 return {brewOrder:true,separateDuplicateIngredients:true,visibleDuplicateSabotage:true,handStacking:true,recipeRequirements:[5,6],inlineStackContents:true,inlineStackRestored:true,ownTurnDimming:true,syntax:true};
}
const result=verifyTableUI({tabletop:read('web/tabletop.js'),feedback:read('web/feedback.js'),css:read('web/tabletop.css'),engine:read('src/engine.js')});
console.log(JSON.stringify(result));
