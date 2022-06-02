import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { ec } from 'elliptic';
// import { IdentityDeriveParams } from 'deso-protocol-types';
import bs58check from 'bs58check';
import { ethers } from 'ethers';
// import * as bip39 from 'bip39';
export class Metamask {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async derive(): Promise<void> {
    //     export enum Network {
    //   mainnet = 'mainnet',
    //   testnet = 'testnet',
    // }
    const PUBLIC_KEY_PREFIXES = {
      mainnet: {
        bitcoin: [0x00],
        deso: [0xcd, 0x14, 0x0],
      },
      testnet: {
        bitcoin: [0x6f],
        deso: [0x11, 0xc2, 0x0],
      },
    };
    const mainnet = 'mainnet';
    const testnet = 'testnet';
    // 1.1 goal of this is to generate a random derived key
    const entropy = ethers.utils.randomBytes(16);
    const dMnemonic = ethers.utils.entropyToMnemonic(entropy);
    const dKeyChain = ethers.utils.HDNode.fromMnemonic(dMnemonic);
    // 1.2 turn it into a deso key
    const prefix = PUBLIC_KEY_PREFIXES.mainnet.deso;
    const e = new ec('secp256k1');
    const ecKey = e.keyFromPrivate(dKeyChain.privateKey);
    ecKey.getPublic().encode('array', true);

    // ethers.utils.
    // dKeyChain.publicKey
    // const desoPublicKey =

    //2. expiration block

    //3. spending limits

    //4. create signature Byte[key, block, limit ]
  }
}
