import{publicKey} from"./nodeList.js";
let nodeArray=[10];
for(let i=0;i<10;i++){
    nodeArray[i]=publicKey[i];
}
for(let i=0;i<10;i++){
    console.log("Public node",[i],":",nodeArray[i]);
}