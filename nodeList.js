import pkg from 'elliptic';
const { ec: EC } = pkg;

const curve = new EC('secp256k1');

const keyPair = [10];
for (let i = 0; i < 10; i++) {
    keyPair[i] = curve.genKeyPair();
}

export const publicKey = [10]
for (let x = 0; x < 10; x++) {
    publicKey[x] = keyPair[x].getPublic('hex');
}

