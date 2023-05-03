"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var hdkey_1 = require("ethereumjs-wallet/dist/hdkey");
var buffer_1 = require("buffer");
var readline = require("readline");
var fs = require("fs");
function generateEthereumAddress() {
    return __awaiter(this, void 0, void 0, function () {
        var seed, masterKey, addrNode, privateKey;
        return __generator(this, function (_a) {
            seed = crypto.randomBytes(16).toString('hex');
            masterKey = hdkey_1.default.fromMasterSeed(buffer_1.Buffer.from(seed, 'hex'));
            addrNode = masterKey.derivePath("m/44'/60'/0'/0/0");
            privateKey = addrNode.getWallet().getPrivateKeyString().replace('0x', '');
            return [2 /*return*/, { address: addrNode.getWallet().getChecksumAddressString(), privateKey: privateKey }];
        });
    });
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askForOutput() {
    return __awaiter(this, void 0, void 0, function () {
        var output, filename, numKeys, num, stream, i, _a, address, privateKey, numKeys, num, i, _b, address, privateKey;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        rl.question('Do you want to save the addresses to a file or display them in the console? (file/console)', function (output) {
                            resolve(output.toLowerCase());
                        });
                    })];
                case 1:
                    output = _c.sent();
                    if (!(output === 'file')) return [3 /*break*/, 9];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            rl.question('Enter the name of the output file:', function (filename) {
                                resolve(filename);
                            });
                        })];
                case 2:
                    filename = _c.sent();
                    return [4 /*yield*/, new Promise(function (resolve) {
                            rl.question('How many private keys you wish to generate? ', function (numKeys) {
                                resolve(numKeys);
                            });
                        })];
                case 3:
                    numKeys = _c.sent();
                    num = parseInt(numKeys);
                    if (isNaN(num) || num <= 0 || num > 100000) {
                        console.log('Incorrect number of keys. Enter a number from 1 to 100000.');
                        rl.close();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fs.createWriteStream(filename)];
                case 4:
                    stream = _c.sent();
                    i = 0;
                    _c.label = 5;
                case 5:
                    if (!(i < num)) return [3 /*break*/, 8];
                    return [4 /*yield*/, generateEthereumAddress()];
                case 6:
                    _a = _c.sent(), address = _a.address, privateKey = _a.privateKey;
                    stream.write("Address ".concat(i + 1, ": ").concat(address, "\n"));
                    stream.write("Private Key ".concat(i + 1, ": ").concat(privateKey, "\n\n"));
                    _c.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    stream.close();
                    console.log("Private keys saved to file ".concat(filename));
                    return [3 /*break*/, 16];
                case 9:
                    if (!(output === 'console')) return [3 /*break*/, 15];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            rl.question('How many private keys you wish to generate? ', function (numKeys) {
                                resolve(numKeys);
                            });
                        })];
                case 10:
                    numKeys = _c.sent();
                    num = parseInt(numKeys);
                    if (isNaN(num) || num <= 0 || num > 1000) {
                        console.log('Incorrect number of keys. Enter a number from 1 to 1000.');
                        rl.close();
                        return [2 /*return*/];
                    }
                    i = 0;
                    _c.label = 11;
                case 11:
                    if (!(i < num)) return [3 /*break*/, 14];
                    return [4 /*yield*/, generateEthereumAddress()];
                case 12:
                    _b = _c.sent(), address = _b.address, privateKey = _b.privateKey;
                    console.log("Address ".concat(i + 1, ": ").concat(address));
                    console.log("Private Key ".concat(i + 1, ": ").concat(privateKey, "\n"));
                    _c.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 11];
                case 14: return [3 /*break*/, 16];
                case 15:
                    console.log('Invalid option. Please enter "file" or "console"');
                    _c.label = 16;
                case 16:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
askForOutput();
