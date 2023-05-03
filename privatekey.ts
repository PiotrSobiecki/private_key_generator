import * as crypto from 'crypto';
import EthereumHDKey from 'ethereumjs-wallet/dist/hdkey';
import { Buffer } from 'buffer';
import * as readline from 'readline';
import * as fs from 'fs';

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

async function askForOutput(): Promise<void> {
  const output = await new Promise<string>((resolve) => {
    rl.question('Do you want to save the addresses to a file or display them in the console? (file/console)', (output: string) => {
      resolve(output.toLowerCase());
    });
  });

  if (output === 'file') {
    const filename = await new Promise<string>((resolve) => {
      rl.question('Enter the name of the output file:', (filename: string) => {
        resolve(filename);
      });
    });

    const numKeys = await new Promise<string>((resolve) => {
      rl.question('How many private keys you wish to generate? ', (numKeys: string) => {
        resolve(numKeys);
      });
    });

    const num = parseInt(numKeys);

    if (isNaN(num) || num <= 0 || num > 100000) {
      console.log('Incorrect number of keys. Enter a number from 1 to 100000.');
      rl.close();
      return;
    }

    const stream = await fs.createWriteStream(filename);

    for (let i = 0; i < num; i++) {
      const { address, privateKey } = await generateEthereumAddress();
      stream.write(`Address ${i + 1}: ${address}\n`);
      stream.write(`Private Key ${i + 1}: ${privateKey}\n\n`);
    }

    stream.close();

    console.log(`Private keys saved to file ${filename}`);
  } else if (output === 'console') {
    const numKeys = await new Promise<string>((resolve) => {
      rl.question('How many private keys you wish to generate? ', (numKeys: string) => {
        resolve(numKeys);
      });
    });

    const num = parseInt(numKeys);

    if (isNaN(num) || num <= 0 || num > 1000) {
      console.log('Incorrect number of keys. Enter a number from 1 to 1000.');
      rl.close();
      return;
    }

    for (let i = 0; i < num; i++) {
      const { address, privateKey } = await generateEthereumAddress();
      console.log(`Address ${i + 1}: ${address}`);
      console.log(`Private Key ${i + 1}: ${privateKey}\n`);
    }
  } else {
    console.log('Invalid option. Please enter "file" or "console"');
  }

  rl.close();
}

askForOutput();
