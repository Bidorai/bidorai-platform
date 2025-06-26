import { Router, Request, Response } from 'express';
import { MenuModel } from '../models/Menu';
import authenticate from '../middleware/auth';
import { requireRole } from '../middleware/role';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const menus = await MenuModel.getAll();
  res.json(menus);
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const menu = await MenuModel.getById(parseInt(id));
  if (!menu) {
    return res.status(404).json({ error: 'Menu not found' });
  }
  res.json(menu);
});

router.post(
  '/',
  authenticate,
  requireRole('restaurant'),
  body('restaurant_id').isInt(),
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('category').optional().isString(),
  body('image_url').optional().isURL(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { restaurant_id, name, description, price, category, image_url } = req.body;
    const menu = await MenuModel.create({ restaurant_id, name, description, price, category, image_url });
    res.status(201).json(menu);
  }
);

export default router; 