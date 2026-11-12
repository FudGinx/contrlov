import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {webcrypto} from 'node:crypto';
test('standalone HTML starts without network, creates bot game and reaches playable hand',async()=>{
 const html=fs.readFileSync(new URL('../dist/Koren_Razdora_Offline.html',import.meta.url),'utf8');
 const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);assert.equal(scripts.length,3);
 const nodes=new Map(['#app','#modal-root','#toast'].map(k=>[k,{innerHTML:'',textContent:'',classList:{add(){},remove(){}},querySelector(){return null;}}]));
 const values=new Map();let clock=Date.now();
 const ctx={console,Response,Request,URL,URLSearchParams,crypto:webcrypto,Map,Math,Date:class extends Date{static now(){return clock;}},setTimeout(){return 0;},clearTimeout(){},navigator:{vibrate(){}},location:{search:'',origin:'null'},localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)},document:{querySelector:s=>nodes.get(s)||null,addEventListener(){},body:{classList:{add(){}}}}};ctx.window=ctx;vm.createContext(ctx);for(const source of scripts)vm.runInContext(source,ctx);assert.ok(nodes.get('#app').innerHTML.includes('Корінь розбрату'));assert.ok(/data:image\/(png|webp);base64,/.test(html));
 let r=await ctx.fetch('/api/rooms',{method:'POST',body:JSON.stringify({name:'Offline',mode:'bots',bots:2})});assert.equal(r.status,200);const created=await r.json();const headers={Authorization:'Bearer '+created.token};const path='/api/rooms/'+created.state.code;let state=created.state;
 r=await ctx.fetch(path+'/action',{headers,method:'POST',body:JSON.stringify({version:state.version,action:{type:'order',order:state.market[0].id}})});state=await r.json();
 for(let i=0;i<8&&state.phase==='draft';i++){clock+=1000;state=await (await ctx.fetch(path,{headers})).json();}
 assert.equal(state.phase,'main');assert.equal(state.players[0].hand.length,8+(state.players[0].character==='chumak'?1:0));ctx.__smokeState=state;vm.runInContext('applyState(__smokeState)',ctx);assert.ok(nodes.get('#app').innerHTML.includes('ВАША РУКА'));assert.ok(nodes.get('#app').innerHTML.includes('Ваш хід'));
});
