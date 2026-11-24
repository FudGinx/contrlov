import test from'node:test';import assert from'node:assert/strict';import{makeRoom,makePlayer,action,CHARACTERS,brewScore}from'../src/engine.js';
let serial=0;const card=(color,effect=null)=>({id:'sequence-'+(++serial),type:'ingredient',name:color,color,effect,points:1,negative:-2});
function room(colors=['black','purple','blue']){const p=makePlayer('A','a'),q=makePlayer('B','b'),s=makeRoom('ABCDEF',p);s.players.push(q);s.status='playing';s.phase='main';s.turnData={actionUsed:false,allowance:0};p.character='znakhar';p.recipes=[{id:'r',colors,value:5}];p.current='r';return{s,p,q};}

test('Znakhar: own ingredients without an effect score +1 and grant no continuation',()=>{
 const {s,p}=room(['green','blue','red']);
 p.hand=[{...card('green'),points:2},card('blue'),card('red')];
 action(s,p.id,{type:'play',card:p.hand[0].id});
 assert.equal(s.turnData.allowance,0);
 assert.throws(()=>action(s,p.id,{type:'play',card:p.hand[0].id}));
 assert.equal(brewScore(p),3);
});
test('Znakhar bonus is multiplied, effect cards get no bonus',()=>{
 const {s,p}=room(['green','blue']);
 p.brew=[{id:'amp',card:{...card('green','amplify'),points:0},slot:0,attacks:[],amplifierCharges:3}];
 p.hand=[{...card('blue'),points:3}];s.turnData={actionUsed:false,allowance:0};
 action(s,p.id,{type:'play',card:p.hand[0].id});
 assert.equal(p.brew.at(-1).multiplier,6);assert.equal(brewScore(p),24);
 const t=room(['green']);t.p.hand=[card('green','draw')];action(t.s,t.p.id,{type:'play',card:t.p.hand[0].id});assert.equal(brewScore(t.p),1);
});
