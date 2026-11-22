// Flat-top hexes: the seven tiles occupy the complete board rectangle.
export const HEX_GRID={
 tileAspect:2/Math.sqrt(3),
 columns:2.5,
 rows:3,
 centers:[[50,50],[50,100/6],[80,100/3],[80,200/3],[50,500/6],[20,200/3],[20,100/3]]
};
export function hexMapLayout(width,height){
 width=Math.max(1,Number(width)||1);height=Math.max(1,Number(height)||1);
 const gap=width>=650?16:10,panelWidth=Math.min(360,Math.max(170,width*.26));
 const boardSpace=Math.max(1,width-panelWidth-gap),aspect=HEX_GRID.columns*HEX_GRID.tileAspect/HEX_GRID.rows;
 const boardWidth=Math.min(boardSpace,height*aspect),boardHeight=boardWidth/aspect;
 return {boardWidth,boardHeight,panelWidth,gap,tokenSize:Math.max(26,Math.min(72,boardWidth*.07)),labelSize:Math.max(10,Math.min(22,boardWidth*.027)),counterSize:Math.max(10,Math.min(17,boardWidth*.022))};
}
