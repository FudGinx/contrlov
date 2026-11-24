export const COLORS=[{id:'red',name:'Гриби',symbol:'♠',hex:'#d7755e',art:0},{id:'blue',name:'Квіти',symbol:'✿',hex:'#7aa7d5',art:1},{id:'brown',name:'Коріння',symbol:'♜',hex:'#c8a47a',art:2},{id:'green',name:'Мохи',symbol:'❧',hex:'#9ebd76',art:3},{id:'black',name:'Комахи',symbol:'◆',hex:'#b4a4cb',art:4},{id:'purple',name:'Рідини',symbol:'◈',hex:'#c98dde',art:5}];
export const CHARACTERS=[
 {id:'mavka',name:'Мавка',title:'Моховий настил',portrait:0,art:8,mossFollow:true,text:'Раз на зілля відразу після свого Моху ❧ можна додатково викласти ще один інгредієнт. Тип має відповідати позиції рецепта.'},
 {id:'znakhar',name:'Знахар',title:'Чистий відвар',portrait:1,art:7,plainPlus:true,text:'Ваші складники без ефекту дають +1 слави. Множник множить і цей бонус.'},
 {id:'vidma',name:'Відьма',title:'Грибна отрута',portrait:2,art:6,harvest:'red',fungusSabotage:true,text:'Гриби ♠ можна підкидати як саботаж до будь-якого типу. Одну карту добору можна замінити Грибом зі скиду. Без мапи — одну з трьох карт на початку ходу, на мапі — карту за перехід (приходить на початку наступного ходу).'},
 {id:'chumak',name:'Чумак',title:'Крам із дороги',portrait:3,art:7,tradeExtra:true,text:'Раз на зілля після звичайного додавання можете додатково зварити складник, отриманий в обмін. Тип має відповідати позиції. Право діє до кінця наступного вашого ходу.'},
 {id:'vorozhka',name:'Ворожка',title:'Нульова змова',portrait:4,art:6,text:'Раз за партію при обриві рецепта з 4–5 позицій отримайте +3 слави, якщо закрили щонайменше три різні позиції справжніми складниками.'},
 {id:'travnytsia',name:'Травниця',title:'Парне настоювання',portrait:5,art:8,characterAction:'pair',text:'Раз на зілля перед варкою оберіть наступні дві позиції. Спочатку зіграйте Квіти, потім додатково Рідину. Лише один тип може не збігатися з рецептом. Звичайні ефекти працюють.'},
 {id:'molfar',name:'Мольфар',title:'Вільний порядок',portrait:6,art:7,anySlot:true,text:'Кладіть складники в будь-які вільні позиції відповідного типу. Саботаж припадає на останню зіграну карту.'},
 {id:'dyer',name:'Квітниця',title:'Вільний барвінок',portrait:7,art:8,wildColor:'blue',text:'Квіти ✿ можна варити в будь-яку вільну позицію Квітів свого рецепта — поза чергою. Якщо в рецепті немає Квітів, раз на зілля одна Квітка закриває будь-яку позицію.'},
 {id:'distiller',reserve:true,name:'Дистилярка',title:'Зберегти сутність',portrait:8,art:6,preserveDistill:true,text:'Одна Дистиляція входить у стартові 5 карт. Перша Дистиляція кожного зілля прибирає тільки прикріплений саботаж: ваш інгредієнт, його ефект і позиція залишаються. Наступні в цьому котлі працюють звичайно. Нове зілля знову має першу захищену Дистиляцію.'},
 {id:'apiarist',name:'Пасічник',title:'Оновити рій',portrait:12,portraitSet:'new-perks-v1',art:7,harvest:'black',characterAction:'insect',text:'При доборі можете вибрати Комаху зі скиду замість однієї випадкової карти. Раз на зілля перед варкою без витрати дії замініть свою Комаху іншою з руки. Старий складник і саботаж ідуть у скид. Нова карта запускає ефект і звичайні відповіді.'},
 {id:'quietbrewer',name:'Тиховар',title:'На ложку менше',portrait:13,portraitSet:'new-perks-v1',art:6,characterAction:'shortcut',text:'У кожному рецепті з 4–5 позицій можете пропустити останню та отримати повну нагороду.'},
 {id:'barterer',name:'Міняйло',title:'Два за один',portrait:14,portraitSet:'new-perks-v1',art:7,characterAction:'mix',text:'Замість варки скиньте два складники одного типу та відразу зваріть відповідний складник із п’яти верхніх карт скиду. Вибір відкривається до оплати.'},
 {id:'mosskeeper',mapTitle:'Мохові пагони',mapText:'Раз за зілля замість кроку зберіть увесь урожай із сусіднього гекса без фішок. Ви лишаєтеся на місці й не добираєте карту за крок. Мох ❧ у позиції Мху закриває одразу всі позиції Мху рецепта — зілля лишається чистим.',reserve:true,name:'Моховик',title:'Мох замість зілля',portrait:15,portraitSet:'new-perks-v1',art:8,harvest:'green',mossWild:true,text:'При доборі можна вибрати Мох ❧ зі скиду замість однієї випадкової карти. Одну будь-яку позицію кожного зілля можна закрити Мхом. Звичайне додавання витрачається.'},
 {id:'kharakternyk',name:'Козак-характерник',title:'Лови кулю',portrait:0,portraitSet:'folklore-v3',art:7,characterAction:'catch',text:'Раз за свій хід після відповідей скиньте інгредієнт того самого надрукованого типу, що саботаж у вашому котлі. Цей саботаж іде у скид — його негатив зникає.'},
 {id:'perelesnyk',name:'Перелесник',title:'Чуже обличчя',portrait:1,portraitSet:'folklore-v3',art:6,characterAction:'swap',text:'У свій хід замість варки обміняйте активний котел з чужим незавершеним. У своєму потрібно хоча б 2 інгредієнти. Переходять рецепт, складники, саботаж і відмітки. Кожен котел може брати участь лише один раз.'},
 {id:'blud',mapTitle:'Збити зі стежки',mapText:'Раз за свій хід до вміння поляни поміняйте місцями свій гекс із сусіднім (крім Дуба). Фішки лишаються на місцях, урожай їде разом із гексом. Одразу можна застосувати вміння нової поляни.',name:'Блуд',title:'Збити зі стежки',portrait:2,portraitSet:'folklore-v3',art:6,characterAction:'extend',text:'Раз за свій хід без витрати варки можна подовжити чужий незавершений рецепт. Виберіть один із двох випадкових типів і скиньте складник цього типу. Кожен котел можна подовжити лише раз.'},
 {id:'chugaister',mapTitle:'Варта лісу',mapText:'Можете закрити вхід на зовнішній гекс, де стоїте. Захист діє, доки ви лишаєтеся там. Поки стоїте на закритому гексі, його вміння не потребує оплати картою.',name:'Чугайстер',title:'Захист лісу',portrait:3,portraitSet:'folklore-v3',art:7,characterAction:'aid',text:'Раз на своє зілля скиньте складник і вимкніть один негатив у чужому котлі. Отримайте одне додаткове додавання цього ходу.'},
 {id:'vodianyk',mapTitle:'Підземна течія',mapText:'Кожен хід можете пройти до двох кроків. Збираєте урожай кінцевого гекса й отримуєте одну карту за рух.',reserve:true,name:'Водяник',title:'Господар вод',portrait:4,portraitSet:'folklore-v3',art:7,harvest:'purple',color:'purple',text:'Власні Рідини ◈ у своєму зіллі мають +1 слави. При початковому доборі можна вибрати Рідину зі скиду замість однієї випадкової карти. Саботаж не посилюється.'},
 {id:'domovyk',name:'Домовик',title:'Під захистом хати',portrait:5,portraitSet:'folklore-v3',art:7,keepsStarter:true,text:'Після завершення зілля можете залишити чистий складник для початку наступного рецепта. Якщо його тип відповідає першій позиції, покладіть його без витрати варки та без повторного ефекту. Одну карту можна перенести лише раз.'}
];
export const MAP_ROSTER=['mavka','dyer','znakhar','vidma','chumak','molfar','quietbrewer','mosskeeper','kharakternyk','blud','vodianyk','chugaister'];
const NAMES=[['Лисичка','Вогняний опеньок','Сонний мухомор','Боровик'],['Барвінок','Цвіт папороті','Нічна волошка','Сон-трава'],['Корінь мандрівника','Вузлуватий корінець','Корінь пам’яті','Дідова морква'],['Срібний мох','Мох-перелесник','Роса на лишайнику','Лісова борода'],['Крило жука','Вусик світляка','Пилок нічниці','Бурштиновий жук'],['Туман у пляшці','Жива крапля','Місячна роса','Сік калини']];
export function shuffle(a,rng=Math.random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
let seq=0;function id(){return 'c'+(++seq).toString(36)+'-'+Math.random().toString(36).slice(2,7);}
const NEW_NAMES=[["Червона сироїжка","Рижик","Сморчок","Печериця","Гриб-парасолька"],["Льон","Дзвоники","Цикорій","Незабудка","Ірис"],["Корінь оману","Корінь лопуха","Корінь дягелю","Корінь калгану","Корінь аїру"],["Зозулин льон","Сфагнум","Лишайник дубовий","Мох подушковий","Мох пірчастий"],["Божа корівка","Коник","Бабка","Цвіркун","Метелик"],["Березовий сік","Карпатська живиця","Чорничний настій","Квітковий нектар","Зоряний еліксир"]];
const COMBO_EFFECTS=['rebrew','echo','stoke'];
const COMBO_NAMES=[['Лисиччин виводок','Фіолетова рядовка','Трутовик жаркий'],['Макове повернення','Звіробійне відлуння','Ромашковий жар'],['Корінь мандрагори','Валеріановий корінець','Корінь живокосту'],['Ягель сріблястий','Мох папоротевий','Мох зозулин'],['Жук-смарагд','Бджола медоносна','Стрілка блакитна'],['Джерельна вода','Бурштинова настоянка','Калиновий сік']];
export const INGREDIENT_EFFECTS=[{id:'sift',points:0,negative:-2},{id:'brew-wild',points:0,negative:-3},{id:'recover',points:1,negative:-2},{id:'amplify',points:0,negative:-3},{id:'resonance',points:1,negative:-3}];
// Deck v37 «вариант А»: same card definitions, rebalanced number of copies per effect pack (90 ingredients).
export const HAND_LIMIT=10,SABOTAGE_PER_TURN=3,LEGACY_SABOTAGE=99,CLEAN_BONUS=2,FINAL_ROUND_BONUS=3;
export const START_HAND=5;
export function startHand(seat,rotate=true){return rotate?START_HAND:Math.min(10,4+seat);}
export const HAND_LIMITS=[10,11,12,13,14,15];
function handLimitOf(n){n=Number(n);return HAND_LIMITS.includes(n)?n:HAND_LIMIT;}
function sabCap(s){return s.legacy?LEGACY_SABOTAGE:SABOTAGE_PER_TURN;}
function roomHandLimit(s){return s.legacy?Infinity:handLimitOf(s.handLimit);}
export function cleanPotion(p){const r=recipe(p);if(!r||r.chaos)return false;return r.colors.every((color,slot)=>p.brew.some(b=>b.slot===slot&&(b.mossFill||!b.disabled&&!b.substituted&&b.card.type==='ingredient'&&b.card.color===color&&(!b.playedAs||b.playedAs===color))));}
export const COPY_PLAN={p3:9,p2:3,p1:3,draw:12,sift:9,recover:11,extra:9,stoke:5,rebrew:2,'brew-wild':2,echo:8,amplify:6,resonance:11};
const COPY_KEEP=['red','green','blue','brown','purple','black'];
function copyKey(c){return c.type!=='ingredient'?null:c.effect||('p'+c.points);}
function applyCopyPlan(cards){
 const out=cards.filter(c=>COPY_PLAN[copyKey(c)]===undefined),totals=new Map(COPY_KEEP.map(c=>[c,0]));
 const groups=Object.entries(COPY_PLAN).map(([key,target])=>({key,target,defs:COPY_KEEP.map(color=>cards.find(c=>copyKey(c)===key&&c.color===color)).filter(Boolean)}));
 groups.sort((a,b)=>a.defs.length-b.defs.length||a.target-b.target);
 for(const g of groups){
  const counts=new Map(g.defs.map(d=>[d.color,0])),add=d=>{out.push({...d,id:id()});counts.set(d.color,counts.get(d.color)+1);totals.set(d.color,totals.get(d.color)+1);};
  if(g.target<g.defs.length)for(const color of ['green','red'])if(counts.has(color)&&[...counts.values()].reduce((a,b)=>a+b,0)<g.target)add(g.defs.find(d=>d.color===color));
  while([...counts.values()].reduce((a,b)=>a+b,0)<g.target){const d=[...g.defs].sort((a,b)=>counts.get(a.color)-counts.get(b.color)||totals.get(a.color)-totals.get(b.color)||COPY_KEEP.indexOf(a.color)-COPY_KEEP.indexOf(b.color))[0];add(d);}
 }
 return out;
}
export function deck(full=false){const a=[];COLORS.forEach((c,ci)=>NAMES[ci].forEach((n,i)=>{const copies=i===1&&['blue','green'].includes(c.id)?2:[1,3,2,1][i];for(let k=0;k<copies;k++)a.push({id:id(),type:'ingredient',name:n,color:c.id,art:c.art,variant:i,illustration:ci*4+i,points:[2,1,1,3][i],negative:-[2,1,2,3][i],effect:i===1?'extra':i===2?'draw':null});}));COLORS.forEach((c,ci)=>INGREDIENT_EFFECTS.forEach((e,i)=>a.push({id:id(),type:'ingredient',name:NEW_NAMES[ci][i],color:c.id,art:c.art,variant:4+i,illustration:ci*5+i,artSet:'new-ingredients-v1',...e,id:id(),type:'ingredient',effect:e.id})));for(const [name,color,illustration]of [['Рута','blue',6],['Мох на криниці','green',7]])a.push({id:id(),type:'ingredient',name,color,artSet:'folklore-v3',illustration,variant:9,points:1,negative:-1,effect:null});COLORS.forEach((color,row)=>COMBO_EFFECTS.forEach((effect,column)=>a.push({id:id(),type:'ingredient',name:COMBO_NAMES[row][column],color:color.id,art:color.art,variant:10+column,illustration:row*3+column,artSet:'combo-ingredients-v1',points:0,negative:-3,effect})));for(let i=0;i<(full?6:8);i++)a.push({id:id(),type:'cancel',name:'Оберіг',art:5});for(let i=0;i<(full?2:3);i++)a.push({id:id(),type:'distill',name:'Дистиляція',art:5});return shuffle(full?a:applyCopyPlan(a));}
export function orders(){const rows=[['Стежка Мавки',['brown','purple','green','red'],8],['Купальська роса',['blue','purple','blue'],5],['Любисткова злагода',['blue','blue','red'],6],['Сон русалки',['purple','green','black'],5],['Полиновий оберіг',['brown','blue','brown'],6],['Мохова колиска',['green','green','brown','purple'],8],['Нічний гомін',['black','black','black'],7],['Слід характерника',['brown','green','green','red'],8],['Жар перелесника',['red','red','purple','red'],9],['Ніч папороті',['green','black','blue','brown','purple'],11],['Мед лісової пасіки',['blue','black','black','purple','purple'],12],['Відлуння Чугайстра',['brown','red','green','red','brown'],11]],a=[];for(let copy=0;copy<3;copy++)rows.forEach(([name,colors,value],i)=>a.push({id:id(),name,colors:[...colors],value,art:i%6}));a.push({id:id(),name:'Чортів казан',colors:[],value:0,chaos:true,art:5});return shuffle(a);}
export function character(p){const c=CHARACTERS.find(c=>c.id===p.character);return c?.mapText&&Number.isInteger(p.hex)?{...c,harvest:null,mossWild:false,color:null,characterAction:null,title:c.mapTitle,text:c.mapText}:c;}
export function makePlayer(name,token,bot=false){return {id:id(),token,name:String(name||'Мандрівник').trim().slice(0,22)||'Мандрівник',bot,host:false,character:null,hand:[],recipes:[],current:null,brew:[],score:0,completed:0};}
export function makeRoom(code,owner,options={}){owner.host=true;const target=Number.isInteger(options.targetPotions)&&options.targetPotions>=2&&options.targetPotions<=5?options.targetPotions:3;return {code,hexes:options.hexes?HEXES.map(()=>[]):null,fullDeck:!!options.fullDeck,smartBots:!!options.smartBots,legacy:!!options.legacy,rotate:!!options.rotate,hexSides:options.hexSides||'random',handLimit:handLimitOf(options.handLimit),targetPotions:target,players:[owner],status:'lobby',phase:'lobby',turn:0,round:1,deck:[],discard:[],orderDeck:[],orderDiscard:[],market:[],draft:0,turnData:{},log:[],finalStarter:null,finalQueue:[],trades:[],botAt:0,revision:0};}
function fail(s){throw new Error(s);}
export function log(s,msg){s.log.push({text:msg,time:Date.now()});s.log=s.log.slice(-70);}
export function active(s){return s.players[s.turn];}
export function recipe(p){return p.recipes.find(r=>r.id===p.current)||null;}
export function filled(p,slot){return p.brew.some(b=>!b.disabled&&b.slot===slot);}
export function needed(p){const r=recipe(p);if(!r)return null;if(r.chaos)return {extra:false,color:null,slot:Array.from({length:p.brew.length+1},(_,i)=>i).find(i=>!filled(p,i))};const slot=r.colors.findIndex((_,i)=>!filled(p,i));return slot<0?{extra:true,color:null,slot:null}:{extra:false,color:r.colors[slot],slot};}
export function full(p){const r=recipe(p);return !!r&&!r.chaos&&r.colors.every((_,i)=>filled(p,i));}
export function brewScore(p){
 let total=0;
 for(const unit of p.brew){
  if(unit.sealed)continue;
  if(!unit.disabled&&!unit.substituted&&!unit.zeroed){
   total+=((unit.card.points||0)+(character(p)?.plainPlus&&unit.card.type==='ingredient'&&!unit.card.effect?1:0))*(unit.multiplier||1)+(unit.boost||0)+(character(p)?.color===unit.card.color?1:0);
   if((unit.card.effect==='resonance'||unit.echoResonance)&&!unit.carried&&!unit.effectMuted)total+=resonanceCount(p,unit);
  }
  for(const attack of unit.attacks)if(!attack.cancelled)total+=attack.card.negative;
 }
 return total;
}
export function unitScores(p){
 const out={};
 for(const unit of p.brew){
  if(unit.sealed){out[unit.id]={own:0,bad:0,total:0};continue;}
  let own=0,bad=0;
  if(!unit.disabled&&!unit.substituted&&!unit.zeroed){
   own+=((unit.card.points||0)+(character(p)?.plainPlus&&unit.card.type==='ingredient'&&!unit.card.effect?1:0))*(unit.multiplier||1)+(unit.boost||0)+(character(p)?.color===unit.card.color?1:0);
   if((unit.card.effect==='resonance'||unit.echoResonance)&&!unit.carried&&!unit.effectMuted)own+=resonanceCount(p,unit);
  }
  for(const attack of unit.attacks)if(!attack.cancelled)bad+=attack.card.negative;
  out[unit.id]={own,bad,total:own+bad};
 }
 return out;
}
export function cleanBreak(p){const r=recipe(p);if(!r||r.chaos)return null;const bad=p.brew.find(b=>b.slot!==null&&b.slot!==undefined&&!b.mossFill&&(b.substituted||b.card.type!=='ingredient'||b.card.color!==r.colors[b.slot]||(b.playedAs&&b.playedAs!==r.colors[b.slot])));return bad?{slot:bad.slot,card:bad.card.name}:null;}
export function potPreview(p,s=null){const r=recipe(p),now=brewScore(p),done=full(p)||!!r?.chaos&&p.brew.length>0,legacy=!!s?.legacy,clean=!legacy&&full(p)&&cleanPotion(p),broken=legacy?null:cleanBreak(p);return {now,full:done,clean,cleanBonus:CLEAN_BONUS,cleanPossible:!legacy&&!!r&&!r.chaos&&!broken,cleanBroken:broken,reward:done?recipeReward(p):0,onClose:Math.max(0,now+(done?recipeReward(p):0)+(clean?CLEAN_BONUS:0))};}
function resonanceCount(p,unit){
 const color=unit.card.effect==='echo'&&unit.echoSource?.color||unit.card.color;
 return p.brew.reduce((sum,other)=>sum+Number(other!==unit&&!other.disabled&&!other.substituted&&other.card.type==='ingredient'&&other.card.color===color)+other.attacks.filter(a=>a.card.type==='ingredient'&&a.card.color===color).length,0);
}
export function draw(s,p,n){for(let i=0;i<n;i++){if(!s.deck.length&&s.discard.length){s.deck=shuffle(s.discard);s.discard=[];log(s,'Скид перемішано: колода знову жива.');}if(!s.deck.length)break;p.hand.push(s.deck.pop());}}
function refill(s){const count=s.players.length+1;while(s.market.length<count){if(!s.orderDeck.length&&s.orderDiscard.length){s.orderDeck=shuffle(s.orderDiscard);s.orderDiscard=[];}if(!s.orderDeck.length)break;s.market.push(s.orderDeck.pop());}}
function rematch(s,p){if(!p?.host)fail('Нову партію запускає господар.');s.players=s.players.map(q=>({...makePlayer(q.name,q.token,q.bot),id:q.id,host:q.host}));Object.assign(s,{hexes:s.hexes?HEXES.map(()=>[]):null,status:'lobby',phase:'lobby',turn:0,round:1,deck:[],discard:[],orderDeck:[],orderDiscard:[],market:[],draft:0,turnData:{},finalStarter:null,finalQueue:[],trades:[],exchange:null,effectChoice:null,hexChoice:null,botAt:0,games:(s.games||1)+1});delete s.hexOrder;delete s.roundStart;delete s.hexSide;log(s,p.name+' починає нову партію в цій кімнаті.');}
function start(s){if(s.players.length<2)fail('Потрібні хоча б двоє учасників.');s.status='playing';s.phase='character';s.draft=0;s.players.forEach(p=>p.character=null);log(s,'Оберіть своїх травників. Персонажі не повторюються.');}
function isCharacterAvailable(s,c){return s.hexes?MAP_ROSTER.includes(c.id):!c.reserve;}
function pickCharacter(s,p,cid){const c=CHARACTERS.find(c=>c.id===cid);if(!c||!isCharacterAvailable(s,c)||s.players.some(p=>p.character===cid))fail('Цей персонаж недоступний.');p.character=cid;log(s,p.name+' обирає '+c.name+'.');s.draft++;if(s.draft>=s.players.length){s.deck=deck(!!s.fullDeck);if(s.hexes){s.hexOrder=[0,...shuffle([1,2,3,4,5,6])];s.hexSide=s.legacy?null:chooseSides(s.hexSides);for(const p of s.players)p.hex=0;growHexes(s);}s.orderDeck=orders();s.players.forEach((p,seat)=>{if(character(p)?.preserveDistill){const i=s.deck.findIndex(c=>c.type==='distill');if(i>=0)p.hand.push(...s.deck.splice(i,1));}draw(s,p,(s.legacy||s.rotate?START_HAND:Math.min(10,4+seat))-p.hand.length);});refill(s);s.draft=0;s.phase='draft';}}
function begin(s){const p=active(s);p.ownTurns=(p.ownTurns||0)+1;s.phase='main';s.turnData={actionUsed:false,allowance:0,abilityUsed:false,abortUsed:false,last:null,startHex:p.hex};const travelSwap=!!(s.hexes&&character(p)?.harvest&&p.pendingHarvest);p.pendingHarvest=false;const count=(s.hexes?(travelSwap?1:0):3)+(character(p)?.draw||0),harvest=character(p)?.harvest,cards=harvest&&(!s.hexes||travelSwap)?s.discard.filter(c=>c.type==='ingredient'&&c.color===harvest):[];if(cards.length)s.effectChoice={id:id(),owner:p.id,kind:'harvest',cards,harvest,afterDraw:Math.max(0,count-1)};else draw(s,p,count);if(character(p)?.draw)perkNotice(s,p,'Крам із дороги: +1 карта');const n=needed(p);p.stallTurns=p.brew.length&&n?.color&&!p.hand.some(c=>c.color===n.color)?(p.stallTurns||0)+1:0;log(s,'Хід: '+p.name+'.');}
function chooseOrder(s,p,orderId,isDraft=false){if(p.recipes.length>=3)fail('Можна мати лише три незавершені замовлення.');const i=s.market.findIndex(r=>r.id===orderId);if(i<0)fail('Цей рецепт уже забрали.');const [r]=s.market.splice(i,1);p.recipes.push(r);refill(s);log(s,p.name+' обирає «'+r.name+'».');if(isDraft){s.draft++;if(s.draft>=s.players.length){s.turn=0;begin(s);}}else{s.turnData.orderTaken=true;}}
function takeCard(p,cardId){const i=p.hand.findIndex(c=>c.id===cardId);if(i<0)fail('Карти більше немає в руці.');return p.hand.splice(i,1)[0];}
function play(s,p,cardId,options={}){const c=p.hand.find(c=>c.id===cardId),n=options.replacing||ingredientSlot(p,c),baseline=!s.turnData.actionUsed,replacement=replacementReady(s,n),mavka=!options.free&&mossFollowReady(s,p)&&baseline===false&&!options.replacing;if(!c||c.type!=='ingredient'||!n)fail('Оберіть свій інгредієнт і рецепт.');if(!options.replacing&&!options.free&&!canAdd(s,p,c))fail('Цей інгредієнт зараз не можна додати.');if(options.replacing&&!options.free&&!['main','chain'].includes(s.phase))fail('Заміна зараз недоступна.');if(!['main','chain'].includes(s.phase)&&!replacement&&!options.free)fail('Зараз не час варки.');if(!options.replacing&&!canPlayColor(s,p,c,n))fail('Потрібен інший тип інгредієнта.');const r=recipe(p),meta=potionMeta(r),tradeExtra=!options.free&&!baseline&&!replacement&&!options.replacing&&tradeExtraReady(s,p,c,n);const pairSecond=s.turnData.pairPlan?.first&&pairMatch(s,c,n),pairFirst=!s.turnData.pairPlan?.first&&pairMatch(s,c,n);if(pairFirst){s.turnData.pairPlan.first=true;meta.pairUsed=true;}else delete s.turnData.pairPlan;takeCard(p,c.id);if(tradeExtra)meta.tradeExtraUsed=true;if(mavka&&!options.replacing){meta.mavkaUsed=true;perkNotice(s,p,'Моховий настил: додатковий складник будь-якого типу');log(s,p.name+' · Мавка: Моховий настил — додатковий складник будь-якого типу, раз на зілля.');}else if(replacement){if(n.extra)s.turnData.replacementExtras--;else s.turnData.replacementSlots=s.turnData.replacementSlots.filter(x=>x!==n.slot);}else if(s.phase==='chain'&&!baseline&&!options.free&&!tradeExtra&&!pairSecond)s.turnData.allowance--;if(!options.free&&!mavka)s.turnData.actionUsed=true;if(s.turnData.mushroomCards?.includes(c.id)&&c.color!==n.color)s.turnData.mushroomWildUsed=true;if(c.color!==n.color&&n.color&&!n.extra&&c.effect!=='brew-wild'&&!mavka){if(character(p)?.wildColor===c.color){s.turnData.wildUsed=true;meta.dyerWildUsed=true;}else if(character(p)?.mossWild&&c.color==='green')meta.mossWildUsed=true;else if(tradeWildReady(s,p,c))s.turnData.tradeWildUsed=true;}const placementReason=brewPlacementReason(s,p,c,n,mavka),b={id:id(),card:c,slot:n.slot,extra:n.extra,disabled:false,attacks:[],playedAs:n.color||c.color,placementReason};p.brew.push(b);s.turnData.last=b.id;s.turnData.mavkaSource=character(p)?.mossFollow&&c.color==='green'&&!meta.mavkaUsed?b.id:null;if(character(p)?.plainExtra&&!meta.plainExtraUsed&&!c.effect&&[1,2].includes(c.points)&&!n.extra){meta.plainExtraUsed=true;s.turnData.allowance++;perkNotice(s,p,'Чистий відвар: ще один складник');}s.phase='chain';ingredientEffect(s,p,b);log(s,p.name+' додає «'+c.name+'»'+(n.extra?' поза рецептом':n.color&&c.color!==n.color?' як '+COLORS.find(x=>x.id===n.color).name+(placementReason?' ('+placementReason+')':''):'')+'.');}
function stop(s){if(s.phase!=='chain')fail('Комбінацію ще не почато.');if(!active(s).brew.some(b=>b.id===s.turnData.last)){s.phase='post';return;}if(s.turnData.answeredLast===s.turnData.last||(s.turnData.sabotageCount||0)>=sabCap(s)){s.phase='defense';s.turnData.answeredLast=s.turnData.last;return;}const opponents=Array.from({length:s.players.length-1},(_,i)=>(s.turn+i+1)%s.players.length),p=active(s),offset=(p.reactionWindows||0)%opponents.length;p.reactionWindows=(p.reactionWindows||0)+1;s.reactionQueue=[...opponents.slice(offset),...opponents.slice(0,offset)];s.reactionIndex=0;s.phase='reaction';}
function react(s,p,cardId){if(s.players[s.reactionQueue[s.reactionIndex]]?.id!==p.id)fail('Зараз відповідає інший гравець.');const b=active(s).brew.find(b=>b.id===s.turnData.last);if(!b)fail('Немає цілі саботажу.');if(cardId){const c=p.hand.find(c=>c.id===cardId);if(!canSabotage(s,p,c))fail('Потрібен інгредієнт відповідного типу.');takeCard(p,c.id);b.attacks.push({id:id(),card:c,from:p.name,fromId:p.id,cancelled:false});s.turnData.sabotageCount=(s.turnData.sabotageCount||0)+1;log(s,p.name+' підкидає «'+c.name+'» ('+c.negative+').');}else log(s,p.name+' пасує.');s.reactionIndex++;if(s.reactionIndex>=s.reactionQueue.length||(s.turnData.sabotageCount||0)>=sabCap(s)){s.phase='defense';s.turnData.answeredLast=s.turnData.last;}}
function reserveStarter(s,p){
 const cards=p.brew.filter(b=>b.slot!==null&&b.card.type==='ingredient'&&!b.carried&&!b.disabled&&!b.attacks.length).map(b=>b.card);
 if(cards.length)s.effectChoice={id:id(),owner:p.id,kind:'starter',cards};
}
function clearBrew(s,p){for(const b of p.brew){if(b.card.type!=='essence')s.discard.push(b.card);s.discard.push(...b.attacks.map(a=>a.card));}p.brew=[];p.mossSwapUsed=false;p.shortcutRecipe=null;}
function close(s,p,complete){const r=recipe(p);if(!r||!p.brew.length)fail('У казані порожньо.');const abortBonus=!complete&&p.character==='vorozhka'&&!p.abortBonusUsed&&r.colors.length>=4&&r.colors.length<=5&&new Set(p.brew.filter(b=>b.slot!==null&&!b.disabled&&b.card.type==='ingredient').map(b=>b.slot)).size>=3?3:0;if(abortBonus)p.abortBonusUsed=true;const clean=complete&&!s.legacy&&cleanPotion(p),points=Math.max(0,brewScore(p)+(complete?recipeReward(p):abortBonus))+(clean?CLEAN_BONUS:0);p.score+=points;log(s,p.name+(complete?' завершує «':' знімає недовар «')+r.name+'»: +'+points+' слави'+(complete&&!r.chaos&&!s.legacy?(clean?' (✦ Чисте зілля +'+CLEAN_BONUS+')':' (не чисте — без +'+CLEAN_BONUS+')'):'')+'.');if(complete&&!s.legacy&&s.finalStarter&&s.finalStarter!==p.id){p.score+=FINAL_ROUND_BONUS;log(s,p.name+' доварює у фінальному колі: +'+FINAL_ROUND_BONUS+' слави.');}if(complete&&character(p)?.keepsStarter)reserveStarter(s,p);clearBrew(s,p);p.recipes=p.recipes.filter(x=>x.id!==r.id);if(r.originalColors)r.colors=r.originalColors;delete r.originalColors;delete r.potionMeta;if(!complete)s.orderDiscard.push(r);p.current=null;if(complete){p.hexPerkUsed=false;p.completed++;if(p.completed>=(s.targetPotions||3)&&!s.finalStarter){s.finalStarter=p.id;p.score+=5;s.finalQueue=Array.from({length:s.players.length-1},(_,i)=>s.players[(s.turn+i+1)%s.players.length].id);log(s,p.name+' запускає фінал! +5 слави.');}}}
function resolve(s){if(s.phase!=='defense')fail('Спочатку дочекайтеся відповідей.');const p=active(s);if(full(p))close(s,p,true);s.phase=!s.turnData.actionUsed&&recipe(p)?'main':'post';}
function end(s,afterMove=false){if(!['main','post','discard'].includes(s.phase)&&!(s.phase==='move'&&afterMove))fail('Спочатку завершіть комбінацію та відповіді.');if(s.phase==='discard')afterMove=true;if(s.hexes&&!afterMove&&!(s.finalStarter&&s.finalQueue.length===1&&s.finalQueue[0]===active(s).id)){s.phase='move';return;}const p=active(s);if(p.hand.length>roomHandLimit(s)){if(s.phase!=='discard')log(s,p.name+': у руці '+p.hand.length+' карт — скиньте до '+roomHandLimit(s)+'.');s.phase='discard';return;}s.trades=s.trades.filter(t=>t.status==='pending').slice(-12);if(s.finalStarter){if(p.id!==s.finalStarter)s.finalQueue=s.finalQueue.filter(id=>id!==p.id);if(!s.finalQueue.length){if(s.exchange){const t=s.exchange,o=s.players.find(x=>x.id===t.owner);o?.hand.push(t.card);for(const b of t.bids)s.players.find(x=>x.id===b.player)?.hand.push(b.card);s.exchange=null;}s.status='finished';s.phase='finished';log(s,'Партію завершено!');return;}s.turn=s.players.findIndex(x=>x.id===s.finalQueue[0]);}else{const n=s.players.length;let nx=(s.turn+1)%n;if(nx===(s.roundStart||0)){s.round++;if(s.hexes)growHexes(s);if(s.rotate){s.roundStart=((s.roundStart||0)+1)%n;nx=s.roundStart;}}s.turn=nx;}begin(s);}
function white(s,p,cardId,target){if(p.id!==active(s)?.id||!['main','chain','post','defense'].includes(s.phase))fail('Захист доступний у свій хід між діями.');const c=p.hand.find(x=>x.id===cardId),asWard=c?.type==='ingredient'&&character(p)?.ingredientWard&&!s.turnData.ingredientWardUsed;if(!c||!['cancel','distill'].includes(c.type)&&!asWard)fail('Оберіть білу карту або доступний інгредієнт Домовика.');if(c.type==='cancel'||asWard){const a=p.brew.flatMap(b=>b.attacks).find(a=>a.id===target&&!a.cancelled);if(!a)fail('Оберіть активний негатив.');a.cancelled=true;if(asWard)s.turnData.ingredientWardUsed=true;}else{const index=p.brew.findIndex(b=>b.id===target&&b.card.type==='ingredient');if(index<0)fail('Оберіть власний інгредієнт у казані.');const b=p.brew[index],preserve=character(p)?.preserveDistill&&!recipe(p)?.potionMeta?.distillPreserved;if(preserve&&!b.attacks.length)fail('На цьому інгредієнті немає саботажу для очищення.');s.discard.push(...b.attacks.map(a=>a.card));if(preserve){b.attacks=[];potionMeta(recipe(p)).distillPreserved=true;}else{s.discard.push(b.card);p.brew.splice(index,1);if(b.slot===null)s.turnData.replacementExtras=(s.turnData.replacementExtras||0)+1;else{s.turnData.replacementSlots??=[];if(!s.turnData.replacementSlots.includes(b.slot))s.turnData.replacementSlots.push(b.slot);}}}takeCard(p,c.id);const returned=character(p)?.returnWhite&&!asWard&&p.whiteReturnedRound!==s.round;if(returned){p.whiteReturnedRound=s.round;p.hand.push(c);perkNotice(s,p,'Захист лісу: біла карта повернулась');}else s.discard.push(c);s.ruleEvents??=[];s.ruleEvents.push({type:'whiteUse',owner:p.id,card:{...c},target,returned:!!returned,ward:c.type==='cancel'||!!asWard});log(s,p.name+' застосовує '+(asWard?'інгредієнт як Оберіг':c.name)+'.');}
function ability(s,p,target){const ch=character(p);if(s.turnData.abilityUsed)fail('Здібність уже використано в цей хід.');if(ch?.ability==='extra'){if(s.phase!=='chain')fail('Спочатку додайте перший інгредієнт.');s.turnData.allowance++;}else if(ch?.ability==='cancel'){if(!['main','post','defense','chain'].includes(s.phase))fail('Зараз не можна застосувати здібність.');const a=p.brew.flatMap(b=>b.attacks).find(a=>a.id===target&&!a.cancelled);if(!a)fail('Оберіть негативний ефект.');a.cancelled=true;}else fail('У цього персонажа пасивна здібність.');s.turnData.abilityUsed=true;log(s,p.name+' використовує здібність «'+ch.title+'».');}
function offer(s,p,a){if(s.status!=='playing'||s.phase==='draft')fail('Торгівля почнеться після вибору рецептів.');const to=s.players.find(x=>x.id===a.to&&x.id!==p.id);const card=p.hand.find(x=>x.id===a.card);if(!to||!card)fail('Оберіть гравця та свою карту.');if(s.trades.filter(t=>t.from===p.id&&t.status==='pending').length>=2)fail('Спочатку дочекайтеся відповіді на попередні пропозиції.');s.trades.push({id:id(),from:p.id,to:to.id,cardId:card.id,card:{...card},wanted:COLORS.some(c=>c.id===a.wanted)?a.wanted:'any',status:'pending'});log(s,p.name+' пропонує обмін гравцю '+to.name+'.');}
function accept(s,p,a){if(s.status!=='playing')fail('Партія не триває.');const t=s.trades.find(t=>t.id===a.offer&&t.status==='pending'&&t.to===p.id);if(!t)fail('Пропозиція вже неактивна.');const from=s.players.find(x=>x.id===t.from);const give=p.hand.find(c=>c.id===a.card);const receive=from.hand.find(c=>c.id===t.cardId);if(!give||!receive)fail('Одна з карт уже використана.');if(t.wanted!=='any'&&give.color!==t.wanted)fail('Потрібна карта запитаного кольору.');p.hand.push(takeCard(from,receive.id));from.hand.push(takeCard(p,give.id));t.status='accepted';log(s,from.name+' та '+p.name+' обмінялися картами.');}
function coreAction(s,pid,a){if(!a||typeof a.type!=='string')fail('Невідома дія.');const p=s.players.find(p=>p.id===pid);if(!p)fail('Гравця не знайдено.');if(a.type==='hexShow'){if(s.hexes&&p===active(s)&&s.status==='playing'&&['main','chain','post','move','defense'].includes(s.phase))s.hexShow=(s.hexShow||0)+1;return;}if(s.hexChoice){resolveHexChoice(s,p,a);return;}if(['hexUse','hexMove','hexPerk'].includes(a.type)){if(!s.hexes||s.status!=='playing'||p!==active(s)||s.effectChoice)fail('Дія на мапі недоступна.');if(a.type==='hexUse')useHex(s,p,a);else if(a.type==='hexMove')moveHex(s,p,a.hex);else useHexPerk(s,p,a);return;}if(s.effectChoice){if(a.type!=='chooseEffect')fail('Спочатку завершіть вибір карти.');chooseEffect(s,p,a);return;}if(['tradeOpen','tradeBid','tradeTake','tradeDiscard','tradeRecall','tradeDecline','tradeBidDiscard'].includes(a.type)){tableTrade(s,p,a);return;}if(a.type==='discardFree'){if(s.status!=='playing'||['draft','character'].includes(s.phase)||active(s).id!==pid)fail('Скид доступний у свій хід.');s.discard.push(takeCard(p,a.card));if(s.phase==='discard'&&p.hand.length<=roomHandLimit(s))end(s,true);return;}if(a.type==='offer'){if(active(s).id!==pid)fail('Відкрити обмін можна тільки у свій хід.');offer(s,p,a);return;}if(a.type==='accept'){accept(s,p,a);return;}if(a.type==='reject'){const t=s.trades.find(t=>t.id===a.offer&&t.status==='pending'&&(t.to===pid||t.from===pid));if(!t)fail('Пропозиція недоступна.');t.status='rejected';return;}
 if(s.status==='lobby'){if(!p.host)fail('Це дія господаря.');if(a.type==='settings'){if(a.hexSides!==undefined){if(!(['random','old','new'].includes(a.hexSides)||Array.isArray(a.hexSides)&&a.hexSides.length===7))fail('Оберіть сторони гексів.');s.hexSides=a.hexSides;if(a.handLimit===undefined&&a.targetPotions===undefined)return;}if(a.handLimit!==undefined){if(!HAND_LIMITS.includes(Number(a.handLimit)))fail('Ліміт руки: 10–15.');s.handLimit=Number(a.handLimit);if(a.targetPotions===undefined)return;}if(!Number.isInteger(a.targetPotions)||a.targetPotions<2||a.targetPotions>5)fail('Оберіть 2–5 зіль.');s.targetPotions=a.targetPotions;return;}if(a.type==='addBot'){if(s.players.length>=6)fail('У кімнаті шестеро.');s.players.push(makePlayer('Бот '+(s.players.filter(x=>x.bot).length+1),'',true));return;}if(a.type==='removeBot'){const i=s.players.findIndex(x=>x.bot&&x.id===a.player);if(i<0)fail('Бота не знайдено.');s.players.splice(i,1);return;}if(a.type==='start'){start(s);return;}fail('Дія недоступна у лобі.');}
 if(s.status==='finished'&&a.type==='rematch'){rematch(s,p);return;}if(s.status!=='playing')fail('Партію завершено.');if(s.phase==='character'){if(s.players[s.draft]?.id!==pid||a.type!=='chooseCharacter')fail('Зараз обирає інший гравець.');pickCharacter(s,p,a.character);return;}if(s.phase==='draft'){if(s.players[s.draft]?.id!==pid||a.type!=='order')fail('Зараз обирає інший гравець.');chooseOrder(s,p,a.order,true);return;}if(s.phase==='reaction'){if(a.type!=='react')fail('Тривають відповіді.');react(s,p,a.card);return;}if(active(s).id!==pid)fail('Зараз хід іншого гравця.');
 if(a.type==='characterAction')useCharacter(s,p,a);
 else if(a.type==='play')play(s,p,a.card);
 else if(a.type==='order'){if(!['main','post','defense'].includes(s.phase)||s.turnData.orderTaken)fail('Рецепт беруть раз за хід між діями.');chooseOrder(s,p,a.order);}
 else if(a.type==='selectRecipe'){if(!['main','post','defense'].includes(s.phase)||p.brew.length)fail('Спочатку закрийте зілля.');if(!p.recipes.some(r=>r.id===a.order))fail('Це не ваш рецепт.');p.current=a.order;delete s.turnData.pairPlan;if(p.starter&&p.starter.color===recipe(p).colors[0]){const card=p.starter;delete p.starter;p.brew.push({id:id(),card,slot:0,extra:false,disabled:false,attacks:[],playedAs:card.color,carried:true,amplifierSpent:true});}if(!s.turnData.actionUsed)s.phase='main';}
 else if(a.type==='stop')stop(s);
 else if(a.type==='resolve')resolve(s);
 else if(a.type==='finishTurn'){if(s.phase==='defense')resolve(s);if(s.effectChoice){s.effectChoice.endAfter=true;return;}if(!['main','post','discard'].includes(s.phase))fail('Завершіть комбінацію і відповіді.');end(s);}
 else if(a.type==='chaosFinish'){if(!['main','post','defense'].includes(s.phase)||!recipe(p)?.chaos||!p.brew.some(b=>b.card.type==='ingredient'))fail('Чортів казан можна завершити після відповідей або перед передачею ходу.');close(s,p,true);if(s.phase==='defense')s.phase='post';}
 else if(a.type==='white')white(s,p,a.card,a.target);
 else if(a.type==='abort'){if(!['main','post','defense'].includes(s.phase)||s.turnData.abortUsed)fail('Обрив доступний раз за хід між діями.');close(s,p,false);s.turnData.abortUsed=true;if(s.phase==='defense')s.phase='post';}
 else if(a.type==='end')end(s);
 else if(a.type==='discard'){if(s.phase!=='discard'||p.hand.length<=roomHandLimit(s))fail('Скид не потрібен.');s.discard.push(takeCard(p,a.card));if(p.hand.length<=roomHandLimit(s))end(s,true);}
 else fail('Невідома дія.');
}
function bestRecipe(p,recipes){return [...recipes].sort((a,b)=>{const val=r=>(p.hand.some(c=>c.color===r.colors[0])?7:0)+r.colors.reduce((n,c)=>n+(p.hand.some(h=>h.color===c)?2:0),0)-r.colors.length*.8+(p.character==='dyer'?(r.colors.filter(c=>c==='blue').length*2.5||1.5):0);return val(b)-val(a);})[0];}
export function botTrade(s){if(s.effectChoice)return null;const next=tableBotTrade(s);if(next)return next;if(s.status!=='playing')return null;const t=s.trades.find(t=>t.status==='pending'&&s.players.find(p=>p.id===t.to)?.bot);if(!t)return null;const p=s.players.find(p=>p.id===t.to),from=s.players.find(p=>p.id===t.from);const wanted=needed(p)?.color;const candidates=p.hand.filter(c=>(t.wanted==='any'||c.color===t.wanted)).sort((a,b)=>(a.color===wanted?10:0)+(a.points||0)-((b.color===wanted?10:0)+(b.points||0)));const offered=from.hand.find(c=>c.id===t.cardId);const c=candidates[0];const accept=!!c&&!!offered&&(offered.color===wanted||c.color!==wanted);return {pid:p.id,action:accept?{type:'accept',offer:t.id,card:c.id}:{type:'reject',offer:t.id}};}
export function botActor(s){if(s.status!=='playing')return null;if(s.effectChoice)return s.players.find(p=>p.id===s.effectChoice.owner);if(['character','draft'].includes(s.phase))return s.players[s.draft];if(s.phase==='reaction')return s.players[s.reactionQueue[s.reactionIndex]];return active(s);}
// ---- Smart bots (v37): look-ahead over the bot's own turn on a copy of the table ----
const PLAN_NODES=600,PLAN_MS=120;
function planCandidates(s,p){
 const out=[],ph=s.phase,uniq=list=>{const seen=new Set();return list.filter(c=>{const k=c.name+'|'+c.color+'|'+c.effect+'|'+c.points;if(seen.has(k))return false;seen.add(k);return true;});};
 if(s.effectChoice){const ec=s.effectChoice;if(ec.owner!==p.id)return out;for(const c of uniq(ec.cards||[])){out.push({type:'chooseEffect',choice:ec.id,card:c.id});if(ec.kind==='rebrew')out.push({type:'chooseEffect',choice:ec.id,card:c.id,play:true});}if(ec.kind==='harvest'||!out.length)out.push({type:'chooseEffect',choice:ec.id});return out;}
 if(s.hexChoice?.kind==='b'){if(s.hexChoice.owner!==p.id)return out;const ch=s.hexChoice,val=o=>o.kind==='card'?ingredientValue(s,p,o.card):(s.players.find(q=>q.id===o.id)?.score||0);const opts=[...ch.options].sort((x,y)=>(ch.step==='take'||ch.step==='player'?val(y)-val(x):val(x)-val(y)));for(const o of opts.slice(0,3))out.push({type:'hexChoose',pick:o.id});out.push({type:'hexChoose'});return out;}
 if(s.hexChoice){if(s.hexChoice.owner===p.id&&s.hexChoice.kind==='roots-brew'){out.push({type:'hexChoose'});for(const c of s.hexChoice.cards)out.push({type:'hexChoose',card:c.id});}return out;}
 if(ph==='defense')out.push({type:'resolve'});
 if(ph==='main'||ph==='chain'){
  if(!p.brew.length&&!s.turnData.planRecipe)for(const r of p.recipes)if(r.id!==p.current)out.push({type:'selectRecipe',order:r.id});
  if(recipe(p))for(const c of uniq(p.hand.filter(c=>c.type==='ingredient')))if(canAdd(s,p,c))out.push({type:'play',card:c.id});
  if(ph==='chain')out.push({type:'stop'});
 }
 if(['main','post','defense','chain'].includes(ph)){
  const ward=p.hand.find(c=>c.type==='cancel'),still=p.brew.flatMap(b=>b.attacks.filter(a=>!a.cancelled).map(a=>({b,a})));
  if(ward)for(const {a} of still.slice(0,4))out.push({type:'white',card:ward.id,target:a.id});
  const dist=p.hand.find(c=>c.type==='distill');
  if(dist)for(const b of p.brew.filter(b=>!b.sealed&&b.card.type==='ingredient'&&b.attacks.some(a=>!a.cancelled)).slice(0,3))out.push({type:'white',card:dist.id,target:b.id});
 }
 if(s.hexes&&['main','chain','post','defense'].includes(ph)){
  const t=hexSkillTargets(s,p);
  if(t.ready){
   const eh=effectiveHex(s,p),hand=new Map(p.hand.map(c=>[c.id,c])),pays=uniq(t.payments.map(id=>hand.get(id)).filter(Boolean)).slice(0,4).map(c=>c.id);
   if(t.side==='B'){if(t.bReady)out.push({type:'hexUse'});}
   else if(eh===0&&!t.paid){for(const h of t.borrow)for(const c of pays.slice(0,2))out.push({type:'hexUse',card:c,hex:h});}
   else if(eh===1||eh===2){for(const c of pays)out.push({type:'hexUse',card:c});}
   else if(eh===3){if(s.discard.length)out.push({type:'hexUse'});}
   else if(eh===4){for(const u of t.units)out.push({type:'hexUse',target:u});}
   else if(eh===5||eh===6){for(const u of t.units){for(const c of pays)out.push({type:'hexUse',card:c,target:u});if(chugFree(s,p))out.push({type:'hexUse',target:u});}}
  }
 }
 const info=characterActionInfo(s,p);
 if(info.ready){const m=info.mode,cc=info.costCards.slice(0,3),tt=info.targetIds.slice(0,3);
  if(m==='shortcut')out.push({type:'characterAction',mode:m});
  for(const c of cc)for(const t of tt)out.push({type:'characterAction',mode:m,card:c,target:t});
  if(m==='mix')for(let i=0;i<cc.length;i++)for(let j=i+1;j<cc.length;j++)out.push({type:'characterAction',mode:m,cards:[cc[i],cc[j]]});
  if(m==='reorder')for(let i=0;i<info.slots.length;i++)for(let j=i+1;j<info.slots.length;j++)out.push({type:'characterAction',mode:m,slots:[info.slots[i],info.slots[j]]});
  if(m==='pair')for(const sl of info.slots)out.push({type:'characterAction',mode:m,slot:sl});
  if(m==='swap'||m==='extend')for(const q of info.players)out.push({type:'characterAction',mode:m,player:q});
 }
 return out;
}
function planValue(st,pi,base){
 const q=st.players[pi],pm=pendingMultiplier(q),hand=q.hand.filter(c=>c.type==='ingredient').length;
 const r=recipe(q),filledSlots=r&&!r.chaos?r.colors.filter((_,i)=>filled(q,i)).length:0,progress=r&&!r.chaos?filledSlots*(r.value/r.colors.length)*0.5:0;
 return q.score-base.score+brewScore(q)+progress+(q.completed-base.completed)*2+(pm>0?(pm-1)*1.2:0)+0.35*hand+(q.hand.length-hand)*0.8;
}
function planBotMove(s,p){
 if(active(s)!==p||!['main','chain','post','defense'].includes(s.phase)||s.status!=='playing')return null;
 if(s.effectChoice&&s.effectChoice.owner!==p.id||s.hexChoice&&s.hexChoice.owner!==p.id)return null;
 s.turnData.planSteps=(s.turnData.planSteps||0)+1;if(s.turnData.planSteps>30)return null;
 const t0=Date.now(),pi=s.players.indexOf(p),root=structuredClone({...s,log:[],events:[]});root.deck=shuffle(root.deck);
 const base={score:p.score,completed:p.completed},startTurn=s.turn,seen=new Set();let nodes=0,best={v:planValue(root,pi,base)+0.05,first:null};
 const key=st=>{const q=st.players[pi];return JSON.stringify([st.phase,q.current,q.hand.map(c=>c.id),q.brew.map(b=>[b.card.id,b.slot,b.multiplier,b.amplifierCharges,b.amplifierSpent,b.disabled,b.zeroed,b.effectMuted,b.attacks.length]),st.turnData,st.effectChoice?.id,st.hexChoice?.kind,st.hexChoice?.picks,q.score]);};
 const dfs=(st,first)=>{
  if(nodes++>PLAN_NODES||Date.now()-t0>PLAN_MS)return;
  let guard=0;while(st.phase==='reaction'&&guard++<8){const r=st.players[st.reactionQueue[st.reactionIndex]];if(!r||r===st.players[pi])break;try{action(st,r.id,{type:'react'});}catch(e){return;}}
  if(st.turn!==startTurn||st.status!=='playing')return;
  const k=key(st);if(seen.has(k))return;seen.add(k);
  if(first&&!st.effectChoice&&!st.hexChoice){const v=planValue(st,pi,base);if(v>best.v)best={v,first};}
  for(const m of planCandidates(st,st.players[pi])){const c=structuredClone(st);try{action(c,c.players[pi].id,m);}catch(e){continue;}dfs(c,first||m);}
 };
 try{dfs(root,null);}catch(e){return null;}
 if(best.first?.type==='selectRecipe')s.turnData.planRecipe=true;
 return best.first;
}
export function botAction(s){const p=botActor(s);if(!p?.bot)return null;
 if(!s.legacy&&s.exchange?.owner===p.id&&p.id===active(s)?.id&&['post','move'].includes(s.phase)&&!s.effectChoice&&!s.hexChoice){const t=s.exchange;if(t.bids.length){const best=botBestBid(s,p,t);return {type:'tradeTake',player:best.player};}return {type:'tradeRecall'};}
 if(!s.legacy&&s.phase==='main'&&p.id===active(s)?.id&&!s.exchange&&!s.turnData.botTradeTried&&!s.effectChoice&&!s.hexChoice&&s.players.length>1){s.turnData.botTradeTried=true;const r=recipe(p),left=r&&!r.chaos?r.colors.filter((_,i)=>!filled(p,i)):[];const junk=p.hand.filter(c=>c.type==='ingredient'&&!left.includes(c.color)&&!p.recipes.some(x=>x!==r&&x.colors.includes(c.color))).sort((a,b)=>ingredientValue(s,p,a)-ingredientValue(s,p,b))[0];if(junk&&p.hand.length>=3)return {type:'tradeOpen',card:junk.id};}if(s.phase==='discard'&&p.id===active(s).id){const c=[...p.hand].sort((a,b)=>ingredientValue(s,p,a)-ingredientValue(s,p,b))[0];return {type:'discard',card:c.id};}if(s.smartBots){const planned=planBotMove(s,p);if(planned)return planned;}if(s.hexChoice||s.phase==='move')return botHex(s,p);if(s.effectChoice?.kind==='stoke'){const c=[...s.effectChoice.cards].sort((a,b)=>ingredientValue(s,p,a)-ingredientValue(s,p,b))[0];return {type:'chooseEffect',choice:s.effectChoice.id,card:c?.id};}if(s.effectChoice?.kind==='rebrew'){const cards=[...s.effectChoice.cards].sort((a,b)=>Number(canChooseBrew(s,p,b,true))-Number(canChooseBrew(s,p,a,true))||ingredientValue(s,p,b)-ingredientValue(s,p,a));return {type:'chooseEffect',choice:s.effectChoice.id,card:cards[0].id,play:canChooseBrew(s,p,cards[0],true)};}if(s.effectChoice){const cards=[...s.effectChoice.cards].sort((a,b)=>ingredientValue(s,p,b)-ingredientValue(s,p,a));return {type:'chooseEffect',choice:s.effectChoice.id,card:cards[0]?.id};}if(s.phase==='character'){const choices=CHARACTERS.filter(c=>isCharacterAvailable(s,c)&&!s.players.some(p=>p.character===c.id));return {type:'chooseCharacter',character:choices[Math.floor(Math.random()*choices.length)].id};}if(s.phase==='draft')return {type:'order',order:bestRecipe(p,s.market).id};if(s.phase==='reaction'){const c=p.hand.filter(c=>canSabotage(s,p,c)&&c.effect!=='brew-wild').sort((a,b)=>a.negative-b.negative)[0];return {type:'react',card:c?.id};}if(s.hexes&&['main','chain','post','defense'].includes(s.phase)){const move=botHex(s,p);if(move)return move;}const special=botCharacterAction(s,p);if(special)return special;
 const attack=p.brew.flatMap(b=>b.attacks).find(a=>!a.cancelled),guard=p.hand.find(c=>c.type==='cancel')||(character(p)?.ingredientWard&&!s.turnData.ingredientWardUsed?p.hand.filter(c=>c.type==='ingredient').sort((a,b)=>a.points-b.points)[0]:null);
 if(['main','defense'].includes(s.phase)&&attack&&guard)return {type:'white',card:guard.id,target:attack.id};
 if(['main','defense'].includes(s.phase)){const distill=p.hand.find(c=>c.type==='distill'),b=p.brew.find(b=>!b.sealed&&b.card.type==='ingredient'&&b.attacks.some(a=>!a.cancelled)&&(character(p)?.preserveDistill&&!recipe(p)?.potionMeta?.distillPreserved||b.card.points+b.attacks.reduce((n,a)=>n+(a.cancelled?0:a.card.negative),0)<0));if(distill&&b)return {type:'white',card:distill.id,target:b.id};}if(s.phase==='defense'){const c=p.hand.filter(c=>canAdd(s,p,c)).sort((a,b)=>ingredientValue(s,p,b)-ingredientValue(s,p,a))[0];if(c)return {type:'play',card:c.id};if(recipe(p)?.chaos&&p.brew.length>=2)return {type:'chaosFinish'};return {type:'finishTurn'};}
 if(s.phase==='main'){if(s.turnData.pairPlan){const c=p.hand.find(c=>pairMatch(s,c,needed(p))&&canAdd(s,p,c));if(c)return {type:'play',card:c.id};}if(recipe(p)?.chaos&&p.brew.length>=2)return {type:'chaosFinish'};if(!p.brew.length&&p.recipes.length){const best=bestRecipe(p,p.recipes);if(best.id!==p.current)return {type:'selectRecipe',order:best.id};}if(!recipe(p)){if(p.recipes.length)return {type:'selectRecipe',order:bestRecipe(p,p.recipes).id};if(s.market.length&&!s.turnData.orderTaken)return {type:'order',order:bestRecipe(p,s.market).id};return {type:'end'};}const c=p.hand.filter(c=>canAdd(s,p,c)).sort((a,b)=>ingredientValue(s,p,b)-ingredientValue(s,p,a))[0];if(c)return {type:'play',card:c.id};if(p.brew.length&&!s.turnData.abortUsed&&((p.stallTurns||0)>=2||(!s.deck.length&&!s.discard.length)))return {type:'abort'};if(p.recipes.length<3&&s.market.length&&!s.turnData.orderTaken)return {type:'order',order:bestRecipe(p,s.market).id};return {type:'end'};}
 if(s.phase==='chain'){const c=p.hand.filter(c=>canAdd(s,p,c)).sort((a,b)=>Number(pairMatch(s,b,needed(p)))-Number(pairMatch(s,a,needed(p)))||ingredientValue(s,p,b)-ingredientValue(s,p,a))[0];return c?{type:'play',card:c.id}:{type:'stop'};}if(s.phase==='post')return recipe(p)?.chaos&&p.brew.length?{type:'chaosFinish'}:{type:'end'};return null;
}
export function view(s,pid,version=0){const me=s.players.find(p=>p.id===pid);if(!me)fail('Немає доступу до цієї кімнати.');return {rulesVersion:4,mapRoster:MAP_ROSTER,hexMap:s.hexes?{tiles:HEXES.map((_,i)=>({...hexInfo(s,i),position:s.hexOrder?.indexOf(i)??i,count:s.hexes[i].length,blocked:hexBlocked(s,me,i)})),skillHex:effectiveHex(s,active(s)),moves:s.phase==='move'&&me===active(s)?hexDestinations(s,me):[],targets:hexSkillTargets(s,me),shown:s.hexShow||0,start:s.turnData.startHex??active(s)?.hex,used:!!s.turnData.hexUsed,perk:hexPerk(s,me),choice:s.hexChoice?.owner===pid?{...s.hexChoice,play:s.hexChoice.kind==='roots-brew'?s.hexChoice.cards.filter(c=>canChooseBrew(s,me,c)).map(c=>c.id):[]}:null,scouted:me.hexScout||{},stats:s.hexStats||{},brewReason:hexBrewReason(s,me)}:null,legal:{play:me.hand.filter(c=>canAdd(s,me,c)).map(c=>c.id),react:me.hand.filter(c=>canSabotage(s,me,c)).map(c=>c.id)},code:s.code,version,targetPotions:s.targetPotions||3,sabotageLimit:sabCap(s),handLimit:s.legacy?null:roomHandLimit(s),hexSides:s.hexSides||'random',legacy:!!s.legacy,sabotageLeft:Math.max(0,sabCap(s)-(s.turnData?.sabotageCount||0)),status:s.status,phase:s.phase,characterAction:characterActionInfo(s,me),effectChoice:s.effectChoice?{id:s.effectChoice.id,owner:s.effectChoice.owner,kind:s.effectChoice.kind,harvest:s.effectChoice.harvest,count:s.effectChoice.cards.length,play:s.effectChoice.owner===pid&&s.effectChoice.kind==='rebrew'?s.effectChoice.cards.filter(c=>canChooseBrew(s,me,c,true)).map(c=>c.id):[],cards:s.effectChoice.owner===pid?s.effectChoice.cards:undefined}:null,turn:s.turn,round:s.round,draft:s.draft,turnData:s.turnData,market:s.market,deckCount:s.deck.length,discardCount:s.discard.length,log:s.log,finalStarter:s.finalStarter,finalQueue:s.finalQueue,reactionPlayer:s.phase==='reaction'?s.players[s.reactionQueue[s.reactionIndex]]?.id:null,exchange:s.exchange||null,eventSeq:s.eventSeq||0,events:(s.events||[]).map(e=>e.type==='move'&&((e.to.startsWith('hand:')&&e.to!=='hand:'+pid&&(e.from==='deck'||e.from.startsWith('hex:')||e.from.startsWith('hex-choice:')||e.from.startsWith('choice:')))||(e.to.startsWith('hex:'))||(e.to.startsWith('hex-choice:')&&e.to!=='hex-choice:'+pid)||(e.to.startsWith('choice:')&&e.to!=='choice:'+pid&&e.from==='deck'))?{...e,card:{id:e.card.id,type:'back',name:'Карта'}}:e),discardTop:s.discard.slice(-6),trades:s.trades.filter(t=>t.from===pid||t.to===pid).map(t=>({...t})),me:pid,players:s.players.map(p=>({id:p.id,name:p.name,bot:p.bot,host:p.host,character:p.character,hex:p.hex,ownTurns:p.ownTurns||0,tradeWild:p.id===pid?p.tradeWild:undefined,whiteReturnedRound:p.whiteReturnedRound,shortcutUsed:!!recipe(p)?.potionMeta?.shortcut,shortcutRecipe:p.shortcutRecipe||null,mossSwapUsed:!!p.mossSwapUsed,handCount:p.hand.length,hand:p.id===pid?sortHand(p.hand):undefined,recipes:p.recipes,current:p.current,brewPoints:brewScore(p),unitScores:unitScores(p),potPreview:potPreview(p,s),pendingMultiplier:pendingMultiplier(p),starter:p.starter,brew:p.brew,score:p.score,completed:p.completed}))};}

export function sortHand(hand){const order=['red','blue','brown','green','black','purple'];return [...hand].sort((a,b)=>((order.indexOf(a.color)+7)%7)-((order.indexOf(b.color)+7)%7)||(a.variant||0)-(b.variant||0)||a.name.localeCompare(b.name));}
export function canPlayColor(s,p,c,n=needed(p)){if(!n||c?.type!=='ingredient')return false;if(s.turnData.mushroomCards?.includes(c.id)&&!s.turnData.mushroomWildUsed&&!n.extra||pairMatch(s,c,n)||!n.color||n.extra||c.color===n.color||c.effect==='brew-wild'||echoWildReady(p,c))return true;const ch=character(p);return !!(ch?.wildColor===c.color&&dyerWild(s,p)||ch?.mossWild&&c.color==='green'&&!potionMeta(recipe(p)).mossWildUsed||tradeWildReady(s,p,c)||!!s.legacy&&mossFollowReady(s,p));}
function tableTrade(s,p,a){if(s.status!=='playing'||['draft','character'].includes(s.phase))fail('Спочатку оберіть персонажів і рецепти.');if(a.type==='tradeOpen'){if(active(s).id!==p.id)fail('Відкрити ярмарок можна тільки у свій хід.');if(s.exchange)fail('Ярмарок уже відкритий.');s.exchange={id:id(),owner:p.id,card:takeCard(p,a.card),bids:[],declined:[]};log(s,p.name+' відкриває ярмарок.');return;}const t=s.exchange;if(!t)fail('Ярмарок не відкритий.');if(a.type==='tradeBid'){if(t.owner===p.id)fail('Це ваша пропозиція.');if(!p.hand.some(c=>c.id===a.card))fail('Немає карти в руці.');const old=t.bids.find(b=>b.player===p.id);if(old)p.hand.push(old.card);t.bids=t.bids.filter(b=>b.player!==p.id);t.declined=t.declined.filter(x=>x!==p.id);t.bids.push({player:p.id,card:takeCard(p,a.card)});return;}if(a.type==='tradeBidDiscard'){const b=t.bids.find(b=>b.player===p.id);if(!b)fail('Немає вашої зустрічної карти.');s.discard.push(b.card);t.bids=t.bids.filter(x=>x!==b);return;}if(a.type==='tradeDecline'){if(t.owner===p.id)fail('Це ваш ярмарок.');if(!t.declined.includes(p.id))t.declined.push(p.id);return;}if(t.owner!==p.id)fail('Вибирає власник ярмарку.');if(a.type==='tradeTake'){const b=t.bids.find(b=>b.player===a.player);if(!b)fail('Зустрічну карту не знайдено.');const q=s.players.find(x=>x.id===b.player);if(a.discard)s.discard.push(b.card);else{p.hand.push(b.card);markTradeCard(p,b.card);}q.hand.push(t.card);markTradeCard(q,t.card);for(const other of t.bids)if(other!==b)s.players.find(x=>x.id===other.player).hand.push(other.card);log(s,p.name+' завершує обмін.');}else if(a.type==='tradeDiscard'){s.discard.push(t.card);for(const b of t.bids)s.players.find(x=>x.id===b.player).hand.push(b.card);}else if(a.type==='tradeRecall'){p.hand.push(t.card);for(const b of t.bids)s.players.find(x=>x.id===b.player).hand.push(b.card);}else fail('Невідома дія ярмарку.');s.exchange=null;}
function botBestBid(s,owner,t){const rr=recipe(owner),left=rr&&!rr.chaos?rr.colors.filter((_,i)=>!filled(owner,i)):[];const want=b=>(left.includes(b.card.color)?10:0)+(b.card.points||0)+(b.card.type!=='ingredient'?3:0);return [...t.bids].sort((a,b)=>want(b)-want(a))[0];}
function tableBotTrade(s){if(s.effectChoice||s.hexChoice)return null;const t=s.exchange;if(!t||s.status!=='playing')return null;const owner=s.players.find(p=>p.id===t.owner);const allIn=s.players.every(q=>q===owner||t.bids.some(b=>b.player===q.id)||t.declined.includes(q.id));if(owner.bot&&t.bids.length&&(s.legacy||allIn))return {pid:owner.id,action:{type:'tradeTake',player:(s.legacy?t.bids[0]:botBestBid(s,owner,t)).player}};if(!s.legacy&&owner.bot&&!t.bids.length&&allIn)return {pid:owner.id,action:{type:'tradeRecall'}};const p=s.players.find(p=>p.bot&&p.id!==t.owner&&!t.bids.some(b=>b.player===p.id)&&!t.declined.includes(p.id));if(!p)return null;const want=needed(p)?.color;const same=c=>c.type===t.card.type&&(c.name===t.card.name||c.type==='ingredient'&&c.color===t.card.color&&c.variant===t.card.variant);const candidates=p.hand.filter(c=>!same(c));const usefulness=c=>(c.color===want?12:0)+(c.points||0)+(c.effect==='extra'?2:0);candidates.sort((a,b)=>usefulness(a)-usefulness(b)+(t.bids.some(x=>x.card.name===a.name)?3:0)-(t.bids.some(x=>x.card.name===b.name)?3:0));const c=candidates[0],benefit=usefulness(t.card)-(c?usefulness(c):0);return {pid:p.id,action:c&&benefit>=-2?{type:'tradeBid',card:c.id}:{type:'tradeDecline'}};}
function tableZones(s){const z=new Map(),put=(card,zone,status='')=>z.set(card.id,{card:{...card},zone,status});s.deck.forEach(c=>put(c,'deck'));s.discard.forEach(c=>put(c,'discard'));for(const p of s.players){p.hand.forEach(c=>put(c,'hand:'+p.id));if(p.starter)put(p.starter,'starter:'+p.id);for(const b of p.brew){put(b.card,'brew:'+p.id,b.disabled?'disabled':b.substituted?'substituted':JSON.stringify([b.boost||0,b.multiplier||1,b.amplifierCharges||0,!!b.amplifierSpent,!!b.sealed,!!b.zeroed,!!b.effectMuted]));b.attacks.forEach(a=>put(a.card,'attack:'+p.id,a.cancelled?'cancelled':''));}}if(s.effectChoice?.kind==='sift')s.effectChoice.cards.forEach(c=>put(c,'choice:'+s.effectChoice.owner));if(s.hexChoice?.held)s.hexChoice.cards.forEach(c=>put(c,'hex-choice:'+s.hexChoice.owner));for(const [hex,cards]of(s.hexes||[]).entries())cards.forEach(c=>put(c,'hex:'+hex));if(s.exchange){put(s.exchange.card,'trade:'+s.exchange.owner);s.exchange.bids.forEach(b=>put(b.card,'bid:'+b.player));}return z;}
export function action(s,pid,a){const previousCharacters=new Map(s.players.map(p=>[p.id,p.character])),previousRecipes=new Set(s.players.flatMap(p=>p.recipes.map(r=>r.id))),previousCurrent=new Map(s.players.map(p=>[p.id,p.current]));const actor=s.players.find(p=>p.id===pid),hexAction=['hexUse','hexChoose','hexMove','hexPerk'].includes(a?.type),hexBefore=hexAction&&actor?{tile:actor.hex,hand:actor.hand.length,choice:s.hexChoice?.kind}:null;const before=tableZones(s),scores=new Map(s.players.map(p=>[p.id,p.score]));coreAction(s,pid,a);const after=tableZones(s);s.events??=[];s.eventSeq??=0;const emit=e=>s.events.push({...e,seq:++s.eventSeq,time:Date.now()});for(const [cid,c]of after){const old=before.get(cid);if(old&&old.zone!==c.zone)emit({type:'move',card:c.card,from:old.zone,to:c.zone});else if(old&&old.status!==c.status)emit({type:'status',card:c.card,zone:c.zone,status:c.status});}for(const p of s.players){const amount=p.score-(scores.get(p.id)||0);if(amount>0)emit({type:'fame',owner:p.id,amount});}for(const p of s.players){if(p.character&&p.character!==previousCharacters.get(p.id))emit({type:'character',owner:p.id,character:p.character});for(const r of p.recipes)if(!previousRecipes.has(r.id))emit({type:'recipe',owner:p.id,recipe:r});if(p.current&&p.current!==previousCurrent.get(p.id))emit({type:'recipePlace',owner:p.id,recipe:recipe(p)});}if(hexBefore){const moved=actor.hex!==hexBefore.tile;const gained=Math.max(0,actor.hand.length-hexBefore.hand+Number(a.type==='hexUse'&&hexBefore.tile===1));emit({type:'hexResult',owner:pid,from:hexBefore.tile,tile:actor.hex,moved,gained,action:a.type,mode:a.mode||hexBefore.choice||null,target:a.hex});if(a.type==='hexUse'||a.type==='hexChoose')log(s,actor.name+' · '+HEXES[hexBefore.tile].name+(gained?' · +'+gained+' карт.':'.'));}for(const notice of s.perkNotices||[])emit({type:'perk',...notice});s.perkNotices=[];for(const event of s.ruleEvents||[])emit(event);s.ruleEvents=[];s.events=s.events.slice(-90);}

function ingredientEffect(s,p,b){
 if(b.card.points>0&&!b.zeroed&&s.turnData.flowerCard!==b.card.id){
  const sources=p.brew.filter(x=>x!==b&&!x.disabled&&!x.effectMuted&&!x.substituted&&!x.amplifierSpent&&(x.amplifierCharges||x.card.effect==='amplify'));
  const charges=sources.reduce((sum,x)=>sum+(x.amplifierCharges||1),0);
  if(charges){
   b.multiplier=charges*2;sources.forEach(x=>x.amplifierSpent=true);
   comboNotice(s,p,b,'Множник ×'+b.multiplier);
  }
 }
 if(!s.legacy&&p.character==='mosskeeper'&&b.card.type==='ingredient'&&b.card.color==='green'&&b.slot!==null&&b.slot!==undefined&&!b.extra){const r=recipe(p);if(r&&!r.chaos&&r.colors[b.slot]==='green')r.colors.forEach((col,slot)=>{if(col==='green'&&!filled(p,slot))p.brew.push({id:id(),card:{id:id(),type:'essence',name:'Мохова ковдра',color:'green',points:0,negative:0},slot,attacks:[],mossFill:true});});}
 if(s.turnData.twinRoot&&b.slot!==null&&b.slot!==undefined&&!b.extra){delete s.turnData.twinRoot;const r=recipe(p),slot=b.slot+1;if(r&&!r.chaos&&slot<r.colors.length&&!filled(p,slot))p.brew.push({id:id(),card:{id:id(),type:'essence',name:'Сплетене коріння',color:r.colors[slot],points:0,negative:0,waived:true},slot,playedAs:r.colors[slot],attacks:[],substituted:true});}
 const flower=effectiveHex(s,p)===2&&!s.turnData.hexUsed&&s.turnData.flowerCard===b.card.id;
 if(flower){b.effectMuted=true;s.turnData.hexUsed=true;s.turnData.allowance++;delete s.turnData.flowerCard;comboNotice(s,p,b,'Квіти: ефект → продовження');return;}
 resolveIngredientEffect(s,p,b,b.card.effect);
}
function comboNotice(s,p,b,text){
 log(s,p.name+' · '+text+'.');
 s.ruleEvents??=[];s.ruleEvents.push({type:'combo',owner:p.id,card:b.card.id,text,multiplier:b.multiplier||null});
}
function canChooseBrew(s,p,c,bonus=false){
 const probe={...s,effectChoice:null,hexChoice:null};
 if(bonus){probe.phase='chain';probe.turnData={...s.turnData,actionUsed:false};}
 return canAdd(probe,p,c);
}
function echoFrom(s,p,b,src){b.echoSource={id:src.card.id,name:src.card.name,effect:src.card.effect,color:src.card.color};comboNotice(s,p,b,'Відлуння: '+src.card.name);resolveIngredientEffect(s,p,b,src.card.effect);}
function resolveIngredientEffect(s,p,b,effect){
 if(b.effectMuted||b.carried)return;
 if(effect==='resonance'&&b.card.effect==='echo')b.echoResonance=true;
 if(effect==='extra')s.turnData.allowance++;
 if(effect==='draw')draw(s,p,1);
 if(effect==='amplify'){if(b.amplifierSpent){b.amplifierSpent=false;b.amplifierCharges=0;}b.amplifierCharges=(b.amplifierCharges||0)+1;comboNotice(s,p,b,'Накопичено ×'+pendingMultiplier(p));}
 if(effect==='sift'){const tray={hand:[]};draw(s,tray,2);if(tray.hand.length===1)p.hand.push(tray.hand[0]);else if(tray.hand.length)s.effectChoice={id:id(),owner:p.id,kind:'sift',cards:tray.hand};}
 if(effect==='recover'||effect==='rebrew'){
  const cards=s.discard.slice(effect==='rebrew'?-3:-5).reverse().filter(c=>effect!=='rebrew'||c.type==='ingredient');
  if(cards.length)s.effectChoice={id:id(),owner:p.id,kind:effect,cards};
  else log(s,'У скиді немає доступного складника.');
 }
 if(effect==='echo'&&!s.legacy){
  const prior=p.brew.slice(0,p.brew.indexOf(b)).reverse().find(x=>!x.disabled&&!x.substituted),wildEcho=prior?.card.effect==='brew-wild'&&!prior.effectMuted&&!prior.carried&&b.playedAs&&b.playedAs!==b.card.color;
  const opts=p.brew.filter(x=>x!==b&&!x.disabled&&!x.substituted&&!x.effectMuted&&!x.carried&&x.card.effect&&!['echo','brew-wild'].includes(x.card.effect));
  if(wildEcho)echoFrom(s,p,b,prior);
  else if(!opts.length)comboNotice(s,p,b,'Відлуння: у котлі немає ефекту для повтору');
  else if(opts.length===1)echoFrom(s,p,b,opts[0]);
  else s.effectChoice={id:id(),owner:p.id,kind:'echo',unit:b.id,cards:opts.map(x=>({...x.card,id:'echo-'+x.id}))};
 }
 if(effect==='echo'&&s.legacy){
  const index=p.brew.indexOf(b),prior=p.brew.slice(0,index).reverse().find(x=>!x.disabled&&!x.substituted);
  if(prior?.card.effect&&prior.card.effect!=='echo'&&!prior.effectMuted&&!prior.carried){
   b.echoSource={id:prior.card.id,name:prior.card.name,effect:prior.card.effect,color:prior.card.color};
   comboNotice(s,p,b,'Відлуння: '+prior.card.name);
   resolveIngredientEffect(s,p,b,prior.card.effect);
  }else comboNotice(s,p,b,'Відлуння: немає попереднього ефекту');
 }
 if(effect==='stoke'){
  const cards=p.hand.filter(c=>c.type==='ingredient');
  if(cards.length)s.effectChoice={id:id(),owner:p.id,kind:'stoke',cards};
 }
}
function pendingMultiplier(p){
 return 2*p.brew.filter(x=>!x.disabled&&!x.effectMuted&&!x.substituted&&!x.amplifierSpent).reduce((sum,x)=>sum+(x.amplifierCharges||(x.card.effect==='amplify'?1:0)),0);
}
function chooseEffect(s,p,a){const choice=s.effectChoice;if(choice.owner!==p.id||a.choice!==choice.id)fail('Цей вибір недоступний.');if(choice.kind==='echo'){const src=choice.cards.some(c=>c.id===a.card)&&p.brew.find(x=>'echo-'+x.id===a.card),b=p.brew.find(x=>x.id===choice.unit);if(!src||!b)fail('Оберіть карту у своєму котлі.');s.effectChoice=null;echoFrom(s,p,b,src);return;}if(choice.kind==='harvest'&&!a.card){draw(s,p,1+(choice.afterDraw||0));s.effectChoice=null;return;}if(['starter','extend'].includes(choice.kind)&&!a.card){s.effectChoice=null;if(choice.kind==='extend')s.turnData.extendUsed=true;if(choice.endAfter)end(s);return;}
if(choice.kind==='stoke'){
 if(a.card){if(!choice.cards.some(c=>c.id===a.card)||!p.hand.some(c=>c.id===a.card&&c.type==='ingredient'))fail('Оберіть складник для жару.');s.discard.push(takeCard(p,a.card));s.turnData.allowance++;log(s,p.name+' розпалює казан: ще одне додавання.');}
 s.effectChoice=null;return;
}
if(choice.kind==='rebrew'){
 const card=choice.cards.find(c=>c.id===a.card),index=s.discard.findIndex(c=>c.id===a.card);
 if(!card||index<0)fail('Складник уже недоступний.');
 if(a.play&&!canChooseBrew(s,p,card,true))fail('Цей складник не підходить до зілля.');
 s.discard.splice(index,1);p.hand.push(card);s.effectChoice=null;
 if(a.play)play(s,p,card.id,{free:true});
 return;
}
const card=choice.cards.find(c=>c.id===a.card);
if(choice.kind==='starter'&&card){const i=s.discard.findIndex(c=>c.id===card.id);if(i<0)fail('Карта недоступна.');if(p.starter)s.discard.push(p.starter);p.starter=s.discard.splice(i,1)[0];s.effectChoice=null;if(choice.endAfter)end(s);return;}
if(choice.kind==='mix'&&card){const i=s.discard.findIndex(c=>c.id===card.id);if(i<0)fail('Карта недоступна.');for(const pay of choice.payment)s.discard.push(takeCard(p,pay));p.hand.push(s.discard.splice(i,1)[0]);s.effectChoice=null;s.turnData.mixUsed=true;play(s,p,card.id);return;}
if(choice.kind==='extend'&&card){const target=recipe(s.players.find(q=>q.id===choice.player));target.originalColors??=[...target.colors];target.colors.push(card.color);potionMeta(target).extended=true;s.discard.push(takeCard(p,card.id));s.turnData.extendUsed=true;s.effectChoice=null;return;}
if(!card)fail('Оберіть запропоновану карту.');if(['recover','harvest'].includes(choice.kind)){const index=s.discard.findIndex(c=>c.id===card.id);if(index<0)fail('Карти вже немає у скиді.');s.discard.splice(index,1);}else for(const c of choice.cards)if(c.id!==card.id)s.discard.push(c);p.hand.push(card);s.effectChoice=null;if(choice.afterDraw)draw(s,p,choice.afterDraw);}
function ingredientValue(s,p,c){if(c.type==='cancel')return p.brew.some(b=>b.attacks.some(a=>!a.cancelled))?8:2;if(c.type==='distill')return p.brew.some(b=>b.attacks.filter(a=>!a.cancelled).length>=2)?9:1.5;let bonus=c.effect==='extra'?3:c.effect==='draw'?1:c.effect==='sift'?1.35:c.effect==='recover'?(s.discard.length?1.5:0):c.effect==='amplify'?(full(p)?0:1.5):0;if(c.effect==='resonance')bonus+=Math.min(3,p.brew.filter(b=>!b.disabled&&!b.substituted&&b.card.type==='ingredient'&&b.card.color===c.color).length);return c.points+(character(p)?.plainPlus&&c.type==='ingredient'&&!c.effect?1.5:0)+(character(p)?.color===c.color?1:0)+bonus+(canPlayColor(s,p,c)?5:0);}

function perkNotice(s,p,text){s.perkNotices??=[];s.perkNotices.push({owner:p.id,character:p.character,text});}

export function characterActionInfo(s,p){const mode=character(p)?.characterAction,own=s.status==='playing'&&active(s)?.id===p.id&&!s.effectChoice,r=recipe(p),n=needed(p),meta=r?.potionMeta||{},ordinary=own&&s.phase==='main'&&!s.turnData.actionUsed,before=own&&['main','chain','post','defense'].includes(s.phase);let ready=false,costCards=[],targetIds=[],used=false,slots=[],players=[];
 if(mode==='insect'){used=!!meta.insectUsed;costCards=p.hand.filter(c=>c.type==='ingredient'&&c.color==='black').map(c=>c.id);targetIds=p.brew.filter(b=>b.card.type==='ingredient'&&b.card.color==='black').map(b=>b.id);ready=ordinary&&!used&&costCards.length>0&&targetIds.length>0;}
 if(mode==='mix'){used=!!s.turnData.mixUsed;costCards=p.hand.filter(c=>c.type==='ingredient'&&p.hand.some(x=>x.id!==c.id&&x.type==='ingredient'&&x.color===c.color)).map(c=>c.id);ready=ordinary&&!used&&!!n&&!n.extra&&costCards.length>=2&&s.discard.slice(-5).some(c=>c.type==='ingredient'&&(c.color===n.color||c.effect==='brew-wild'));}
 if(mode==='shortcut'){used=!!meta.shortcut;ready=before&&!used&&!!r&&!r.chaos&&r.colors.length>=4&&r.colors.length<=5&&!!n&&!n.extra&&n.slot===r.colors.length-1;}
 if(mode==='seal'){used=!!meta.sealUsed;targetIds=p.brew.filter(b=>b.card.type==='ingredient'&&!b.sealed).map(b=>b.id);ready=before&&!used&&targetIds.length>0;}
 if(mode==='catch'){used=!!s.turnData.catchUsed;const attacks=p.brew.flatMap(b=>b.attacks).filter(a=>!a.cancelled);costCards=p.hand.filter(c=>c.type==='ingredient'&&attacks.some(a=>a.card.color===c.color)).map(c=>c.id);targetIds=attacks.filter(a=>p.hand.some(c=>c.type==='ingredient'&&c.color===a.card.color)).map(a=>a.id);ready=own&&['main','post','defense'].includes(s.phase)&&!used&&targetIds.length>0;}
 if(mode==='reorder'||mode==='pair'){used=!!meta[mode+'Used'];slots=r&&!r.chaos?r.colors.map((_,i)=>i).filter(i=>!filled(p,i)):[];ready=before&&!used&&slots.length>=2;if(mode==='pair'){slots=slots.filter(i=>i===n?.slot&&slots.includes(i+1)&&(r.colors[i]==='blue'||r.colors[i+1]==='purple'));ready=ready&&ordinary&&!s.turnData.pairPlan&&slots.length>0&&p.hand.some(c=>c.color==='blue')&&p.hand.some(c=>c.color==='purple');}}
 if(mode==='swap'){used=!!meta.swapped;players=s.players.filter(q=>q!==p&&recipe(q)&&q.brew.length&&!full(q)&&!recipe(q).potionMeta?.swapped).map(q=>q.id);ready=ordinary&&!used&&!!r&&p.brew.filter(b=>b.card.type==='ingredient').length>=2&&!full(p)&&players.length>0;}
 if(mode==='extend'){used=!!s.turnData.extendUsed;players=s.players.filter(q=>q!==p&&recipe(q)&&!recipe(q).chaos&&q.brew.length&&!full(q)&&!recipe(q).potionMeta?.extended).map(q=>q.id);ready=before&&!used&&players.length>0&&p.hand.some(c=>c.type==='ingredient');}
 if(mode==='aid'){used=!!meta.aidUsed;targetIds=s.players.filter(q=>q!==p).flatMap(q=>q.brew.flatMap(b=>b.attacks.filter(a=>!a.cancelled).map(a=>a.id)));costCards=p.hand.filter(c=>c.type==='ingredient').map(c=>c.id);ready=ordinary&&!!r&&!used&&targetIds.length>0&&costCards.length>0;}
 return {mode:mode||null,ready:!!ready,used:!!used,costCards,targetIds,slots,players};
}
function useCharacter(s,p,a){const info=characterActionInfo(s,p);if(!info.ready||a.mode!==info.mode)fail('Перк зараз недоступний.');const r=recipe(p),meta=r?potionMeta(r):{};
 if(a.mode==='insect'){if(!info.targetIds.includes(a.target)||!info.costCards.includes(a.card))fail('Потрібні своя Комаха в котлі та інша Комаха з руки.');const i=p.brew.findIndex(b=>b.id===a.target),old=p.brew[i],next={slot:old.slot,extra:old.extra,color:old.playedAs||old.card.color};p.brew.splice(i,1);s.discard.push(old.card,...old.attacks.map(a=>a.card));meta.insectUsed=true;play(s,p,a.card,{replacing:next,free:true});}
 else if(a.mode==='mix'){const ids=a.cards;if(!Array.isArray(ids)||ids.length!==2||ids[0]===ids[1])fail('Потрібні дві різні карти.');const cards=ids.map(id=>p.hand.find(c=>c.id===id));if(cards.some(c=>!c||!info.costCards.includes(c.id))||cards[0].color!==cards[1].color)fail('Потрібні два інгредієнти одного типу.');const n=needed(p);s.effectChoice={id:id(),owner:p.id,kind:'mix',cards:s.discard.slice(-5).filter(c=>c.type==='ingredient'&&(c.color===n.color||c.effect==='brew-wild')),payment:ids};}
 else if(a.mode==='shortcut'){const slot=r.colors.length-1;meta.shortcut=true;p.shortcutRecipe=r.id;p.brew.push({id:id(),card:{id:id(),type:'essence',name:'Пропущена ложка',color:r.colors[slot],points:0,negative:0,waived:true},slot,playedAs:r.colors[slot],attacks:[],substituted:true});if(['main','post'].includes(s.phase)){close(s,p,true);s.phase='post';}}
 else if(a.mode==='seal'){if(!info.targetIds.includes(a.target))fail('Оберіть власний інгредієнт.');p.brew.find(b=>b.id===a.target).sealed=true;meta.sealUsed=true;}
 else if(a.mode==='catch'){if(!info.targetIds.includes(a.target)||!info.costCards.includes(a.card))fail('Оберіть саботаж і оплату того самого типу.');const b=p.brew.find(b=>b.attacks.some(x=>x.id===a.target)),i=b.attacks.findIndex(x=>x.id===a.target),attack=b.attacks[i],cost=p.hand.find(c=>c.id===a.card);if(cost.color!==attack.card.color)fail('Оплата має бути того самого типу.');s.discard.push(takeCard(p,cost.id));b.attacks.splice(i,1);if(s.legacy)p.hand.push(attack.card);else s.discard.push(attack.card);s.turnData.catchUsed=true;}
 else if(a.mode==='reorder'){const [x,y]=a.slots||[];if(x===y||!info.slots.includes(x)||!info.slots.includes(y)||r.colors[x]===r.colors[y])fail('Оберіть дві різні незаповнені позиції різних типів.');r.originalColors??=[...r.colors];[r.colors[x],r.colors[y]]=[r.colors[y],r.colors[x]];meta.reorderUsed=true;}
 else if(a.mode==='pair'){if(!info.slots.includes(a.slot))fail('Оберіть наступні дві позиції.');s.turnData.pairPlan={slot:a.slot,first:false};}
 else if(a.mode==='swap'){if(!info.players.includes(a.player))fail('Цей котел недоступний.');const q=s.players.find(q=>q.id===a.player),other=recipe(q);meta.swapped=true;potionMeta(other).swapped=true;p.recipes=p.recipes.map(x=>x===r?other:x);q.recipes=q.recipes.map(x=>x===other?r:x);[p.brew,q.brew]=[q.brew,p.brew];p.current=other.id;q.current=r.id;s.turnData.actionUsed=true;s.turnData.allowance=0;s.turnData.last=null;s.turnData.replacementSlots=[];s.phase='post';}
 else if(a.mode==='extend'){
  if(!info.players.includes(a.player))fail('Цей рецепт недоступний.');
  const types=shuffle(COLORS).slice(0,2).map(c=>c.id);
  s.effectChoice={id:id(),owner:p.id,kind:'extend',player:a.player,cards:p.hand.filter(c=>c.type==='ingredient'&&types.includes(c.color))};
  if(!s.effectChoice.cards.length){s.effectChoice=null;s.turnData.extendUsed=true;}
 }
 else if(a.mode==='aid'){
  if(!info.targetIds.includes(a.target)||!info.costCards.includes(a.card))fail('Оберіть плату й чужий негатив.');
  const attack=s.players.filter(q=>q!==p).flatMap(q=>q.brew.flatMap(b=>b.attacks)).find(attack=>attack.id===a.target);
  s.discard.push(takeCard(p,a.card));attack.cancelled=true;meta.aidUsed=true;s.turnData.allowance++;
 }
 perkNotice(s,p,character(p).title);
}
function botCharacterAction(s,p){const info=characterActionInfo(s,p);if(!info.ready)return null;const n=needed(p),legal=p.hand.filter(c=>canAdd(s,p,c)),meta=recipe(p)?.potionMeta||{};
 if(info.mode==='shortcut'&&(p.completed>=(s.targetPotions||3)-1||!legal.length||s.phase==='chain'&&s.turnData.allowance<1))return {type:'characterAction',mode:'shortcut'};
 if(info.mode==='seal'){const b=p.brew.find(b=>info.targetIds.includes(b.id)&&b.attacks.reduce((n,a)=>n+(a.cancelled?0:a.card.negative),b.card.points+(b.boost||0))<-1);if(b)return {type:'characterAction',mode:'seal',target:b.id};}
 if(info.mode==='catch'){for(const b of p.brew)for(const a of b.attacks)if(info.targetIds.includes(a.id)){const c=p.hand.find(c=>info.costCards.includes(c.id)&&c.color===a.card.color);if(c)return {type:'characterAction',mode:'catch',target:a.id,card:c.id};}}
 if(info.mode==='insect'){const b=p.brew.find(b=>info.targetIds.includes(b.id)&&b.attacks.some(a=>!a.cancelled));if(b)return {type:'characterAction',mode:'insect',target:b.id,card:info.costCards[0]};}
 if(info.mode==='mix'&&!legal.length){const cards=p.hand.filter(c=>info.costCards.includes(c.id)),a=cards[0],b=cards.find(c=>c!==a&&c.color===a.color);return {type:'characterAction',mode:'mix',cards:[a.id,b.id]};}
 if(info.mode==='swap'){const q=s.players.filter(q=>info.players.includes(q.id)&&q.brew.length>p.brew.length+1).sort((a,b)=>b.brew.length-a.brew.length)[0];if(q)return {type:'characterAction',mode:'swap',player:q.id};}
 if(info.mode==='extend'){const q=s.players.find(q=>info.players.includes(q.id)&&recipe(q).colors.filter((_,i)=>!filled(q,i)).length===1);if(q)return {type:'characterAction',mode:'extend',player:q.id};}
 if(info.mode==='reorder'&&!legal.length){const x=n.slot,y=info.slots.find(i=>recipe(p).colors[i]!==n.color&&p.hand.some(c=>c.color===recipe(p).colors[i]));if(y!==undefined)return {type:'characterAction',mode:'reorder',slots:[x,y]};}
 if(info.mode==='aid'&&legal.length)return {type:'characterAction',mode:'aid',target:info.targetIds[0],card:info.costCards[0]};
 if(info.mode==='pair')return {type:'characterAction',mode:'pair',slot:info.slots[0]};return null;
}

function potionMeta(r){return r.potionMeta??={};}
function recipeReward(p){const r=recipe(p);return !r?0:r.chaos?p.brew.reduce((n,b)=>n+(b.card.type==='ingredient'?1:0)+b.attacks.filter(a=>a.card.type==='ingredient').length,0):r.value;}
function tradeWildReady(s,p,c){return !!(character(p)?.tradeWild&&!s.turnData.tradeWildUsed&&p.tradeWild?.some(x=>x.card===c?.id&&x.until>=(p.ownTurns||0)));}
function markTradeCard(p,c){if(character(p)?.tradeExtra&&c.type==='ingredient'){p.tradeWild??=[];p.tradeWild=p.tradeWild.filter(x=>x.card!==c.id&&x.until>=(p.ownTurns||0));p.tradeWild.push({card:c.id,until:(p.ownTurns||0)+1});}}
function mossFollowReady(s,p){return !!(character(p)?.mossFollow&&recipe(p)&&!recipe(p).potionMeta?.mavkaUsed&&s.phase==='chain'&&s.turnData.mavkaSource&&s.turnData.mavkaSource===s.turnData.last&&p.brew.some(b=>b.id===s.turnData.last&&b.card.color==='green'));}
function ordinaryColor(s,p,c,n){if(!c||!n)return false;return !n.color||n.extra||c.color===n.color||c.effect==='brew-wild'||character(p)?.wildColor===c.color&&dyerWild(s,p)||character(p)?.mossWild&&c.color==='green'&&!recipe(p)?.potionMeta?.mossWildUsed||tradeWildReady(s,p,c);}
function replacementReady(s,n){
 return !!(n&&(n.extra?(s.turnData.replacementExtras||0)>0:(s.turnData.replacementSlots||[]).includes(n.slot)));
}
function brewPlacementReason(s,p,c,n,mavka){
 if(n.extra)return 'Додаткова карта поза рецептом';
 if(c.color===n.color)return null;
 if(c.effect==='brew-wild')return 'Універсальний складник';
 if(echoWildReady(p,c)){
  const prior=[...p.brew].reverse().find(b=>!b.disabled&&!b.substituted);
  return 'Відлуння «'+prior.card.name+'»: повторення універсальності';
 }
 if(mavka)return 'Мавка: Моховий настил';
 if(s.turnData.mushroomCards?.includes(c.id))return 'Грибна галявина: Гриб замінює будь-який тип';
 if(tradeWildReady(s,p,c))return 'Обмін дозволяє замінити тип';
 const hero=character(p);return hero?hero.name+': '+hero.title:'Ефект дозволяє замінити тип';
}
function dyerWild(s,p){if(s.legacy)return !s.turnData.wildUsed;const r=recipe(p);return !!r&&!r.chaos&&!r.colors.includes('blue')&&!potionMeta(r).dyerWildUsed;}
function ingredientSlot(p,c){
 const first=needed(p),r=recipe(p);
 if(first&&p.character==='dyer'&&c?.type==='ingredient'&&c.color==='blue'&&!r.chaos&&!first.extra){const slot=r.colors.findIndex((type,i)=>type==='blue'&&!filled(p,i));if(slot>=0)return {extra:false,color:'blue',slot};}
 if(!first||!character(p)?.anySlot||r.chaos||first.extra||!c)return first;
 const slot=r.colors.findIndex((type,i)=>type===c.color&&!filled(p,i));
 return slot<0?first:{extra:false,color:r.colors[slot],slot};
}
function pairMatch(s,c,n){
 const plan=s.turnData.pairPlan;
 return !!(plan&&n&&c&&n.slot===plan.slot+(plan.first?1:0)&&c.color===(plan.first?'purple':'blue'));
}
function tradeExtraReady(s,p,c,n){
 return !!(character(p)?.tradeExtra&&s.phase==='chain'&&s.turnData.actionUsed&&n&&!n.extra&&n.color===c.color&&!recipe(p)?.potionMeta?.tradeExtraUsed&&p.tradeWild?.some(x=>x.card===c.id&&x.until>=(p.ownTurns||0)));
}
export function canAdd(s,p,c){if(active(s)?.id!==p.id||s.effectChoice||!needed(p)||c?.type!=='ingredient')return false;const n=ingredientSlot(p,c),replacement=replacementReady(s,n);if(!['main','chain'].includes(s.phase)&&!replacement)return false;return !!((!s.turnData.actionUsed||s.phase==='chain'&&s.turnData.allowance>0||replacement||mossFollowReady(s,p)||tradeExtraReady(s,p,c,n)||s.phase==='chain'&&s.turnData.pairPlan?.first&&pairMatch(s,c,n))&&canPlayColor(s,p,c,n));}
export function canSabotage(s,p,c){if(c?.type!=='ingredient'||s.phase!=='reaction'||s.players[s.reactionQueue[s.reactionIndex]]?.id!==p.id)return false;const b=active(s).brew.find(b=>b.id===s.turnData.last);return !!(b&&(s.turnData.sabotageCount||0)<sabCap(s)&&(c.color===b.card.color||character(p)?.fungusSabotage&&c.color==='red'));}

export const HEXES = [
 {name:'Перехрестя під дубом',cap:2,rule:'Крок 1: скиньте складник Дубу. Крок 2: застосуйте вміння будь-якої поляни — з її власною ціною.'},
 {name:'Грибна галявина',cap:3,rule:'Скиньте складник. Відкрийте 5 карт і заберіть усі Гриби; якщо Грибів немає — відкривайте далі до першого. Один Гриб цього ходу замінює будь-який тип.'},
 {name:'Квітучий яр',cap:2,rule:'Оберіть складник у руці: при варці він зберігає очки, а його ефект стає «ще одне додавання».'},
 {name:'Корчі під кручою',cap:2,rule:'Подивіться 3 верхні карти скиду. Одну відповідну зваріть за доступне додавання; якщо жодна не підходить — одну заберіть у руку.'},
 {name:'Мохова тиша',cap:2,rule:'Збережіть позицію одного складника, обнуліть його очки й вимкніть ефект, щоб скасувати весь саботаж на ньому.'},
 {name:'Світлякова левада',cap:3,rule:'Без витрати варки замініть свій складник Комахою з руки. Старий складник і саботаж у скид. Ефект нової Комахи працює.'},
 {name:'Срібне джерело',cap:2,rule:'Скиньте Рідину, щоб повторити позитивний ефект одного складника свого казана.'}
];
export const HEXES_B=[null,
 {name:'Грибниця',cap:3,side:'B',icons:'✕✕ → ⇄',rule:'Скиньте 2 карти з руки — заберіть будь-яку карту урожаю з будь-якого гекса.'},
 {name:'Вінки на воді',cap:2,side:'B',icons:'✕✕= → ✦',rule:'Скиньте 2 складники одного типу — +2 слави. Якщо у вас найменше слави — +3.'},
 {name:'Сплетене коріння',cap:2,side:'B',icons:'✕ → ⏭',rule:'Скиньте будь-яку карту — наступний складник цього ходу закриє свою позицію і ще одну за нею (без очок, зілля вже не чисте).'},
 {name:'Мохова схованка',cap:2,side:'B',passive:true,icons:'⤵ → 🂠 (❧ +🂠)',rule:'Хто щойно прийшов сюди — відкриває верхню карту колоди й забирає її. Якщо це Мох ❧ — забирає ще одну.'},
 {name:'Мурашник',cap:3,side:'B',icons:'○ → ⚡⇄',rule:'Перенесіть один саботаж зі свого котла на останній складник суперника.'},
 {name:'Відбиття',cap:2,side:'B',icons:'✕◈ → +очки',rule:'Скиньте Рідину — останній складник у вашому котлі отримує свої надруковані очки ще раз (множник не діє).'}];
export const HEX_ICONS_A=['✕ → ✧','✕ → ♠','○ → +1','○ → ↶','0 → 🛡','⬣ → ⇄','✕◈ → ↻'];
export function hexInfo(s,i){const b=s?.hexSide?.[i]==='B'&&HEXES_B[i];return b?{...b,cap:HEXES[i].cap}:{...HEXES[i],side:'A',icons:HEX_ICONS_A[i]};}
function sideB(s,h){return h>0&&s.hexSide?.[h]==='B';}
function chooseSides(setting){if(Array.isArray(setting)&&setting.length===7)return setting.map((x,i)=>!i?'A':x==='B'?'B':x==='A'?'A':Math.random()<.5?'A':'B');if(setting==='old')return Array(7).fill('A');if(setting==='new')return ['A','B','B','B','B','B','B'];return ['A',...Array.from({length:6},()=>Math.random()<.5?'A':'B')];}
function bOptions(s,p,hex,step,picks=[]){
 const opp=s.players.filter(q=>q!==p),food=p.hand.filter(c=>c.type==='ingredient');
 const cardOpt=c=>({id:c.id,kind:'card',card:c}),playerOpt=q=>({id:q.id,kind:'player',label:q.name});
 if(hex===1){if(step==='take')return s.hexes.flatMap(x=>x).map(cardOpt);return p.hand.filter(c=>!picks.includes(c.id)).map(cardOpt);}
 if(hex===2){const cnt={};food.forEach(c=>cnt[c.color]=(cnt[c.color]||0)+1);const first=picks[0]&&p.hand.find(c=>c.id===picks[0]);return food.filter(c=>!picks.includes(c.id)&&(first?c.color===first.color:cnt[c.color]>=2)).map(cardOpt);}
 if(hex===3)return p.hand.map(cardOpt);
 if(hex===5){if(step==='unit')return p.brew.filter(b=>b.attacks.some(a=>!a.cancelled)).map(b=>({id:b.id,kind:'card',card:b.attacks.find(a=>!a.cancelled).card,label:b.card.name}));return opp.filter(q=>q.brew.length).map(playerOpt);}
 if(hex===6)return food.filter(c=>c.color==='purple'||chugFree(s,p)).map(cardOpt);
 return [];
}
function reflectUnit(p){return [...p.brew].reverse().find(b=>b.card.type==='ingredient'&&!b.disabled&&!b.substituted&&!b.zeroed);}
function bReady(s,p,hex){const r=recipe(p);
 if(hex===1)return p.hand.length>=2&&s.hexes.some(x=>x.length);
 if(hex===2)return bOptions(s,p,2,'pay').length>=2;
 if(hex===3)return p.hand.length>=1&&!!r&&!r.chaos&&!s.turnData.twinRoot;
 if(hex===4)return false;
 if(hex===5)return p.brew.some(b=>b.attacks.some(a=>!a.cancelled))&&s.players.some(q=>q!==p&&q.brew.length);
 if(hex===6){const u=reflectUnit(p);return !!u&&(u.card.points||0)>0&&bOptions(s,p,6,'pay').length>0;}
 return false;}
const B_STEPS={1:['take','pay','pay'],2:['pay','pay'],3:['pay'],5:['unit','player'],6:['pay']};
const B_PROMPTS={take:'Оберіть карту урожаю, яку заберете',pay:'Оберіть карту для скиду',player:'Оберіть суперника',give:'Оберіть карту, яку віддасте',unit:'Оберіть саботаж у своєму котлі'};
function startB(s,p,hex){if(!bReady(s,p,hex))fail('Умову цієї поляни зараз не виконано.');const step=B_STEPS[hex][0];s.hexChoice={id:id(),owner:p.id,kind:'b',hex,name:hexInfo(s,hex).name,steps:B_STEPS[hex],stepIndex:0,step,prompt:B_PROMPTS[step],picks:[],options:bOptions(s,p,hex,step)};}
function chooseB(s,p,a){const ch=s.hexChoice;
 if(!a.pick){s.hexChoice=null;return;}
 if(!ch.options.some(o=>o.id===a.pick))fail('Оберіть один із запропонованих варіантів.');
 ch.picks.push(a.pick);ch.stepIndex++;
 if(ch.stepIndex<ch.steps.length){ch.step=ch.steps[ch.stepIndex];ch.prompt=B_PROMPTS[ch.step];ch.options=bOptions(s,p,ch.hex,ch.step,ch.picks);if(!ch.options.length){s.hexChoice=null;fail('Немає варіантів для цього кроку.');}return;}
 s.hexChoice=null;resolveB(s,p,ch.hex,ch.picks);s.turnData.hexUsed=true;}
function resolveB(s,p,hex,picks){const name=hexInfo(s,hex).name;
 if(hex===1){const pile=s.hexes.find(x=>x.some(c=>c.id===picks[0]));const got=pile.splice(pile.findIndex(c=>c.id===picks[0]),1)[0];s.discard.push(takeCard(p,picks[1]),takeCard(p,picks[2]));p.hand.push(got);log(s,p.name+' на «'+name+'» забирає '+got.name+'.');return;}
 if(hex===2){s.discard.push(takeCard(p,picks[0]),takeCard(p,picks[1]));const low=s.players.every(q=>q===p||p.score<=q.score),gain=low?3:2;p.score+=gain;log(s,p.name+' плете вінки: +'+gain+' слави.');return;}
 if(hex===3){s.discard.push(takeCard(p,picks[0]));s.turnData.twinRoot=true;log(s,p.name+': наступний складник закриє дві позиції.');return;}
 if(hex===5){const u=p.brew.find(b=>b.id===picks[0]),q=s.players.find(x=>x.id===picks[1]);const i=u.attacks.findIndex(a=>!a.cancelled);const [att]=u.attacks.splice(i,1);q.brew.at(-1).attacks.push({...att,fromId:p.id,from:p.name});log(s,p.name+' переносить саботаж на котел '+q.name+'.');return;}
 if(hex===6){const u=reflectUnit(p);s.discard.push(takeCard(p,picks[0]));u.boost=(u.boost||0)+(u.card.points||0);log(s,p.name+': «'+u.card.name+'» дає свої очки ще раз.');return;}
}
function effectiveHex(s,p){return s.hexes?(p===active(s)?s.turnData.borrowedHex??p.hex:p.hex):null;}
function adjacentHex(s,a,b){
 const x=s.hexOrder?.indexOf(a)??a,y=s.hexOrder?.indexOf(b)??b;
 return x!==y&&(x===0||y===0||Math.abs(x-y)===1||Math.abs(x-y)===5);
}
function hexBlocked(s,p,hex){
 return s.players.some(q=>q!==p&&q.character==='chugaister'&&q.hexLocked&&q.hex!==0&&q.hex===hex);
}
function hexDestinations(s,p){
 const distance=new Map([[p.hex,0]]),queue=[p.hex],steps=p.character==='vodianyk'?2:1;
 for(const from of queue){
  if(distance.get(from)>=steps)continue;
  for(let to=0;to<HEXES.length;to++){
   if(distance.has(to)||!adjacentHex(s,from,to)||hexBlocked(s,p,to))continue;
   distance.set(to,distance.get(from)+1);queue.push(to);
  }
 }
 return [...distance.keys()];
}
function growHexes(s){
 for(let hex=0;hex<HEXES.length;hex++){
  if(s.hexes[hex].length>=HEXES[hex].cap||!s.deck.length&&!s.discard.length)continue;
  const growers=s.players.filter(p=>p.hex===hex&&p.hexStayed);
  if(growers.length)draw(s,growers[0],1);
  else draw(s,{hand:s.hexes[hex]},1);
 }
 for(const p of s.players)p.hexStayed=false;
}
function hexPerk(s,p){
 if(!s.hexes||p!==active(s)||s.status!=='playing'||s.effectChoice||s.hexChoice)return null;
 if(p.character==='mosskeeper'&&s.phase==='move'&&!p.hexPerkUsed)return {mode:'mosskeeper',targets:HEXES.map((_,i)=>i).filter(i=>adjacentHex(s,p.hex,i)&&s.hexes[i].length&&!s.players.some(q=>q.hex===i))};
 if(p.character==='vodianyk'&&s.phase==='move')return {mode:'vodianyk',targets:hexDestinations(s,p).filter(i=>i!==p.hex)};
 if(!s.legacy&&p.character==='blud'&&['main','post','defense'].includes(s.phase)&&!s.turnData.bludUsed&&!s.turnData.hexUsed&&s.turnData.borrowedHex===undefined){const targets=p.hex===0?[]:[1,2,3,4,5,6].filter(i=>i!==p.hex&&adjacentHex(s,p.hex,i)&&!hexBlocked(s,p,i)&&!s.players.some(q=>q.hexLocked&&q.hex===i));return targets.length?{mode:'bludTile',targets}:null;}
 if(p.character==='blud'&&['main','post','defense'].includes(s.phase)&&!s.turnData.bludUsed&&!s.turnData.hexUsed&&s.turnData.borrowedHex===undefined){
  const players=s.players.filter(q=>q!==p&&q.hex!==p.hex&&!hexBlocked(s,p,q.hex)&&!hexBlocked(s,q,p.hex)).map(q=>q.id);
  return {mode:'blud',targets:[...new Set(s.players.filter(q=>players.includes(q.id)).map(q=>q.hex))],players};
 }
 if(p.character==='chugaister'&&p.hex!==0&&['main','chain','post','defense','move'].includes(s.phase)&&!p.hexLocked)return {mode:'chugaister',targets:[p.hex]};
 return null;
}
function useHexPerk(s,p,a){
 const perk=hexPerk(s,p);
 if(!perk?.targets.includes(a.hex))fail('Ціль уміння недоступна.');
 if(perk.mode==='vodianyk'){moveHex(s,p,a.hex);return;}
 if(perk.mode==='chugaister'){p.hexLocked=true;log(s,p.name+' закриває вхід на '+HEXES[p.hex].name+'.');return;}
 if(perk.mode==='mosskeeper'){
  const harvest=s.hexes[a.hex].splice(0);
  p.hexPerkUsed=true;p.hand.push(...harvest);
  hexTravelEvent(s,p,p.hex,p.hex,[p.hex],harvest.map(c=>c.id),[],{harvestHex:a.hex,mode:'mosskeeper'});
  moveHex(s,p,p.hex);return;
 }
 if(perk.mode==='bludTile'){s.hexOrder??=[0,1,2,3,4,5,6];const A=p.hex,B=a.hex,ia=s.hexOrder.indexOf(A),ib=s.hexOrder.indexOf(B);s.hexOrder[ia]=B;s.hexOrder[ib]=A;for(const q of s.players){if(q.hex===A)q.hex=B;else if(q.hex===B)q.hex=A;}s.turnData.startHex=p.hex;s.turnData.bludUsed=true;log(s,p.name+' міняє місцями '+HEXES[A].name+' і '+HEXES[B].name+'.');return;}
 const candidates=s.players.filter(q=>perk.players.includes(q.id)&&q.hex===a.hex);
 const other=candidates.find(q=>q.id===a.player)||(candidates.length===1?candidates[0]:null);
 if(!other)fail('Оберіть фішку суперника.');
 const from=p.hex,otherFrom=other.hex;
 [p.hex,other.hex]=[other.hex,p.hex];other.hexStayed=false;
 hexTravelEvent(s,p,from,p.hex,[from,p.hex],[],[],{mode:'swap',companion:{owner:other.id,from:otherFrom,tile:other.hex}});
 s.turnData.startHex=p.hex;s.turnData.bludUsed=true;
 log(s,p.name+' обмінюється місцями з '+other.name+'.');
}
function hexPath(s,p,destination){
 if(destination===p.hex)return [p.hex];
 if(adjacentHex(s,p.hex,destination))return [p.hex,destination];
 const middle=HEXES.findIndex((_,i)=>adjacentHex(s,p.hex,i)&&adjacentHex(s,i,destination)&&!hexBlocked(s,p,i));
 return middle<0?[p.hex,destination]:[p.hex,middle,destination];
}
function hexTravelEvent(s,p,from,tile,path,harvestIds,travelIds,extra={}){
 const movement=Math.max(0,path.length-1)*620;
 const harvest=harvestIds.length?600+(harvestIds.length-1)*100:220;
 const duration=movement+180+harvest+120+(travelIds.length?600:0)+260;
 s.animationUntil=Date.now()+duration;
 s.ruleEvents??=[];
 s.ruleEvents.push({type:'hexTravel',owner:p.id,from,tile,path,harvestIds,travelIds,harvest:harvestIds.length,travelDraw:travelIds.length,duration,...extra});
}
function moveHex(s,p,hex){
 if(s.phase!=='move'||!Number.isInteger(hex)||!hexDestinations(s,p).includes(hex))fail('Цей перехід недоступний.');
 p.hexStayed=hex===p.hex;
 if(!p.hexStayed){
  const from=p.hex,path=hexPath(s,p,hex),harvest=[...(false?path.slice(1,-1).flatMap(h=>s.hexes[h].splice(0)):[]),...s.hexes[hex].splice(0)];
  p.hexLocked=false;p.hex=hex;p.hand.push(...harvest);
  const before=p.hand.length;if(character(p)?.harvest)p.pendingHarvest=true;else draw(s,p,1);
  if(hex===4&&sideB(s,4)){const k=p.hand.length;draw(s,p,1);const found=p.hand[k];if(found?.type==='ingredient'&&found.color==='green')draw(s,p,1);log(s,p.name+' знаходить у Моховій схованці: '+p.hand.slice(k).map(c=>c.name).join(', ')+'.');}
  hexTravelEvent(s,p,from,hex,path,harvest.map(c=>c.id),p.hand.slice(before).map(c=>c.id));
 }
 p.hexScout={};
 log(s,p.name+(p.hexStayed?' залишається: ':' переходить: ')+HEXES[hex].name+'.');
 end(s,true);
}
function hexSkillTargets(s,p){
 const result={payments:[],units:[],borrow:[],cards:[],ready:false,paid:!!s.turnData.oakPaid};
 if(!s.hexes||p!==active(s)||s.status!=='playing'||p.hex!==(s.turnData.startHex??p.hex)||s.turnData.hexUsed||s.effectChoice||s.hexChoice||!['main','chain','post','defense','move'].includes(s.phase))return result;
 result.ready=true;
 const hex=effectiveHex(s,p),food=p.hand.filter(c=>c.type==='ingredient');
 if(sideB(s,hex)){result.side='B';result.bReady=bReady(s,p,hex);return result;}
 if(hex===0){result.payments=s.turnData.oakPaid?[]:food.map(c=>c.id);result.borrow=HEXES.map((_,i)=>i).filter(i=>adjacentHex(s,p.hex,i)&&!(i===4&&sideB(s,4)));}
 if(hex===1)result.payments=food.map(c=>c.id);
 if(hex===2)result.payments=food.filter(c=>canChooseBrew(s,p,c)).map(c=>c.id);
 if(hex===3)result.cards=s.discard.slice(-3).filter(c=>canChooseBrew(s,p,c)).map(c=>c.id);
 if(hex===4)result.units=p.brew.filter(b=>!b.disabled&&!b.substituted&&b.attacks.some(a=>!a.cancelled)).map(b=>b.id);
 if(hex===5){
  result.payments=food.filter(c=>c.color==='black').map(c=>c.id);
  result.units=p.brew.filter(b=>b.card.type==='ingredient'&&b.slot!==null&&!b.sealed&&!b.disabled).map(b=>b.id);
 }
 if(hex===6){
  result.payments=food.filter(c=>chugFree(s,p)||c.color==='purple').map(c=>c.id);
  result.units=p.brew.filter(b=>!b.disabled&&!b.effectMuted&&!b.carried&&['extra','draw','sift','recover','rebrew','echo','stoke','amplify'].includes(b.card.effect)).map(b=>b.id);
 }
 return result;
}
function chugFree(s,p){return !!(s.hexes&&p.character==='chugaister'&&p.hexLocked&&effectiveHex(s,p)===p.hex);}
function useHex(s,p,a){
 const targets=hexSkillTargets(s,p),free=chugFree(s,p);
 if(!targets.ready)fail('Уміння гекса зараз недоступне.');
 const hex=effectiveHex(s,p);
 if(sideB(s,hex)){startB(s,p,hex);return;}
 if(hex===0){
  const destination=a.hex===0?undefined:a.hex;
  if(destination!==undefined&&!targets.borrow.includes(destination))fail('Оберіть доступне вміння поляни.');
  if(!s.turnData.oakPaid){
   if(!targets.payments.includes(a.card))fail('Спочатку скиньте один інгредієнт на Дуб.');
   s.discard.push(takeCard(p,a.card));s.turnData.oakPaid=true;
   log(s,p.name+' оплачує вміння Дуба. Оберіть поляну.');
  }else if(a.card)fail('Уміння Дуба вже оплачено.');
  if(destination!==undefined){s.turnData.borrowedHex=destination;log(s,p.name+' запозичує вміння: '+HEXES[destination].name+'.');}
  return;
 }
 if(hex===1){
  if(!free&&!targets.payments.includes(a.card))fail('Оберіть складник для скиду.');
  if(!free)s.discard.push(takeCard(p,a.card));
  const tray={hand:[]};draw(s,tray,5);
  const isMushroom=c=>c.type==='ingredient'&&c.color==='red';
  while(!tray.hand.some(isMushroom)){const before=tray.hand.length;draw(s,tray,1);if(tray.hand.length===before)break;}
  const mushrooms=tray.hand.filter(isMushroom);
  p.hand.push(...mushrooms);s.deck.unshift(...tray.hand.filter(c=>!mushrooms.includes(c)));
  s.turnData.mushroomCards=mushrooms.map(c=>c.id);
 }else if(hex===2){
  if(!targets.payments.includes(a.card))fail('Оберіть доступний для варки складник.');
  s.turnData.flowerCard=a.card;log(s,'Квітучий яр: '+p.hand.find(c=>c.id===a.card).name+' → продовження.');
  return;
 }else if(hex===3){
  if(!s.discard.length)fail('Скид порожній.');
  s.hexChoice={owner:p.id,kind:'roots-brew',cards:s.discard.slice(-3)};
  return;
 }else if(hex===4){
  if(!targets.units.includes(a.target))fail('Оберіть атакований складник.');
  const unit=p.brew.find(b=>b.id===a.target);unit.zeroed=true;unit.effectMuted=true;
  unit.attacks.forEach(attack=>attack.cancelled=true);
 }else if(hex===5){
  if(!targets.payments.includes(a.card)||!targets.units.includes(a.target))fail('Потрібні Комаха з руки та власний складник.');
  const index=p.brew.findIndex(b=>b.id===a.target),old=p.brew[index],slot={slot:old.slot,extra:old.extra,color:old.playedAs||old.card.color};
  p.brew.splice(index,1);s.discard.push(old.card,...old.attacks.map(a=>a.card));s.turnData.hexUsed=true;
  play(s,p,a.card,{replacing:slot,free:true});return;
 }else if(hex===6){
  if((!free&&!targets.payments.includes(a.card))||!targets.units.includes(a.target))fail('Оберіть Рідину та складник з ефектом.');
  const unit=p.brew.find(b=>b.id===a.target);
  if(!free)s.discard.push(takeCard(p,a.card));s.turnData.hexUsed=true;
  if(s.phase==='post'||s.phase==='defense')s.phase='chain';
  resolveIngredientEffect(s,p,unit,unit.card.effect);
  comboNotice(s,p,unit,'Джерело: повтор ефекту');return;
 }
 s.turnData.hexUsed=true;
}
function resolveHexChoice(s,p,a){
 const choice=s.hexChoice;
 if(p.id!==choice.owner||a.type!=='hexChoose')fail('Спочатку завершіть вибір на мапі.');
 if(choice.kind==='b'){chooseB(s,p,a);return;}
 if(choice.kind==='roots-brew'){
  if(!a.card){s.hexChoice=null;if(recipe(p))s.turnData.hexUsed=true;return;}
  const card=choice.cards.find(c=>c.id===a.card),index=s.discard.findIndex(c=>c.id===a.card);
  if(!card||index<0)fail('Цей складник зараз недоступний.');
  const brewable=canChooseBrew(s,p,card);
  if(!brewable&&choice.cards.some(c=>canChooseBrew(s,p,c)))fail('Цей складник зараз недоступний.');
  s.discard.splice(index,1);p.hand.push(card);s.hexChoice=null;s.turnData.hexUsed=true;
  if(brewable)play(s,p,card.id);else log(s,p.name+' · Корчі: «'+card.name+'» у руку.');
  return;
 }
 // Finish choices created by a game that was running before this update.
 const card=choice.cards.find(c=>c.id===a.card);
 if(!card)fail('Оберіть карту.');
 if(choice.kind==='seed'){
  if(!HEXES[a.hex]||s.hexes[a.hex].length>=HEXES[a.hex].cap)fail('На гексі немає місця.');
  s.hexes[a.hex].push(card);
 }else if(choice.kind==='roots'){
  const index=s.discard.findIndex(c=>c.id===card.id);
  if(index<0||!p.hand.some(c=>c.id===choice.payment))fail('Складник недоступний.');
  s.discard.push(takeCard(p,choice.payment));p.hand.push(s.discard.splice(index,1)[0]);
 }else if(choice.kind==='flowers')p.hand.push(card);
 else fail('Невідомий вибір на мапі.');
 if(choice.kind!=='roots')s.deck.unshift(...choice.cards.filter(c=>c.id!==card.id));
 s.hexChoice=null;
}
function botHex(s,p){
 const food=p.hand.filter(c=>c.type==='ingredient'),need=needed(p)?.color;
 if(s.hexChoice?.kind==='b'){const ch=s.hexChoice,val=o=>o.kind==='card'?ingredientValue(s,p,o.card):(s.players.find(q=>q.id===o.id)?.score||0);const best=[...ch.options].sort((x,y)=>(ch.step==='take'||ch.step==='player'?val(y)-val(x):val(x)-val(y)))[0];return {type:'hexChoose',pick:best?.id};}
 if(s.hexChoice){
  const cards=[...s.hexChoice.cards].sort((a,b)=>ingredientValue(s,p,b)-ingredientValue(s,p,a));
  return {type:'hexChoose',card:cards.find(c=>canChooseBrew(s,p,c))?.id};
 }
 const score=hex=>s.hexes[hex].length*2+Number(hex===2&&food.length>2)*2+Number(hex===3&&s.discard.slice(-3).some(c=>canChooseBrew(s,p,c)))*2+Number(hex===6&&food.some(c=>c.color==='purple')&&p.brew.some(b=>b.card.effect))*2+Number(hex===4&&p.brew.some(b=>b.attacks.some(a=>!a.cancelled)))*3;
 const perk=hexPerk(s,p);
 if(s.phase==='move'){
  const destinations=hexDestinations(s,p).sort((a,b)=>score(b)-score(a));
  if(perk?.mode==='mosskeeper'&&perk.targets.some(hex=>s.hexes[hex].length>=2)){
   return {type:'hexPerk',hex:perk.targets.sort((a,b)=>s.hexes[b].length-s.hexes[a].length)[0]};
  }
  return {type:'hexMove',hex:destinations[0]};
 }
 if(perk?.mode==='chugaister')return {type:'hexPerk',hex:p.hex};
 if(perk?.mode==='blud'){
  const player=s.players.find(q=>perk.players.includes(q.id)&&score(q.hex)>score(p.hex)+2);
  if(player)return {type:'hexPerk',hex:player.hex,player:player.id};
 }
 const targets=hexSkillTargets(s,p);
 if(!targets.ready||targets.side==='B')return null;
 const hex=effectiveHex(s,p),cheap=food.filter(c=>targets.payments.includes(c.id)).sort((a,b)=>ingredientValue(s,p,a)-ingredientValue(s,p,b))[0];
 if(hex===0&&cheap&&food.length>3){
  const location=targets.borrow.find(i=>i===2&&food.some(c=>canChooseBrew(s,p,c))||i===3&&s.discard.slice(-3).some(c=>canChooseBrew(s,p,c))||i===4&&p.brew.some(b=>b.attacks.some(a=>!a.cancelled)));
  if(location!==undefined)return {type:'hexUse',card:cheap.id,hex:location};
 }
 if(hex===1&&cheap&&(need==='red'||food.length>3))return {type:'hexUse',card:cheap.id};
 if(hex===2&&cheap&&!s.turnData.flowerCard&&food.length>1&&needed(p)&&!needed(p).extra)return {type:'hexUse',card:cheap.id};
 if(hex===3&&targets.cards.length)return {type:'hexUse'};
 if(hex===4&&targets.units.length)return {type:'hexUse',target:targets.units[0]};
 if(hex===5&&cheap){
  const unit=p.brew.find(b=>targets.units.includes(b.id)&&b.attacks.some(a=>!a.cancelled));
  if(unit)return {type:'hexUse',card:cheap.id,target:unit.id};
 }
 if(hex===6&&cheap&&targets.units.length){
  const unit=p.brew.find(b=>targets.units.includes(b.id)&&['extra','draw','rebrew','recover'].includes(b.card.effect));
  if(unit)return {type:'hexUse',card:cheap.id,target:unit.id};
 }
 return null;
}



function echoWildReady(p,c){
 const prior=[...p.brew].reverse().find(b=>!b.disabled&&!b.substituted);
 return c?.effect==='echo'&&prior?.card.effect==='brew-wild'&&!prior.effectMuted&&!prior.carried;
}



function hexBrewReason(s,p){
 if(p!==active(s))return 'Уміння доступне у ваш хід.';
 if(!recipe(p))return 'Спочатку оберіть рецепт на своєму столі.';
 if(!s.discard.length)return 'Скид порожній — переглядати нічого.';
 const top=s.discard.slice(-3).filter(c=>c.type==='ingredient');
 if(!top.some(c=>canChooseBrew(s,p,c))){
  if(top.some(c=>canChooseBrew(s,p,c,true)))return 'Додавання вже витрачено. Потрібне продовження або новий хід.';
  return 'Серед трьох верхніх карт немає складника для доступної позиції рецепта.';
 }
 return 'Перетягніть підсвічений складник на свій гекс або казан. Він витратить доступне додавання.';
}
