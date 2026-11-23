import test from 'node:test';import assert from 'node:assert/strict';
import {unitScores} from '../src/engine.js';
test('echo copying resonance counts the copied card type, not the liquid',()=>{
 const iris={id:'i',type:'ingredient',color:'blue',points:1,effect:'resonance'};
 const echo={id:'e',type:'ingredient',color:'purple',points:0,effect:'echo'};
 const att=(id,n)=>({card:{id,type:'ingredient',color:'blue',negative:n},cancelled:false});
 const p={character:null,brew:[{id:1,card:iris,attacks:[att('c',-2),att('r',-3)]},{id:2,card:echo,attacks:[],echoResonance:true,echoSource:{id:'i',name:'Ірис',effect:'resonance',color:'blue'}}]};
 const s=unitScores(p);
 assert.deepEqual(s[1],{own:3,bad:-5,total:-2});
 assert.equal(s[2].own,3);
});
