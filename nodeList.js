import { writeFile, readFile } from 'node:fs/promises';
let data = await readFile('nodeinfo.json', 'utf8');
let parse = JSON.parse(data);

parse.node.sort((a, b) => b.stakingCoin - a.stakingCoin);


let top3Nodes = parse.node.slice(0, 3);


let randomNodes = Math.floor(Math.random() * top3Nodes.length);
let selectedNode = top3Nodes[randomNodes];

console.log("Selected Node's Public Key:", selectedNode.publicKey);
let pool = await readFile('mempool.json', 'utf8');
let mem = JSON.parse(pool);



let blockInfo = {
     blockhash: "474574hdfdhfdjfdjfh",
     timestamp: Date.now(),
     previousblockhash: "udfhfdhfd8347374380dffdfdjddnvvncvj",
     validatorPublicKey: selectedNode.publicKey,
};
let blockWithTransactions = {
     blockInfo: blockInfo,
     transactions: [],
};


mem.forEach((transaction, index) => {
     let transactionInfo = {
          transactionNumber: index + 1,
          from: transaction.from,
          to: transaction.to,
          amount: transaction.transactionFee,
     };
     blockWithTransactions.transactions.push(transactionInfo);
});


let blockInfoJson = JSON.stringify(blockWithTransactions, null, 2);
await writeFile('blockInfo.json', blockInfoJson);

console.log("Block information has been written");