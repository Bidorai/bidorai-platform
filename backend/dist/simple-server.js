"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Bidorai Backend is running!' });
});
// Simple test endpoint
app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to Bidorai Backend API' });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Simple backend server listening on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});
