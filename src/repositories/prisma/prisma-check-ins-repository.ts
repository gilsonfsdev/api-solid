import { CheckIn, Prisma } from '@prisma/client'
import { CheckinsRepository } from '../check-ins-repositoy'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckinsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20, // quantos items quero trazer
      skip: (page - 1) * 20, // quantos items eu quero pular
    })
    return checkIns
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // primeiro momento do dia
    const endOfTheDay = dayjs(date).endOf('date') // ultimo momento do dia

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(), // após o começo do dia -- gte: maior ou igual
          lte: endOfTheDay.toDate(), // antes do fim do dia -- lte: menor que
        },
      },
    })

    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkInUpdated = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkInUpdated
  }
}
