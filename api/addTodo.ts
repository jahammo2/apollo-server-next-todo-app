import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const todo = await prisma.todo.create({
    data: {
      text: 'foo',
      completed: false,
    },
  })
  console.log(todo)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
