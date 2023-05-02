import * as crypto from 'crypto';
import EthereumHDKey from 'ethereumjs-wallet/dist/hdkey';
import { Buffer } from 'buffer';
import * as readline from 'readline';

async function generateEthereumAddress(): Promise<{address: string, privateKey: string}> {
  const seed = crypto.randomBytes(16).toString('hex');
  const masterKey = EthereumHDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
  const addrNode = masterKey.derivePath("m/44'/60'/0'/0/0");
  const privateKey = addrNode.getWallet().getPrivateKeyString().replace('0x', '');
  return { address: addrNode.getWallet().getChecksumAddressString(), privateKey };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ile kluczy chcesz wygenerować? ', async (numKeys: string) => {
  const num = parseInt(numKeys);

  if (isNaN(num) || num <= 0 || num > 1000) {
    console.log('Nieprawidłowa liczba kluczy. Wpisz liczbę od 1 do 1000.');
    rl.close();
    return;
  }

  for (let i = 0; i < num; i++) {
    const { address, privateKey } = await generateEthereumAddress();
    console.log(`Address ${i + 1}: ${address}`);
    console.log(`Private Key ${i + 1}: ${privateKey}\n`);
  }

  rl.close();
});
