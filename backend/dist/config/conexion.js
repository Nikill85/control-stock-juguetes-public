"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
var conexion = promise_1.default.createPool({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10722194',
    password: 'En87q3H7Fd',
    database: 'sql10722194',
    port: 3306,
});
exports.default = conexion;
