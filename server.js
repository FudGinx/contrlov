import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
const app=express(),http=createServer(app),io=new Server(http);
app.use(express.static('public'));
const rooms=new Map();
const fallback='кошка собака машина самолёт дерево облако дождь снег солнце луна звезда книга стол стул диван шкаф окно дверь ключ телефон компьютер мышка лампа чашка ложка тарелка суп хлеб масло сыр яблоко груша банан арбуз огурец помидор морковь картошка гриб цветок трава лес река море озеро остров гора город дорога мост поезд автобус велосипед корабль ракета космос планета робот дракон рыцарь король принцесса пират сокровище карта часы зеркало расчёска зубы нос ухо глаз рука нога сердце голова волосы шляпа куртка ботинок носок зонт подарок праздник музыка песня гитара барабан танец театр кино картина фотография художник учитель школа урок тетрадь ручка карандаш бумага письмо магазин деньги кошелёк работа отпуск пляж палатка костёр огонь вода лёд ветер гроза молния радуга бабочка пчела муравей комар паук медведь волк лиса заяц ёж белка тигр лев слон жираф обезьяна крокодил черепаха лягушка рыба акула кит дельфин пингвин орёл ворона голубь сова курица петух яйцо молоко сахар соль перец конфета шоколад мороженое торт пирог печенье варенье мёд сок кофе чай лимон апельсин виноград клубника малина вишня'.split(' ');
let words=fallback;
const parseNouns=t=>[...new Set(t.split(/\r?\n/).map(x=>x.trim().toLowerCase()).filter(x=>/^[а-яё]{3,}$/u.test(x)))];
const source='https://raw.githubusercontent.com/janetikhomirova/words_game/master/';
let easyWords=fallback;
try{
 const [full,easy]=await Promise.all([
  fetch(source+'russian_nouns.txt',{signal:AbortSignal.timeout(25000)}),
  fetch(source+'easy_russian_nouns.txt',{signal:AbortSignal.timeout(25000)})
 ]);
 if(!full.ok||!easy.ok)throw Error('Dictionary HTTP '+full.status+'/'+easy.status);
 const all=parseNouns(await full.text()),simple=parseNouns(await easy.text());
 if(all.length<20000)throw Error('Only '+all.length+' nouns loaded');
 words=all;easyWords=simple.length>500?simple:fallback;
 console.log('Noun dictionary ready:',words.length,'total;',easyWords.length,'easy');
}catch(e){console.warn('Noun download failed:',e.message)}

const letters='АБВГДКЛМНОПРСТУ'.split('');
const hints={'кошка':{п:['пушистая','питомец','прыгает','подоконник','погладить'],м:['мурлычет','мяукает','мышеловка'],к:['когти','котёнок','корм']},'собака':{п:['пёс','поводок','прогулка','порода'],л:['лает','лапа']},'машина':{п:['поездка','пассажир','парковка','педаль']},'книга':{п:['писатель','повесть','переплёт','прочитать']},'рыба':{п:['плавник','пруд','плавать','поймать']}};

