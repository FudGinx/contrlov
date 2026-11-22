export function lessonPreviewSize(width,height){
 const compact=height<=330,panel=Math.max(compact?215:225,Math.min(compact?300:330,width*(compact?.34:.32))),padding=compact?8:15,gap=compact?5:10;
 const available=Math.max(220,width-panel-60),cardWidth=Math.max(40,Math.min(138,(available-padding*2-gap*4)/5,(height-115)*.73));
 return {cardWidth,cardHeight:cardWidth/.73,gap,padding,width:cardWidth*5+gap*4+padding*2,panel};
}
export function lessonClipRect(rect,viewport,clips=[]){
 let left=Math.max(0,rect.left??rect.x),top=Math.max(0,rect.top??rect.y),right=Math.min(viewport.width,rect.right??((rect.left??rect.x)+rect.width)),bottom=Math.min(viewport.height,rect.bottom??((rect.top??rect.y)+rect.height));
 for(const c of clips){left=Math.max(left,c.left??c.x);top=Math.max(top,c.top??c.y);right=Math.min(right,c.right??((c.left??c.x)+c.width));bottom=Math.min(bottom,c.bottom??((c.top??c.y)+c.height));}
 return right<=left||bottom<=top?null:{x:left,y:top,left,top,right,bottom,width:right-left,height:bottom-top};
}
export function lessonPanelPosition(anchor,width,height,viewport,avoid=[]){
 const gap=14,margin=8,maxX=Math.max(margin,viewport.width-width-margin),maxY=Math.max(margin,viewport.height-height-margin);
 if(!anchor)return {left:Math.max(margin,(viewport.width-width)/2),top:margin,side:'none'};
 const cx=anchor.x+anchor.width/2,cy=anchor.y+anchor.height/2,clamp=(n,max)=>Math.max(margin,Math.min(max,n));
 const candidates=[{x:cx-width/2,y:anchor.bottom+gap,side:'below'},{x:anchor.right+gap,y:cy-height/2,side:'right'},{x:anchor.x-width-gap,y:cy-height/2,side:'left'},{x:cx-width/2,y:anchor.y-height-gap,side:'above'}].map(c=>({...c,left:clamp(c.x,maxX),top:clamp(c.y,maxY)}));
 const small=avoid.filter(r=>r.width*r.height<viewport.width*viewport.height*.35);
 const score=c=>small.reduce((sum,r)=>sum+Math.max(0,Math.min(c.left+width,r.right)-Math.max(c.left,r.x))*Math.max(0,Math.min(c.top+height,r.bottom)-Math.max(c.top,r.y)),0)*100+Math.abs(c.left-c.x)*3+Math.abs(c.top-c.y)*3+(c.side==='below'?0:40);
 candidates.sort((a,b)=>score(a)-score(b));return candidates[0];
}
export function portraitViewBox(columns,rows,index){return {viewBox:[index%columns*100,Math.floor(index/columns)*100,100,100].join(' '),width:columns*100,height:rows*100};}
