import { writeFile, readFile } from 'node:fs/promises';

let data = await readFile('nodeinfo.json', 'utf8');
let parse = JSON.parse(data);

parse.node.sort((a, b) => b.stakingCoin - a.stakingCoin);

let top3Nodes = parse.node.slice(0, 3);

let randomNodeIndex = Math.floor(Math.random() * top3Nodes.length);
let selectedNode = top3Nodes[randomNodeIndex];

console.log("Selected Node's Public Key:", selectedNode.publicKey);
let pool = await readFile('mempool.json', 'utf8');
let mem = JSON.parse(pool);

let blockInfo = {
    blockNumber: 123,
    timestamp: Date.now(),
    previousBlockHash: "1a2b3c4d5e6f",
    validator: {
        publicKey: selectedNode.publicKey,
        stakingBalance: 1000, 
        validatorSignature: "3748xutab"+selectedNode.publicKey,
    },
    blockHash: "x458jdfjdfdhf",
    proofOfStake: {
        stakingReward: 2,
        stakingDifficulty: 5000,
    },
};

let blockWithTransactions = {
    blockInfo: blockInfo,
    transactions: [],
};

mem.forEach((transaction, index) => {
    let transactionInfo = {
        from: transaction.from,
        to: transaction.to,
        amount: transaction.transactionFee,
        transactionHash: `hash_${index}`,
    };
    blockWithTransactions.transactions.push(transactionInfo);
});


blockWithTransactions.blockInfo.blockHash = calculateBlockHash(blockWithTransactions.blockInfo);

let blockInfoJson = JSON.stringify(blockWithTransactions, null, 2);
await writeFile('blockInfo.json', blockInfoJson);

console.log("Block information has been written to blockInfo.json");
