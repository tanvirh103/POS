import { writeFile,readFile } from 'node:fs/promises';
let obj={
     node:[]
};
obj.node.push({publicKey:"hfdfdfu7f7d8d78d",stakingCoin:54});
obj.node.push({publicKey:"hfdfdfu7f7d8d78d",stakingCoin:55});
obj.node.push({publicKey:"hfdfdfu7f7d8d78d",stakingCoin:56});
obj.node.push({publicKey:"hfdfdfu7f7d8d78d",stakingCoin:57});
obj.node.push({publicKey:"hfdfdfu7f7d8d78d",stakingCoin:58});
let json=JSON.stringify(obj, null, 2);
writeFile('nodeinfo.json',json);
let data=await readFile('nodeinfo.json','utf8');
let parse=JSON.parse(data);
console.log(parse);