// Hints from synonym dictionaries (Wiktionary) and directly relevant Wikipedia links.
const hintCache=new Map();
const normalize=t=>String(t||'').toLowerCase().replace(/ё/g,'е');
const stop=new Set('один одна одно одного одной одни другой другие каждый каждый самый самых любой многие много очень просто обычно например также более менее после перед который которая которые этого такой такое такие только первый второй третий иногда часто редко иногда почти примерно здесь там это есть было были будет имеет имеетcя является может можно должно должны слово слова статья раздел понятие термин название называется'.split(' '));
const curated={
 'красота':['очарование','обаяние','облик','очаровательный','ослепительный','обворожительный','опрятность','особенность','образ'],
 'ракета':['космос','космонавт','корабль','кабина','космический','курс','конструкция','керосин','комета'],
 'обед':['кушать','кухня','котлета','кафе','каша','компот','калории','кулинария'],
 'кошка':['пушистая','питомец','прыгает','подоконник','погладить','мурлычет','мяукает','мышеловка','когти','котёнок','корм'],
 'собака':['пёс','поводок','прогулка','порода','лает','лапа'],
 'машина':['поездка','пассажир','парковка','педаль'],
 'книга':['писатель','повесть','переплёт','прочитать'],
 'рыба':['плавник','пруд','плавать','поймать']
};
const wikiFetch=async (host,query)=>{
 const url='https://'+host+'/w/api.php?'+new URLSearchParams(query);
 const r=await fetch(url,{signal:AbortSignal.timeout(8000),headers:{'User-Agent':'OneLetterParty/2.0 (semantic game hints)'}});
 if(!r.ok)throw Error('Wiki HTTP '+r.status);
 return r.json();
};
function isAnswerDerivative(answer,hint){
 const a=normalize(answer),h=normalize(hint);
 if(a===h)return true;
 // Common Russian alternation: снег / снеж-, снежинка, снегопад.
 if(a==='снег'&&/^(снег|снеж)/.test(h))return true;
 // Reject transparent compounds and diminutives of longer answer words.
 if(a.length>=5&&(h.startsWith(a)&&h.length>a.length||a.startsWith(h)&&h.length>=5))return true;
 return false;
}
async function semanticHints(word,letter,refresh=false,detailed=false){
 const key=normalize(word)+'|'+normalize(letter)+(detailed?'|sources':'');
 if(!refresh&&hintCache.has(key))return hintCache.get(key);
 const initial=normalize(letter),ranked=new Map();
 const add=(raw,score,source)=>{
  const value=String(raw||'').toLowerCase().trim().replace(/ё/g,'е');
  if(!/^[а-я]{3,}$/u.test(value)||!value.startsWith(initial)||stop.has(value)||isAnswerDerivative(word,value))return;
  if(score>(ranked.get(value)?.score||0))ranked.set(value,{score,source});
 };
 for(const h of playable[normalize(word)]?.[initial]||[])add(h,110,'dictionary');
 for(const h of curated[normalize(word)]||[])add(h,100,'dictionary');
 // Wiktionary's synonym section is lexicographic evidence rather than coincidental text.
 try{
  const data=await wikiFetch('ru.wiktionary.org',{action:'parse',format:'json',page:word,prop:'wikitext'});
  const raw=data.parse?.wikitext?.['*']||'';
  const lines=raw.split('\n');
  let active=false;
  for(const line of lines){
   if(/^={2,6}\s*(синонимы|близкие по значению слова)\s*={2,6}/i.test(line)){active=true;continue}
   if(active&&/^={2,6}/.test(line))break;
   if(active){
    for(const match of line.matchAll(/\[\[([^\]|#]+)(?:\|[^\]]+)?\]\]/g))add(match[1],95,'synonyms');
   }
  }
 }catch(e){console.warn('Wiktionary unavailable:',e.message)}
 // Wikipedia: only directly linked concepts explicitly mentioned in the target article introduction.
 try{
  const data=await wikiFetch('ru.wikipedia.org',{action:'query',format:'json',redirects:'1',prop:'extracts|links',explaintext:'1',exintro:'1',pllimit:'max',titles:word});
  const page=Object.values(data.query?.pages||{}).find(p=>!p.missing);
  if(page){
   const intro=normalize(page.extract||'');
   const linked=(page.links||[]).filter(p=>p.ns===0&&p.title);
   for(const item of linked){
    const title=normalize(item.title.replace(/\s*\([^)]*\)/g,'').trim());
    if(/^[а-я]{3,}$/u.test(title)&&intro.includes(title))add(title,65,'wikipedia');
   }
  }
 }catch(e){console.warn('Wikipedia unavailable:',e.message)}
 const result=[...ranked].filter(([,meta])=>meta.score>=90).sort((a,b)=>b[1].score-a[1].score).slice(0,12).map(([word,meta])=>detailed?{word,source:meta.source}:word);
 hintCache.set(key,result);if(hintCache.size>3000)hintCache.delete(hintCache.keys().next().value);
 return result;
}

const playable={"кошка":{"п":["пушистая","питомец","прыгает","погладить"],"м":["мурлычет","мяукает","мышеловка"]},"собака":{"п":["пёс","поводок","прогулка","порода"],"л":["лает","лапа","любимец"]},"ракета":{"к":["космос","космонавт","корабль","кабина","керосин"],"п":["полет","планета","пуск"]},"красота":{"о":["очарование","обаяние","облик","ослепительная"],"п":["прекрасная","привлекательность","прелесть"]},"обед":{"к":["кушать","кухня","котлета","кафе","компот"],"п":["пища","поесть","полдень"]},"деньги":{"б":["банк","богатство","бумажные","бюджет"],"к":["кошелёк","купюра","капитал","касса"],"п":["платить","покупка","прибыль"]},"море":{"в":["волны","вода","водоросли"],"п":["пляж","песок","плавать"]},"солнце":{"л":["лучи","лето"],"т":["тепло","тёплый"]},"дождь":{"к":["капли","капает","капюшон"],"м":["мокрый","моросит"]},"книга":{"п":["писатель","повесть","переплёт","прочитать"],"с":["страница","сюжет","слова"]},"самолёт":{"п":["пилот","полёт","пассажир","посадка"],"к":["крылья","кабина"]},"машина":{"п":["поездка","пассажир","парковка","педаль"],"к":["колёса","кузов","ключ"]},"школа":{"у":["урок","учитель","учебник","ученики"],"к":["класс","каникулы","контрольная"]},"телефон":{"з":["звонок","звонить"],"м":["мобильный","мессенджер","микрофон"]},"яблоко":{"к":["круглое","кислое","красное"],"п":["плод","пирог"]},"пицца":{"к":["корочка","круглая","колбаса"],"с":["сыр","соус"]},"торт":{"к":["крем","коржи","кондитер"],"п":["праздник","подарок"]},"велосипед":{"к":["колёса","крутить","кататься"],"п":["педали","прогулка"]},"корабль":{"к":["капитан","каюта","курс"],"п":["парус","порт","плавание"]},"рыба":{"п":["плавник","пруд","плавать","поймать"],"в":["вода","водоём"]},"лес":{"д":["деревья","дикий","дятел"],"г":["грибы","густой"]},"зима":{"с":["снег","сугробы","санки"],"м":["мороз","метель"]},"лето":{"с":["солнце","сезон"],"п":["пляж","плавать","путешествие"]},"кофе":{"б":["бодрит","бариста"],"к":["кофейня","кружка","кофеин"]},"музыка":{"п":["песня","петь","пианино"],"м":["мелодия","музыкант","микрофон"]},"котёнок":{"м":["мяукает","маленький","мурлычет"],"п":["пушистый","питомец"]},"замок":{"к":["ключ","крепость","король"],"д":["дверь","дворец"]},"подарок":{"п":["праздник","поздравление","приятный"],"с":["сюрприз"]},"огонь":{"п":["пламя","пожар","пылает"],"г":["горит","горячий"]},"луна":{"н":["ночь","небо"],"к":["космос","кратеры"]},"пчела":{"м":["мёд","мохнатая"],"у":["улей","укус"]},"медведь":{"б":["бурый","берлога"],"м":["мёд","мохнатый"]},"компьютер":{"к":["клавиатура","курсор","кнопка"],"м":["монитор","мышка"]},"банан":{"ж":["желтый"],"к":["кожура","кривой"]},"дерево":{"л":["листья","лес"],"к":["кора","корни","крона"]},"снег":{"б":["белый"],"м":["мороз","метель"],"с":["сугробы","снежинка"]},"часы":{"в":["время"],"м":["минуты","механизм"],"с":["секунды","стрелки"]},"зеркало":{"о":["отражение","отражает"],"с":["стекло","смотреть"]},"космос":{"п":["планеты","полёт","пространство"],"к":["космонавт","корабль","комета"]},"река":{"в":["вода","водоём"],"п":["поток","плавание"]},"цветок":{"л":["лепестки","листья"],"б":["букет","бутон"]},"молоко":{"к":["корова","кальций"],"б":["белое","бутылка"]},"хлеб":{"б":["булка","батон"],"п":["пекарня","печь"]},"суп":{"к":["кастрюля","кипит","картошка"],"л":["ложка","лапша"]},"автобус":{"п":["пассажиры","проезд","проездной"],"о":["остановка","общественный"]},"планета":{"к":["космос","круглая"],"о":["орбита"]},"птица":{"к":["крылья","клюв"],"п":["перья","полёт"]},"слон":{"б":["большой","бивни"],"х":["хобот"]},"лев":{"г":["грива","грозный"],"к":["король","когти"]},"мороженое":{"л":["ледяное","лакомство"],"с":["сладкое","сливочное"]},"дом":{"к":["крыша","комнаты","кухня"],"с":["стены","спальня"]},"машинист":{"п":["поезд","пассажиры"],"к":["кабина"]},"лук":{"о":["овощ","острый"],"с":["слёзы","салат"]}};
const playablePairs=Object.entries(playable).flatMap(([word,byLetter])=>Object.entries(byLetter).filter(([,h])=>h.length>=2).map(([letter,hints])=>({word,letter:letter.toUpperCase(),hints})));

let groqModelCache=null;
async function availableGroqModel(){
 if(process.env.GROQ_MODEL)return process.env.GROQ_MODEL;
 if(groqModelCache)return groqModelCache;
 const response=await fetch('https://api.groq.com/openai/v1/models',{headers:{Authorization:'Bearer '+process.env.GROQ_API_KEY},signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw Error('Groq models '+response.status+' '+(await response.text()).slice(0,300));
 const data=await response.json();
 const ids=(data.data||[]).map(m=>m.id).filter(Boolean);
 const preferred=['llama-3.3-70b-versatile','llama-3.1-8b-instant','meta-llama/llama-4-scout-17b-16e-instruct','openai/gpt-oss-20b','openai/gpt-oss-120b'];
 const chosen=preferred.find(id=>ids.includes(id))||ids.find(id=>/llama|gpt-oss|qwen/i.test(id)&&!/guard|whisper|tts|vision|compound/i.test(id));
 if(!chosen)throw Error('No suitable Groq chat model available; IDs: '+ids.join(',').slice(0,400));
 groqModelCache=chosen;
 console.info('Groq selected model:',chosen);
 return chosen;
}
const aiCache=new Map();
const aiPending=new Map();
async function aiHints(word,letter){
 const key=normalize(word)+'|'+normalize(letter);
 if(aiCache.has(key))return aiCache.get(key);
 if(aiPending.has(key))return aiPending.get(key);
 const pending=generateAiHints(word,letter).finally(()=>aiPending.delete(key));
 aiPending.set(key,pending);
 return pending;
}
async function generateAiHints(word,letter){
 const key=normalize(word)+'|'+normalize(letter);
 if(aiCache.has(key))return aiCache.get(key);
 if(!process.env.GROQ_API_KEY)return [];
 const prompt='Слово: '+word+'. Буква: '+letter+'. Придумай 4–7 точных подсказок для русской игры. Только ОДНО слово на букву '+letter+' в каждой подсказке. Нужны сильные прямые связи: отличительный признак, часть, действие, назначение, известная ассоциация. Не предлагай общую среду или слова, подходящие к сотням других предметов; избегай случайных ассоциаций и выдуманных слов. Никаких однокоренных слов с ответом. Лучше 3 точных, чем 7 слабых. Ответ строго JSON: {"hints":["слово"]}';
 try{
  const model=await availableGroqModel();
  const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+process.env.GROQ_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model,messages:[{role:'system',content:'Return valid JSON only. Russian language.'},{role:'user',content:prompt}],temperature:0.35,max_completion_tokens:650,...(/gpt-oss/.test(model)?{reasoning_effort:'low'}:{})}),signal:AbortSignal.timeout(15000)});
  if(!r.ok){const detail=(await r.text()).slice(0,500);throw Error('Groq status '+r.status+' '+detail)}
  const data=await r.json();
  console.info('Groq token usage:',JSON.stringify({model,prompt_tokens:data.usage?.prompt_tokens,completion_tokens:data.usage?.completion_tokens,total_tokens:data.usage?.total_tokens,prompt_time:data.usage?.prompt_time,completion_time:data.usage?.completion_time}));
  const choice=data.choices?.[0]||{};const raw=String(choice.message?.content||'');if(!raw)console.warn('Groq empty content:',JSON.stringify({model,finish_reason:choice.finish_reason,usage:data.usage,reasoningLength:String(choice.message?.reasoning||'').length}));const match=raw.match(/\{[\s\S]*\}/);const parsed=JSON.parse(match?.[0]||'{}');
  const clean=[...new Set((Array.isArray(parsed.hints)?parsed.hints:[]).map(x=>normalize(x).trim()))].filter(x=>/^[а-яё]{3,}$/u.test(x)&&x.startsWith(normalize(letter))&&!stop.has(x)&&!isAnswerDerivative(word,x)).slice(0,10);
  console.info('Groq hint count:',clean.length,'word:',word,'letter:',letter,'responseLength:',raw.length,'sample:',raw.slice(0,160));if(clean.length)aiCache.set(key,clean);
  if(aiCache.size>1000)aiCache.delete(aiCache.keys().next().value);
  return clean;
 }catch(e){console.warn('Groq hints failed:',e.message);return []}
}

const pick=a=>a[Math.floor(Math.random()*a.length)];
const code=()=>Math.random().toString(36).slice(2,7).toUpperCase();
const view=r=>({code:r.code,host:r.host,players:[...r.players.values()].map(({id,name,score,online})=>({id,name,score,online})),round:r.round?{speaker:r.round.speaker,letter:r.round.letter,started:r.round.started,seconds:r.round.seconds,done:r.round.done,word:r.round.done?r.round.word:null}:null,history:r.history.slice(-12)});
const publish=r=>io.to(r.code).emit('room',view(r));
const reply=(cb,obj)=>typeof cb==='function'&&cb(obj);
io.on('connection',s=>{
s.on('join',({room,name,playerId}={},cb)=>{name=String(name||'Игрок').trim().slice(0,24)||'Игрок';let r;if(room){r=rooms.get(String(room).toUpperCase());if(!r)return reply(cb,{error:'Комната не найдена. Создай новую или попроси новый код.'});}else{let c=code();while(rooms.has(c))c=code();r={code:c,players:new Map(),host:null,round:null,history:[]};rooms.set(c,r)}
let id=String(playerId||'').slice(0,80);if(!id||!r.players.has(id))id=Math.random().toString(36).slice(2)+Date.now().toString(36);
const p=r.players.get(id)||{id,name,score:0};p.name=name;p.online=true;p.socket=s.id;r.players.set(id,p);if(!r.host)r.host=id;s.data={room:r.code,id};s.join(r.code);reply(cb,{ok:true,id,code:r.code});publish(r)});
s.on('start',({word,letter,seconds,speaker}={},cb)=>{const r=rooms.get(s.data?.room);if(!r||r.host!==s.data.id)return reply(cb,{error:'Только ведущий начинает раунд'});const typed=String(word||'').trim().toLowerCase().slice(0,70);let l=String(letter||'').toUpperCase();const options=playablePairs.filter(p=>(!typed||p.word===typed)&&(!letters.includes(l)||p.letter===l));const chosen=options.length?pick(options):null;const w=typed||chosen?.word||pick(Object.keys(playable));if(!letters.includes(l))l=chosen?.letter||pick(Object.keys(playable[w]||{})).toUpperCase();const sp=r.players.has(speaker)?speaker:pick([...r.players.keys()]);r.round={word:w,letter:l,speaker:sp,seconds:Math.max(30,Math.min(300,Number(seconds)||90)),started:Date.now(),done:false};publish(r);reply(cb,{ok:true})});
s.on('reveal',(_,cb)=>{const r=rooms.get(s.data?.room);if(!r||!r.round)return reply(cb,{error:'Нет раунда'});if(s.data.id!==r.host&&s.data.id!==r.round.speaker)return reply(cb,{error:'Недостаточно прав'});s.emit('secret',{word:r.round.word,letter:r.round.letter,hints:[],loading:false});reply(cb,{ok:true})});
// Collapse obvious inflections and closely related hint variants without merging unrelated words.
const hintFamilyOverrides=new Map(Object.entries({
 'пух':'пушистость','пушок':'пушистость','пушистый':'пушистость','пушистая':'пушистость',
 'котел':'котел','котелок':'котел','кастрюля':'посуда_варка',
 'водоем':'водоем','водоемы':'водоем'
}));
function hintFamily(value){
 const w=normalize(value).replace(/[^а-я]/g,'');
 if(hintFamilyOverrides.has(w))return hintFamilyOverrides.get(w);
 return w.replace(/(ыми|ими|ого|ему|ому|ыми|ая|яя|ое|ее|ые|ие|ый|ий|ой|ую|юю|ых|их|ам|ям|ами|ями|ов|ев|ей|а|я|ы|и|у|ю|е|о)$/u,'');
}
function mergeHintSources(ai,dictionary,answer){
 const result=[],seen=new Set();
 for(const item of [...ai.map(word=>({word,source:'ai'})),...dictionary]){
  const w=normalize(item.word);
  const family=hintFamily(w);
  if(!w||isAnswerDerivative(answer,w)||seen.has(w)||result.some(existing=>{
   const other=hintFamily(existing.word);
   return family===other||(family.length>=5&&other.length>=5&&(family.startsWith(other)||other.startsWith(family)));
  }))continue;
  seen.add(w);result.push(item);
  if(result.length===10)break;
 }
 return result;
}
s.on('hints',async(_,cb)=>{const r=rooms.get(s.data?.room);if(!r||!r.round)return reply(cb,{error:'Нет раунда'});if(s.data.id!==r.host&&s.data.id!==r.round.speaker)return reply(cb,{error:'Недостаточно прав'});const {word,letter,started}=r.round;reply(cb,{ok:true});s.emit('hintResult',{loading:true,hints:[]});const generated=await aiHints(word,letter);const dictionary=await semanticHints(word,letter,false,true);const found=mergeHintSources(generated,dictionary,word);if(s.connected&&r.round?.started===started)s.emit('hintResult',{loading:false,hints:found})});

s.on('finish',({winner}={},cb)=>{const r=rooms.get(s.data?.room);if(!r||!r.round||r.round.done)return reply(cb,{error:'Раунд завершён'});if(s.data.id!==r.host&&s.data.id!==r.round.speaker)return reply(cb,{error:'Недостаточно прав'});if(r.players.has(winner))r.players.get(winner).score++;r.round.done=true;r.history.push({word:r.round.word,letter:r.round.letter,winner:r.players.get(winner)?.name||'Не угадали'});publish(r);reply(cb,{ok:true})});
s.on('disconnect',()=>{const r=rooms.get(s.data?.room),p=r?.players.get(s.data.id);if(p&&p.socket===s.id){p.online=false;publish(r)}})
});
app.get('/health',(_,res)=>res.json({ok:true,words:words.length,dictionaryReady:words.length>=20000,easyNouns:easyWords.length,playablePairs:playablePairs.length,rooms:rooms.size,aiConfigured:!!process.env.GROQ_API_KEY}));
http.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('Ready'));