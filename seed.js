import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Limpa dados
  await prisma.sale.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.product.deleteMany()
  await prisma.region.deleteMany()

  // Regiões
  const regions = await prisma.region.createMany({
    data: [
      { name: 'Sul' },
      { name: 'Sudeste' },
      { name: 'Nordeste' }
    ]
  })

  // Produtos
  const products = await prisma.product.createMany({
    data: [
      { name: 'Produto A' },
      { name: 'Produto B' }
    ]
  })

  // Clientes
  for (let i = 1; i <= 50; i++) {
    await prisma.customer.create({
      data: {
        name: `Cliente ${i}`,
        active: Math.random() > 0.2
      }
    })
  }

  // Vendas
  const customers = await prisma.customer.findMany()
  const regionsList = await prisma.region.findMany()
  const productsList = await prisma.product.findMany()

  for (let i = 0; i < 300; i++) {
    await prisma.sale.create({
      data: {
        amount: Number((Math.random() * 2000 + 100).toFixed(2)),
        customerId: customers[Math.floor(Math.random() * customers.length)].id,
        productId: productsList[Math.floor(Math.random() * productsList.length)].id,
        regionId: regionsList[Math.floor(Math.random() * regionsList.length)].id,
        createdAt: randomDate2024()
      }
    })
  }

  console.log('🌸 Seed executado com sucesso')
}

function randomDate2024() {
  const start = new Date('2024-01-01')
  const end = new Date('2024-12-31')
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

  await prisma.user.create({
  data: {
    name: 'Admin Hanami',
    email: 'admin@hanami.com',
    password: await bcrypt.hash('123456', 10),
    role: 'ADMIN'
  }
})
