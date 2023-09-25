import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamschema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamschema.parse(request.params)

  const validateCheckInUseCase = MakeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
