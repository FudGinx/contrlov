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

// Semantic hints: article-linked concepts and contextual phrases, not arbitrary same-letter words.
const hintCache=new Map();
const normalize=t=>String(t||'').toLowerCase().replace(/ё/g,'е');
const commonStop=new Set('который которая которые этого также после перед между когда потому очень есть была были может можно такой такие только более менее однако поэтому несколько другие многие некоторые каждый такой самого самой своего время года года году часть место людей человек людей является представляет называется например используется имеют имеет через среди вместе внутри около примерно один два три первый второй большой большие'.split(' '));
async function semanticHints(word,letter,refresh=false){
 const key=normalize(word)+'|'+letter.toLowerCase();
 if(!refresh&&hintCache.has(key))return hintCache.get(key);
 const initial=normalize(letter),output=[];
 const add=(phrase)=>{phrase=String(phrase||'').trim().toLowerCase();if(!phrase||phrase.length>45||phrase.length<3||!/^[а-яё]+$/u.test(phrase)||!normalize(phrase).startsWith(initial)||normalize(phrase)===normalize(word)||output.some(x=>normalize(x)===normalize(phrase)))return;output.push(phrase)};
 for(const h of hints[normalize(word)]?.[initial]||[])add(h);
 const api='https://ru.wikipedia.org/w/api.php?';
 const params=obj=>api+new URLSearchParams({action:'query',format:'json',redirects:'1',...obj});
 async function wiki(url){const r=await fetch(url,{signal:AbortSignal.timeout(7500),headers:{'User-Agent':'OneLetterParty/1.1 (semantic word game)'}});if(!r.ok)throw Error('Wiki '+r.status);return r.json()}
 const terms=new Map();
 const collect=t=>{for(const token of (String(t||'').toLowerCase().match(/[а-яё]{4,}/g)||[])){if(normalize(token).startsWith(initial)&&!commonStop.has(token)&&normalize(token)!==normalize(word))terms.set(token,(terms.get(token)||0)+1)}};
 try{
  const data=await wiki(params({prop:'extracts|links',explaintext:'1',exintro:'1',pllimit:'max',titles:word}));
  const pages=Object.values(data.query?.pages||{});
  const main=pages.find(p=>!p.missing);
  if(main){
   collect(main.extract||'');
   const related=(main.links||[]).filter(p=>p.ns===0&&p.title).slice(0,100);
   for(const p of related){const title=p.title.toLowerCase().replace(/\\s*\\([^)]*\\)/g,'').trim();if(title.startsWith(initial)&&title.split(' ').length<=3)add(title)}
   const selected=related.slice(0,12).map(p=>p.title);
   if(selected.length){
    const sub=await wiki(params({prop:'extracts',explaintext:'1',exintro:'1',exchars:'650',titles:selected.join('|')}));
    for(const page of Object.values(sub.query?.pages||{}))collect(page.extract||'');
   }
  }
 }catch(e){console.warn('Semantic wiki lookup failed:',e.message)}
 for(const [token] of [...terms].sort((a,b)=>b[1]-a[1]).slice(0,16))add(token);
 const result=output.slice(0,12);hintCache.set(key,result);if(hintCache.size>3000)hintCache.delete(hintCache.keys().next().value);return result;
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