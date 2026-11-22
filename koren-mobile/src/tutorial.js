import {makePlayer,makeRoom,action,view,deck,orders,botActor,botAction,botTrade} from './engine.js';

export const LESSON_SCHEMA=2;
export const LESSON_STAGES={
 bots:['Підготуємо стіл','Оберіть двох ботів. Вони покажуть варку, саботаж і торгівлю.','setup'],
 goal:['До трьох зіль','Оберіть 3 зілля до фіналу. Переможе найбільша слава, а не просто найшвидший травник.','setup'],
 hero:['Оберіть Мавку','Натисніть підсвічену Мавку. Її мох один раз за зілля відкриє додатковий інгредієнт будь-якого типу.','action'],
 characters:['Товариство збирається','Суперники також обирають персонажів.','auto'],
 hand:['Ваші перші п’ять карт','Корінець продовжує комбінацію. Нектар накопичує ×2. Оберіг вимикає негатив. Рідина оплатить Джерело. Боровик на +3 завершить нашу комбінацію.','next'],
 recipe:['Стежка Мавки','Оберіть цей рецепт: Коріння → Рідини → Мохи → Гриби. Нагорода готового зілля — +8 слави понад очки карт.','action'],
 draftBots:['Рецепти суперників','Кожен забирає свій рецепт. Ваш рецепт залишиться у вашій руці.','auto'],
 place:['Поставте рецепт на стіл','Перетягніть «Стежку Мавки» з руки на свій казан. Рецепт не витрачає додавання інгредієнта.','action'],
 root:['Почніть комбінацію','Перетягніть «Вузлуватий корінець» на свій казан. Він підходить першій позиції.','action'],
 rootInspect:['Роздивіться карту','Натисніть на корінець. Відкриємо його зблизька та прочитаємо ефект.','action'],
 rootResult:['Ще одне додавання','Корінець: +1 слави, ↪ одне додавання. У саботажі: −1. Це ефект карти. Перк Мавки ще не витрачено.','next'],
 nectar:['Підготуйте множник','Перетягніть «Квітковий нектар» у казан. Використаємо продовження корінця.','action'],
 nectarResult:['Накопичено ×2','Нектар має 0 власних очок. Наступний власний інгредієнт із додатними очками отримає множник. Нульові підсилювачі його не витрачають.','next'],
 stopFirst:['Дайте суперникам відповісти','Натисніть «Відповіді». Ви закінчуєте комбінацію, але ще можете захищатися і рухатися.','action'],
 firstReactions:['Чужа ложка','Бот підкидає Рідину до вашого останнього інгредієнта-Рідини. Наступний суперник пасує.','auto'],
 sabotage:['Це саботаж −2','Чужа карта лежить поруч. Її позитивний ефект не працює, а −2 віднімається від зілля. Нектар і накопичений ×2 зберігаються.','next'],
 ward:['Захистіть нектар','Перетягніть Оберіг із руною ᛟ на підкинуту негативну карту. Стопка розкривається при наближенні.','action'],
 wardResult:['Негатив вимкнено','Оберіг пішов у скид. Саботаж лишився перекресленим і більше не віднімає очки. Захист не витрачає варку.','next'],
 finishFirst:['Завершіть свій хід','Натисніть «Завершити хід». Зілля ще не готове, тому воно залишиться у казані. Далі оберемо крок.','action'],
 move:['До Срібного джерела','Перетягніть свою фішку з Дуба на підсвічене Срібне джерело. З центру це один крок.','action'],
 arrival:['Урожай і карта за крок','Ви отримали дві карти з Джерела та одну карту за переміщення. Уміння нової поляни можна використати зі свого наступного ходу.','next'],
 botOne:['Хід першого суперника','Стежте за його казаном: він додасть Квіти. Потім ви зможете відповісти саботажем того самого типу.','next'],
 botOneRun:['Суперник варить','Камера слідує за картами. Зараз ваші карти варити не можна.','auto'],
 attackBot:['Тепер ваша ложка','Перетягніть «Цвіт папороті» з руки на казан першого бота. Квіти відповідають його останнім Квітам.','action'],
 attackResult:['Ви підкинули −1','Ви витратили карту зі своєї руки. У чужому казані працює лише її нижній негатив. Жодного продовження бот не отримав.','next'],
 botOneEnd:['Суперник завершує хід','Він залишає зілля на столі та переходить на іншу поляну.','auto'],
 botTwoRun:['Хід другого суперника','Другий бот додає Коріння. Саботаж завжди добровільний.','auto'],
 passBot:['Можна просто пасувати','Натисніть «Пас». Зберігати карти для власної комбінації теж вигідно.','action'],
 botTwoEnd:['Раунд завершується','Другий бот робить крок. Наприкінці кола на полянах відновлюється урожай.','auto'],
 turnTwo:['Знову ваш хід','Ви почали хід на Джерелі. Спочатку використаємо поляну, потім повернемося до варки. Повторно отримувати минулий урожай не потрібно.','next'],
 openMap:['Відкрийте мапу','Натисніть «Мапа». Уміння місця доступне до закінчення варки, тож не поспішайте здавати зілля.','action'],
 springInfo:['Повторіть ефект','Джерело приймає Рідину з руки й повторює позитивний ефект вашого інгредієнта. Оберемо нектар із ×2.','next'],
 spring:['Рідина для Джерела','Перетягніть «Живу краплю» на нектар у панелі Джерела. Крапля піде у скид, не займе позицію рецепта.','action'],
 springResult:['Тепер ×4','Джерело повторило підсилення нектару. Дві зарядки по ×2 дають ×4. Додавання інгредієнта цього ходу ще доступне.','next'],
 openBrew:['Поверніться до казана','Натисніть «Казани». Зараз знайдемо ще один підсилювач на ярмарку.','action'],
 tradeInfo:['Ваша карта — ваша пропозиція','Запропонуємо Барвінок, отриманий з урожаю. Відкрити обмін можна лише у свій хід. Інші гравці можуть відповідати поза чергою.','next'],
 offer:['Відкрийте ярмарок','Перетягніть «Барвінок» із руки в зону «Обмін».','action'],
 bids:['Зустрічні пропозиції','Обидва боти викладають карти. Вони ще не ваші: оберіть тільки одну пропозицію.','auto'],
 take:['Заберіть мох із ×2','Перетягніть запропонований першим ботом «Мох подушковий» у свою руку. Він отримає ваш Барвінок, другий забере свою карту назад.','action'],
 tradeResult:['Обмін завершено','Ви отримали мох із ×2 без витрати варки. Перейдемо до вашого казана.','next'],
 moss:['Додайте третій підсилювач','Перетягніть «Мох подушковий» у свій казан. Це ваше звичайне додавання за цей хід.','action'],
 mavka:['Мавка відкриває стежку','Накопичено ×6. Мох має 0 очок і не витратив множник. Раз за зілля Мавка дозволяє відразу після свого Моху додати будь-який інгредієнт на наступну позицію.','next'],
 final:['Боровик під ×6','Перетягніть Боровик на +3 у казан. Перк Мавки дозволяє це додаткове додавання.','action'],
 finalResult:['3 × 6 = 18','Боровик отримав 18 слави. Заряди підсилення витрачені. Усі чотири позиції заповнені, але суперники ще мають відповісти.','next'],
 stopFinal:['Останні відповіді','Натисніть «Відповіді». Саботаж діє лише на останній інгредієнт комбінації — тепер це Гриб.','action'],
 finalReactions:['Суперники підкидають','Кожен додає по одному Грибу. Оберіг ви вже використали.','auto'],
 negatives:['Мінуси не множаться','На Боровику лежать −2 і −3. Вони віднімуть 5 від загальної слави, а не помножаться на ×6. Власні 18 очок Боровика залишаються.','next'],
 score:['Здайте готове зілля','Натисніть «Здати зілля». Порахуємо славу та звільнимо казан.','action'],
 scoreResult:['Ви отримали 22 слави','Корінець +1, Боровик 18, рецепт +8, саботаж −2 −3. Разом 22. Підсилювачі мають 0 власних очок. Подивіться, як слава летить до вашого лічильника.','next'],
 victory:['Як перемогти','У вас 1 із 3 готових зіль. Перший, хто завершить третє, отримає +5 слави й запустить останні ходи інших. Переможе найбільша загальна слава.','next'],
 end:['Передайте хід','Натисніть «Завершити хід». Після варки можна зробити крок або лишитися.','action'],
 finalMove:['Зберіть наступний урожай','Перетягніть фішку до Світлякової левади. Там є карти для наступного зілля.','action'],
 harvestAgain:['Запас для нового зілля','Ви забрали весь урожай і карту за крок. У руці тепер є Коріння та Квіти для наступного рецепта.','next'],
 orderWait:['Дочекайтеся свого ходу','Боти цього кола завершують ходи без варки. Нове замовлення можна взяти у свій хід.','auto'],
 openOrders:['Новий рецепт','Відкрийте «Замовлення». Рецепт можна взяти раз за хід без витрати варки.','action'],
 newOrder:['Полиновий оберіг','Перетягніть підсвічений рецепт у руку або натисніть на нього. Коріння → Квіти → Коріння вже є у вашому запасі.','action'],
 newOrderResult:['Можна варити далі','Рецепт у вашій руці. Поставте його на казан і почніть з Кореня пам’яті. Квіти та ще один Корінь ви отримали з Левади.','next'],
 done:['Стежку пройдено','Ви зварили комбінацію, захистилися, підкинули саботаж, використали поляну та обмінялися. Далі — ця сама партія без підсвіток і обмежень.','next'],
 free:['Вільна гра','Боти грають самостійно. Навчання можна повторити з головного меню.','free']
};
const GO={rootResult:'nectar',nectarResult:'stopFirst',sabotage:'ward',wardResult:'finishFirst',arrival:'botOne',botOne:'botOneRun',attackResult:'botOneEnd',turnTwo:'openMap',springInfo:'spring',springResult:'tradeInfo',tradeInfo:'offer',tradeResult:'moss',mavka:'final',finalResult:'stopFinal',negatives:'score',scoreResult:'victory',victory:'end',harvestAgain:'orderWait',newOrderResult:'done',done:'free'};
export function createLesson(name='Травниця'){
 const p=makePlayer(name,'lesson-owner'),s=makeRoom('LESSON',p,{hexes:true,targetPotions:3});
 action(s,p.id,{type:'addBot'});action(s,p.id,{type:'addBot'});action(s,p.id,{type:'start'});
 return {schema:LESSON_SCHEMA,s,owner:p.id,stage:'bots',version:1,cursor:0,ids:{},created:Date.now()};
}
export function lessonView(l){return view(l.s,l.owner,l.version);}
export function lessonInfo(l){const [title,text,mode]=LESSON_STAGES[l.stage];return {title,text,mode,stage:l.stage};}
function step(l,to){l.stage=to;l.cursor=0;l.version++;}
function execute(l,p,a){action(l.s,p,a);l.version++;}
function seedLesson(l){
 const s=l.s,[p,b,c]=s.players,pool=[...s.deck,...s.players.flatMap(p=>p.hand),...s.hexes.flat()];
 const take=(name,key)=>{const i=pool.findIndex(c=>c.name===name);if(i<0)throw Error('Немає навчальної карти '+name);const [card]=pool.splice(i,1);if(key)l.ids[key]=card.id;return card;};
 p.hand=[take('Вузлуватий корінець','root'),take('Квітковий нектар','nectar'),take('Оберіг','ward'),take('Жива крапля','liquid'),take('Боровик','final')];
 b.hand=[take('Місячна роса','firstAttack'),take('Червона сироїжка','attackMinus2'),take('Сон-трава','botFlower'),take('Мох подушковий','moss'),take('Крило жука')];
 c.hand=[take('Рижик','attackMinus3'),take('Корінь мандрівника','botRoot'),take('Сік калини','otherBid'),take('Лисичка'),take('Вусик світляка')];
 s.hexes=Array.from({length:7},()=>[]);s.hexOrder=[0,1,2,3,4,5,6];
 s.hexes[6]=[take('Барвінок','offer'),take('Цвіт папороті','playerAttack')];
 s.hexes[5]=[take('Дзвоники','nextFlower'),take('Корінь оману','nextRoot')];
 const bonus=take('Корінь пам’яті','travelBonus');s.deck=pool.sort((a,b)=>a.name.localeCompare(b.name));s.deck.push(bonus);s.discard=[];
 const all=orders(),order=(name,key)=>{const i=all.findIndex(r=>r.name===name);const [r]=all.splice(i,1);l.ids[key]=r.id;return r;};
 s.market=[order('Стежка Мавки','recipe'),order('Купальська роса','botRecipe1'),order('Полиновий оберіг','botRecipe2'),order('Полиновий оберіг','nextRecipe')];s.orderDeck=all;
 for(const q of s.players){q.hex=0;q.handCount=q.hand.length;}
}
export function lessonNext(l){
 if(l.stage==='bots')return step(l,'goal');
 if(l.stage==='goal')return step(l,'hero');
 if(l.stage==='hand')return step(l,'recipe');
 if(!GO[l.stage])throw Error('Спочатку виконайте підсвічену дію.');
 step(l,GO[l.stage]);
}
export function lessonNavigate(l,destination){
 if(l.stage==='openMap'&&destination==='hex'){execute(l,l.owner,{type:'hexShow'});step(l,'springInfo');return;}
 if(l.stage==='openOrders'&&destination==='orders'){step(l,'newOrder');return;}
 if(l.stage==='openBrew'&&destination==='brew'){step(l,'tradeInfo');return;}
 throw Error('Зараз потрібна інша частина столу.');
}
export function lessonExpected(l){
 const id=l.ids,p=l.s.players[0],unit=p.brew.find(b=>b.card.id===id.nectar),attack=p.brew.flatMap(b=>b.attacks).find(a=>a.card.id===id.firstAttack);
 const actions={hero:{type:'chooseCharacter',character:'mavka'},recipe:{type:'order',order:id.recipe},place:{type:'selectRecipe',order:id.recipe},root:{type:'play',card:id.root},rootInspect:{type:'inspect',card:id.root},nectar:{type:'play',card:id.nectar},stopFirst:{type:'stop'},ward:{type:'white',card:id.ward,target:attack?.id},finishFirst:{type:'finishTurn'},move:{type:'hexMove',hex:6},attackBot:{type:'react',card:id.playerAttack},passBot:{type:'react'},spring:{type:'hexUse',card:id.liquid,target:unit?.id},offer:{type:'tradeOpen',card:id.offer},take:{type:'tradeTake',player:l.s.players[1].id},moss:{type:'play',card:id.moss},final:{type:'play',card:id.final},stopFinal:{type:'stop'},score:{type:'resolve'},end:{type:'finishTurn'},finalMove:{type:'hexMove',hex:5},newOrder:{type:'order',order:id.nextRecipe}};
 return actions[l.stage]||null;
}
export function lessonAction(l,a){
 a={...a};if(['end','finishFirst'].includes(l.stage)&&a.type==='end')a.type='finishTurn';if(a.type==='hexUse'&&(a.hex==null||Number.isNaN(a.hex)))delete a.hex;if(a.discard===false)delete a.discard;
 const expected=lessonExpected(l);
 if(!expected||Object.keys(expected).some(k=>expected[k]!==a[k])||Object.keys(a).some(k=>!Object.hasOwn(expected,k)&&!['version'].includes(k)))throw Error('Виконайте лише підсвічену дію уроку.');
 if(a.type!=='inspect')execute(l,l.owner,a);
 const next={hero:'characters',recipe:'draftBots',place:'root',root:'rootInspect',rootInspect:'rootResult',nectar:'nectarResult',stopFirst:'firstReactions',ward:'wardResult',finishFirst:'move',move:'arrival',attackBot:'attackResult',passBot:'botTwoEnd',spring:'springResult',offer:'bids',take:'tradeResult',moss:'mavka',final:'finalResult',stopFinal:'finalReactions',score:'scoreResult',end:'finalMove',finalMove:'harvestAgain',newOrder:'newOrderResult'};
 step(l,next[l.stage]);
}
export function lessonBotStep(l){
 const s=l.s,[p,b,c]=s.players,id=l.ids;
 const scripts={
  characters:[[b.id,{type:'chooseCharacter',character:'molfar'}],[c.id,{type:'chooseCharacter',character:'chumak'}]],
  draftBots:[[b.id,{type:'order',order:id.botRecipe1}],[c.id,{type:'order',order:id.botRecipe2}]],
  firstReactions:[[b.id,{type:'react',card:id.firstAttack}],[c.id,{type:'react'}]],
  botOneRun:[[b.id,{type:'selectRecipe',order:id.botRecipe1}],[b.id,{type:'play',card:id.botFlower}],[b.id,{type:'stop'}],[c.id,{type:'react'}]],
  botOneEnd:[[b.id,{type:'finishTurn'}],[b.id,{type:'hexMove',hex:1}]],
  botTwoRun:[[c.id,{type:'selectRecipe',order:id.botRecipe2}],[c.id,{type:'play',card:id.botRoot}],[c.id,{type:'stop'}]],
  botTwoEnd:[[b.id,{type:'react'}],[c.id,{type:'finishTurn'}],[c.id,{type:'hexMove',hex:2}]],
  bids:[[b.id,{type:'tradeBid',card:id.moss}],[c.id,{type:'tradeBid',card:id.otherBid}]],
  orderWait:[[b.id,{type:'finishTurn'}],[b.id,{type:'hexMove',hex:1}],[c.id,{type:'finishTurn'}],[c.id,{type:'hexMove',hex:2}]],
  finalReactions:[[c.id,{type:'react',card:id.attackMinus3}],[b.id,{type:'react',card:id.attackMinus2}]]
 };
 const script=scripts[l.stage];if(!script)throw Error('Не час дії бота.');
 const [pid,a]=script[l.cursor];execute(l,pid,a);l.cursor++;
 if(l.cursor===script.length){
  if(l.stage==='characters')seedLesson(l);
  const to={characters:'hand',draftBots:'place',firstReactions:'sabotage',botOneRun:'attackBot',botOneEnd:'botTwoRun',botTwoRun:'passBot',botTwoEnd:'turnTwo',bids:'take',finalReactions:'negatives',orderWait:'openOrders'};
  step(l,to[l.stage]);
 }
 return a;
}
export function lessonFreeTick(l){
 if(l.stage!=='free')return false;
 const trade=botTrade(l.s);if(trade){execute(l,trade.pid,trade.action);return true;}
 const actor=botActor(l.s);if(!actor?.bot)return false;
 const a=botAction(l.s);if(!a)return false;execute(l,actor.id,a);return true;
}
export function lessonFreeAction(l,a){if(l.stage!=='free')throw Error('Урок ще триває.');execute(l,l.owner,a);}
export function restoreLesson(saved){
 if(saved?.schema!==LESSON_SCHEMA||!LESSON_STAGES[saved.stage]||saved.s?.code!=='LESSON'||saved.s.players?.[0]?.id!==saved.owner)throw Error('Цей запис уроку не підтримується.');
 lessonView(saved);return saved;
}
