"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Placeholder route
router.get('/', (req, res) => {
    res.send('Restaurant route works!');
});
exports.default = router;
