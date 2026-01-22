import { Request, Response } from 'express'
import { prisma } from '../../config/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: 'Usuário não encontrado' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(401).json({ error: 'Senha inválida' })
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })
}
