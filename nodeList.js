import { writeFile,readFile } from 'node:fs/promises';
let obj={
     node:[]
};
obj.node.push({publicKey:"hfdfdfu7ffrfr85885f7d8d78d",stakingCoin:54});
obj.node.push({publicKey:"hfdfdfurhrjrjhfruu48475",stakingCoin:55});
obj.node.push({publicKey:"hfdfdfu7f7d8d75756587568d",stakingCoin:56});
obj.node.push({publicKey:"hfdfdfu7f7d8d78d75864576",stakingCoin:57});
obj.node.push({publicKey:"hfdfdfu7f7d8d78djfdj485485",stakingCoin:58});
let json=JSON.stringify(obj, null, 2);
//writeFile('nodeinfo.json',json);
let data=await readFile('nodeinfo.json','utf8');
let parse=JSON.parse(data);
//console.log(parse);
// let filteredNodes = parse.node.filter(node => node.stakingCoin > 55);
parse.node.sort(function(a, b){
     return b.stakingCoin - a.stakingCoin} 
);

// Get the top 3 nodes
let top3Nodes = parse.node.slice(0, 3);

console.log(top3Nodes);