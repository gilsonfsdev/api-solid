import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearbyGymsQuerySchema.parse(
    request.query,
  )

  const fetchNearbyGymsUseCase = MakeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude,
    userLongitude,
  })

  return reply.status(200).send({ gyms })
}
