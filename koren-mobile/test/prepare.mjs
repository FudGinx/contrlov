import{CHARACTERS,action,botActor}from'../src/engine.js';
export function prepareCharacters(s){while(s.phase==='character'){const p=botActor(s),choices=CHARACTERS.filter(c=>!c.reserve&&!s.players.some(p=>p.character===c.id));action(s,p.id,{type:'chooseCharacter',character:choices[Math.floor(Math.random()*choices.length)].id});}}
