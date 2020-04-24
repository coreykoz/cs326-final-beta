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
        while (_) try {
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
exports.__esModule = true;
var Database = /** @class */ (function () {
    function Database(collectionName) {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
        this.dbName = "emery";
        this.collectionName = collectionName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        // Open up a connection to the client.
        // Open up a connection to the client.
        // The connection is asynchronous, but we can't call await directly
        // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
        /* from https://anthonychu.ca/post/async-await-typescript-nodejs/
    
          Async/Await and the Async IIFE
    
          The await keyword can only be used inside of a function
          marked with the async keyword. [...] One way to do this is
          with an "async IIFE" (immediately invoked function
          expression)...
    
           (async () => {
           // code goes here
           })();
    
        */
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Database.prototype.put = function (name, total, date, category, type, id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, _a, result, result, result, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("id is:" + id);
                        _a = id;
                        switch (_a) {
                            case "transaction": return [3 /*break*/, 1];
                            case "expense": return [3 /*break*/, 3];
                            case "income": return [3 /*break*/, 5];
                            case "userInfo": return [3 /*break*/, 7];
                            case "monthly": return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 10];
                    case 1: return [4 /*yield*/, collection.updateOne({ 'trans_name': name, 'trans_type': type, 'trans_category': category, 'trans_date': date, 'trans_price': total, 'id': id }, { $set: { 'trans_price': total } }, { 'upsert': true })];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 10];
                    case 3: return [4 /*yield*/, collection.updateOne({ 'expense_name': name, 'expense_total': total, 'date': date, 'category': category, 'id': id }, { $set: { 'expense_total': total } }, { 'upsert': true })];
                    case 4:
                        result = _b.sent();
                        return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, collection.updateOne({ 'income_name': name, 'income_total': total, 'date': date, 'category': category, 'id': id }, { $set: { 'income_total': total } }, { 'upsert': true })];
                    case 6:
                        result = _b.sent();
                        return [3 /*break*/, 10];
                    case 7: return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, collection.updateOne({ 'monthly_expense': name, 'id': id }, { $set: { 'monthly_cost': total } }, { 'upsert': true })];
                    case 9:
                        result = _b.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        return [4 /*yield*/, collection.find({ 'id': id }).toArray()];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.del = function (name, id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, _a, result, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("delete: key = " + name);
                        _a = id;
                        switch (_a) {
                            case "monthly": return [3 /*break*/, 1];
                            case "transaction": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, collection.deleteOne({ 'monthly_expense': name })];
                    case 2:
                        result = _b.sent();
                        console.log("entered monthly delete");
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, collection.deleteOne({ 'trans_name': name })];
                    case 4:
                        result = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFound = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: key = " + key);
                        return [4 /*yield*/, this.get(key)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
