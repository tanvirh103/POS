import { writeFile, readFile } from 'fs/promises';
import crypto from 'crypto';

const buildMerkleTree = transactions => {
  if (transactions.length === 0) {
    return null;
  }

  const tree = transactions.map(transaction =>
    crypto.createHash('sha256').update(transaction.transactionHash).digest('hex')
  );

  while (tree.length > 1) {
    const level = [];
    for (let i = 0; i < tree.length; i += 2) {
      const left = tree[i];
      const right = i + 1 < tree.length ? tree[i + 1] : '';
      const combined = left + right;
      const hash = crypto.createHash('sha256').update(combined).digest('hex');
      level.push(hash);
    }
    tree.length = 0;
    tree.push(...level);
  }

  return tree[0];
};

const generateBlockInfo = async () => {
  try {
    const data = await readFile('nodeinfo.json', 'utf8');
    const parse = JSON.parse(data);
    parse.node.sort((a, b) => b.stakingCoin - a.stakingCoin);
    const top3Nodes = parse.node.slice(0, 3);
    const randomNodeIndex = Math.floor(Math.random() * top3Nodes.length);
    const selectedNode = top3Nodes[randomNodeIndex];

    console.log("Selected Node's Public Key:", selectedNode.publicKey);
    const pool = await readFile('mempool.json', 'utf8');
    const mem = JSON.parse(pool);

    const blockWithTransactions = {
      blockInfo: {
        blockNumber: 123,
        timestamp: Date.now(),
        previousBlockHash: '1a2b3c4d5e6f',
        validator: {
          publicKey: selectedNode.publicKey,
          stakingBalance: selectedNode.stakingCoin,
          validatorSignature: '3748xutab' + selectedNode.publicKey,
        },
        proofOfStake: {
          stakingReward: 2,
          stakingDifficulty: 5000,
        },
      },
      transactions: [],
    };

    mem.forEach((transaction, index) => {
      const transactionHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(transaction))
        .digest('hex');

      const transactionInfo = {
        from: transaction.from,
        to: transaction.to,
        amount: transaction.transactionFee,
        transactionHash,
      };
      blockWithTransactions.transactions.push(transactionInfo);
    });

    const merkleRoot = buildMerkleTree(blockWithTransactions.transactions);
    console.log('Merkle Root:', merkleRoot);
    blockWithTransactions.blockInfo.merkleRoot = merkleRoot;

    const blockHash = crypto.createHash('sha256').update(JSON.stringify(blockWithTransactions.blockInfo)).digest('hex');
    console.log('Block Hash:', blockHash);

    blockWithTransactions.blockInfo.blockHash = blockHash;

    const blockInfoJson = JSON.stringify(blockWithTransactions, null, 2);
    await writeFile('blockInfo.json', blockInfoJson);

    console.log('Block information has been written');
  } catch (error) {
    console.error('Error:', error);
  }
};

generateBlockInfo();