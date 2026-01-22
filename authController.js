import { prisma } from '../config/prisma.js';
import { generateToken } from '../services/authService.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
