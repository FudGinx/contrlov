import {createServer} from 'node:http';import {DatabaseSync} from 'node:sqlite';import {mkdirSync} from 'node:fs';import {fileURLToPath} from 'node:url';import {networkInterfaces} from 'node:os';
mkdirSync(new URL('../.local/',import.meta.url),{recursive:true});const db=new DatabaseSync(fileURLToPath(new URL('../.local/rooms.sqlite',import.meta.url)));db.exec('CREATE TABLE IF NOT EXISTS rooms (code TEXT PRIMARY KEY, state TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 0, updated INTEGER NOT NULL)');
const DB={prepare(sql){
 return {bind(...args){
  return {
   async first(){return db.prepare(sql).get(...args)||null;},
   async run(){const r=db.prepare(sql).run(...args);return {meta:{changes:r.changes}};}
  };
 }};
}};
const {default:worker}=await import('../dist/server/index.js');
const port=Number(process.env.PORT||4173);const server=createServer(async(req,res)=>{try{const chunks=[];for await(const c of req)chunks.push(c);const init={method:req.method,headers:req.headers};if(!['GET','HEAD'].includes(req.method))init.body=Buffer.concat(chunks);const proto=req.headers['x-forwarded-proto']==='https'?'https':'http';const r=await worker.fetch(new Request(proto+'://'+req.headers.host+req.url,init),{DB});res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()));}catch(e){res.writeHead(500);res.end(e.message);}});server.listen(port,'0.0.0.0',()=>{console.log('Local: http://localhost:'+port);for(const addresses of Object.values(networkInterfaces()))for(const a of addresses||[])if(a.family==='IPv4'&&!a.internal)console.log('Phone on same Wi-Fi: http://'+a.address+':'+port);});
