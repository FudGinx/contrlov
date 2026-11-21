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
async function semanticHints(word,letter,refresh=false){
 const key=normalize(word)+'|'+normalize(letter);
 if(!refresh&&hintCache.has(key))return hintCache.get(key);
 const initial=normalize(letter),ranked=new Map();
 const add=(raw,score)=>{
  const value=String(raw||'').toLowerCase().trim().replace(/ё/g,'е');
  if(!/^[а-я]{3,}$/u.test(value)||!value.startsWith(initial)||stop.has(value)||value===normalize(word))return;
  ranked.set(value,Math.max(score,ranked.get(value)||0));
 };
 for(const h of curated[normalize(word)]||[])add(h,100);
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
    for(const match of line.matchAll(/\[\[([^\]|#]+)(?:\|[^\]]+)?\]\]/g))add(match[1],95);
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
    if(/^[а-я]{3,}$/u.test(title)&&intro.includes(title))add(title,65);
   }
  }
 }catch(e){console.warn('Wikipedia unavailable:',e.message)}
 const result=[...ranked].sort((a,b)=>b[1]-a[1]).slice(0,12).map(x=>x[0]);
 hintCache.set(key,result);if(hintCache.size>3000)hintCache.delete(hintCache.keys().next().value);
 return result;
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
s.on('start',({word,letter,seconds,speaker}={},cb)=>{const r=rooms.get(s.data?.room);if(!r||r.host!==s.data.id)return reply(cb,{error:'Только ведущий начинает раунд'});const w=String(word||'').trim().toLowerCase().slice(0,70)||pick(easyWords);let l=String(letter||'').toUpperCase();if(!letters.includes(l))l=pick(letters);const sp=r.players.has(speaker)?speaker:pick([...r.players.keys()]);r.round={word:w,letter:l,speaker:sp,seconds:Math.max(30,Math.min(300,Number(seconds)||90)),started:Date.now(),done:false};publish(r);reply(cb,{ok:true})});
s.on('reveal',(_,cb)=>{const r=rooms.get(s.data?.room);if(!r||!r.round)return reply(cb,{error:'Нет раунда'});if(s.data.id!==r.host&&s.data.id!==r.round.speaker)return reply(cb,{error:'Недостаточно прав'});s.emit('secret',{word:r.round.word,letter:r.round.letter,hints:[],loading:false});reply(cb,{ok:true})});
s.on('hints',async(_,cb)=>{const r=rooms.get(s.data?.room);if(!r||!r.round)return reply(cb,{error:'Нет раунда'});if(s.data.id!==r.host&&s.data.id!==r.round.speaker)return reply(cb,{error:'Недостаточно прав'});const {word,letter,started}=r.round;reply(cb,{ok:true});s.emit('hintResult',{loading:true,hints:[]});const found=await semanticHints(word,letter,true);if(s.connected&&r.round?.started===started)s.emit('hintResult',{loading:false,hints:found})});

s.on('finish',({winner}={},cb)=>{const r=rooms.get(s.data?.room);if(!r||!r.round||r.round.done)return reply(cb,{error:'Раунд завершён'});if(s.data.id!==r.host&&s.data.id!==r.round.speaker)return reply(cb,{error:'Недостаточно прав'});if(r.players.has(winner))r.players.get(winner).score++;r.round.done=true;r.history.push({word:r.round.word,letter:r.round.letter,winner:r.players.get(winner)?.name||'Не угадали'});publish(r);reply(cb,{ok:true})});
s.on('disconnect',()=>{const r=rooms.get(s.data?.room),p=r?.players.get(s.data.id);if(p&&p.socket===s.id){p.online=false;publish(r)}})
});
app.get('/health',(_,res)=>res.json({ok:true,words:words.length,dictionaryReady:words.length>=20000,easyNouns:easyWords.length,rooms:rooms.size}));
http.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('Ready'));