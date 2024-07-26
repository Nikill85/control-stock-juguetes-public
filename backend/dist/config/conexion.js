"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
var conexion = promise_1.default.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yduz2urogsgovg',
    database: 'proyecto_final'
});
exports.default = conexion;
