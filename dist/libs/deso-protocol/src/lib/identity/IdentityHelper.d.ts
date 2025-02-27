import { LoginUser } from 'deso-protocol-types';
import { Transactions } from '../transaction/Transaction';
export declare type IframeMethods = 'decrypt' | 'derive' | 'encrypt' | 'info' | 'jwt' | 'login' | 'logout' | 'sign' | 'storageGranted';
export declare const callIdentityMethodAndExecute: (attributeValue: unknown, method: IframeMethods, user: LoginUser | null, transactions: Transactions) => Promise<any>;
export declare const approveSignAndSubmit: (transactionHex: string, uri: string, transactions: Transactions, testnet?: boolean | undefined) => Promise<any>;
export declare const getIframe: () => HTMLIFrameElement;
