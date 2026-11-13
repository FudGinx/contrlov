import test from 'node:test';import assert from 'node:assert/strict';import {DatabaseSync} from 'node:sqlite';import worker from '../src/server.js';
function env(){
 const db=new DatabaseSync(':memory:');
 db.exec('CREATE TABLE rooms(code TEXT PRIMARY KEY,state TEXT,version INTEGER,updated INTEGER)');
 const DB={prepare(sql){
   return {bind(...args){
     return {
       async first(){return db.prepare(sql).get(...args)||null;},
       async run(){return {meta:{changes:db.prepare(sql).run(...args).changes}};}
     };
   }};
 }};
 return {DB};
}
async function req(e,path,{method='GET',token,body,raw}={}){const r=await worker.fetch(new Request('https://game.example'+path,{method,headers:{...(token?{Authorization:'Bearer '+token}:{}),...(method==='POST'?{'Content-Type':'application/json'}:{})},...(method==='POST'?{body:raw??JSON.stringify(body)}:{})}),e);return {status:r.status,body:await r.json()};}
async function room(e){const r=await req(e,'/api/rooms',{method:'POST',body:{name:'Host',mode:'online',bots:0}});assert.equal(r.status,201);return r.body;}
test('online create/join, private hands, own-turn enforcement, unauthorized request rejected',async()=>{const e=env(),h=await room(e),code=h.state.code;const joined=await req(e,'/api/rooms/'+code+'/join',{method:'POST',body:{name:'Friend'}});assert.equal(joined.status,201);const guest=joined.body;let r=await req(e,'/api/rooms/'+code,{token:h.token});assert.equal(r.body.players.length,2);const wrong=await req(e,'/api/rooms/'+code,{token:'bad'});assert.equal(wrong.status,403);r=await req(e,'/api/rooms/'+code+'/action',{method:'POST',token:h.token,body:{version:r.body.version,action:{type:'start'}}});assert.equal(r.status,200);const v=r.body;assert.ok(v.players[0].hand);assert.equal(v.players[1].hand,undefined);assert.equal(JSON.stringify(v).includes(h.token),false);const guestState=await req(e,'/api/rooms/'+code,{token:guest.token});assert.ok(guestState.body.players[1].hand);assert.equal(guestState.body.players[0].hand,undefined);const action=await req(e,'/api/rooms/'+code+'/action',{method:'POST',token:guest.token,body:{version:guestState.body.version,action:{type:'chooseCharacter',character:'mavka'}}});assert.equal(action.status,400);});
test('simultaneous writes: exactly one wins, stale action returns authoritative state',async()=>{const e=env(),h=await room(e),path='/api/rooms/'+h.state.code+'/action';const results=await Promise.all([req(e,path,{method:'POST',token:h.token,body:{version:0,action:{type:'addBot'}}}),req(e,path,{method:'POST',token:h.token,body:{version:0,action:{type:'addBot'}}})]);assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);const r=await req(e,'/api/rooms/'+h.state.code,{token:h.token});assert.equal(r.body.players.length,2);assert.equal(r.body.version,1);});
test('saved seat restores across requests and late joins / malformed payload are rejected',async()=>{const e=env(),h=await room(e),code=h.state.code;let r=await req(e,'/api/rooms/'+code+'/action',{method:'POST',token:h.token,body:{version:0,action:{type:'addBot'}}});r=await req(e,'/api/rooms/'+code+'/action',{method:'POST',token:h.token,body:{version:r.body.version,action:{type:'start'}}});const restored=await req(e,'/api/rooms/'+code,{token:h.token});assert.equal(restored.body.me,h.state.me);assert.equal(restored.body.status,'playing');const late=await req(e,'/api/rooms/'+code+'/join',{method:'POST',body:{name:'Late'}});assert.equal(late.status,409);const broken=await req(e,'/api/rooms',{method:'POST',raw:'{'});assert.equal(broken.status,400);});
