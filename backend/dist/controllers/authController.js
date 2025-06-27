"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const register = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const existing = await User_1.UserModel.findByEmail(email);
    if (existing) {
        return res.status(409).json({ error: 'Email already registered' });
    }
    const password_hash = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.UserModel.create(email, password_hash, role);
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const user = await User_1.UserModel.findByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
};
exports.login = login;
