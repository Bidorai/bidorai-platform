"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool();
class UserModel {
    static async findByEmail(email) {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0] || null;
    }
    static async create(email, password_hash, role) {
        const res = await pool.query('INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *', [email, password_hash, role]);
        return res.rows[0];
    }
}
exports.UserModel = UserModel;
