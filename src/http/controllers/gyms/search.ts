import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(request.query)

  const searchGymUseCase = MakeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
