"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Menu_1 = require("../models/Menu");
const auth_1 = __importDefault(require("../middleware/auth"));
const role_1 = require("../middleware/role");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const menus = await Menu_1.MenuModel.getAll();
    res.json(menus);
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const menu = await Menu_1.MenuModel.getById(parseInt(id));
    if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
    }
    res.json(menu);
});
router.post('/', auth_1.default, (0, role_1.requireRole)('restaurant'), (0, express_validator_1.body)('restaurant_id').isInt(), (0, express_validator_1.body)('name').isString().notEmpty(), (0, express_validator_1.body)('description').isString().notEmpty(), (0, express_validator_1.body)('price').isFloat({ gt: 0 }), (0, express_validator_1.body)('category').optional().isString(), (0, express_validator_1.body)('image_url').optional().isURL(), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { restaurant_id, name, description, price, category, image_url } = req.body;
    const menu = await Menu_1.MenuModel.create({ restaurant_id, name, description, price, category, image_url });
    res.status(201).json(menu);
});
exports.default = router;
