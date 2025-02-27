"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = exports.iFrameHandler = void 0;
const iFrameHandler = (info, transactions) => {
    return new Promise((resolve, reject) => {
        const windowHandler = (event) => {
            (0, exports.handlers)(event, windowHandler, {
                ...info,
                data: { ...info.data, resolve, reject },
            }, transactions);
        };
        window.addEventListener('message', windowHandler);
    });
};
exports.iFrameHandler = iFrameHandler;
const handlers = async (event, windowHandler, info, transactions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if (info.iFrameMethod === 'sign') {
        if ((_b = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.signedTransactionHex) {
            return transactions
                .submitTransaction((_d = (_c = event === null || event === void 0 ? void 0 : event.data) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.signedTransactionHex)
                .then((res) => {
                var _a, _b;
                if ((_b = (_a = info === null || info === void 0 ? void 0 : info.data) === null || _a === void 0 ? void 0 : _a.prompt) === null || _b === void 0 ? void 0 : _b.close) {
                    info.data.prompt.close();
                }
                window.removeEventListener('message', windowHandler);
                info.data.resolve(res);
                return res;
            })
                .catch(() => {
                window.removeEventListener('message', windowHandler);
            });
        }
    }
    if (info.iFrameMethod === 'decrypt') {
        if (!((_f = (_e = event === null || event === void 0 ? void 0 : event.data) === null || _e === void 0 ? void 0 : _e.payload) === null || _f === void 0 ? void 0 : _f.decryptedHexes)) {
            return;
        }
        const decryptedHexes = (_h = (_g = event === null || event === void 0 ? void 0 : event.data) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.decryptedHexes;
        const messages = info.data.encryptedMessages;
        const thread = (_j = messages) === null || _j === void 0 ? void 0 : _j.map((m) => {
            const DecryptedMessage = decryptedHexes[m.EncryptedHex];
            return { ...m, DecryptedMessage };
        });
        info.data.resolve(thread);
        window.removeEventListener('message', windowHandler);
    }
    if (info.iFrameMethod === 'login' && event.data.method === 'login') {
        const key = (_l = (_k = event === null || event === void 0 ? void 0 : event.data) === null || _k === void 0 ? void 0 : _k.payload) === null || _l === void 0 ? void 0 : _l.publicKeyAdded;
        const user = event.data.payload.users[key];
        (_m = info.data.prompt) === null || _m === void 0 ? void 0 : _m.close();
        info.data.resolve({ key, user });
        window.removeEventListener('message', windowHandler);
    }
    if (info.iFrameMethod === 'logout' && event.data.method === 'login') {
        (_o = info.data.prompt) === null || _o === void 0 ? void 0 : _o.close();
        info.data.resolve(true);
    }
    if (info.iFrameMethod === 'jwt') {
        if (event.data.payload.jwt) {
            (_p = info.data.prompt) === null || _p === void 0 ? void 0 : _p.close();
            info.data.resolve(event.data.payload.jwt);
            window.removeEventListener('message', windowHandler);
        }
    }
    if (info.iFrameMethod === 'encrypt') {
        if (event.data.payload.encryptedMessage) {
            info.data.resolve(event.data.payload.encryptedMessage);
            window.removeEventListener('message', windowHandler);
        }
    }
    if (info.iFrameMethod === 'derive' && event.data.method === 'derive') {
        (_q = info.data.prompt) === null || _q === void 0 ? void 0 : _q.close();
        info.data.resolve(event.data.payload);
        window.removeEventListener('derive', windowHandler);
    }
    if (info.iFrameMethod === 'info' && event.data.payload) {
        info.data.resolve(event.data.payload);
        window.removeEventListener('info', windowHandler);
    }
    if (info.iFrameMethod === 'storageGranted' && event.data.method === 'storageGranted') {
        info.data.resolve(true);
        window.removeEventListener('storageGranted', windowHandler);
    }
};
exports.handlers = handlers;
//# sourceMappingURL=WindowHandler.js.map