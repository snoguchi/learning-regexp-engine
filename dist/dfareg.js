"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Regexp_1 = __importDefault(require("./Regexp"));
const dfareg = {
    compile(regexp) {
        return new Regexp_1.default(regexp);
    }
};
exports.default = dfareg;
