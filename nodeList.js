import { writeFile,readFile } from 'node:fs/promises';
let data=await readFile('nodeinfo.json','utf8');
let parse=JSON.parse(data);

parse.node.sort((a, b)=> b.stakingCoin - a.stakingCoin);


let top3Nodes = parse.node.slice(0, 3);


let randomNodes = Math.floor(Math.random()*top3Nodes.length);
let  selectedNode= top3Nodes[randomNodes];

console.log("Selected Node's Public Key:",selectedNode.publicKey);
let pool=await readFile('mempool.json','utf8');
let mem=JSON.parse(pool);

let transactionInfo = [];

mem.forEach((transaction, index) => {
    let info = {
        transactionNumber: index + 1,
        from: transaction.from,
        to: transaction.to,
        amount: transaction.transactionFee,
    };
    transactionInfo.push(info);
});

// Write the structured transaction information into a JSON file
let transactionInfoJson = JSON.stringify(transactionInfo, null, 2);
await writeFile('transactionInfo.json', transactionInfoJson);

console.log("Transaction information has been written to transactionInfo.json");