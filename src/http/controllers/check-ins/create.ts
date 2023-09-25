import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { userLatitude, userLongitude } = checkInBodySchema.parse(request.body)

  const checkInUseCase = MakeCheckInUseCase()

  const checkIn = await checkInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send({ checkIn })
}
