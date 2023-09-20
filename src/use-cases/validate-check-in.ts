import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/check-ins-repositoy'
import { ResourcerNotFoundError } from './errors/resources-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckinUseCaseRequest {
  checkInId: string
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckinUseCase {
  constructor(private checkInRepository: CheckinsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    // buscando o check-in
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourcerNotFoundError()
    }

    // obtendo e verificando a distância, em minutos, da validação para a criação do check-in
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    // atualizando o campo de validação
    checkIn.validated_at = new Date()

    // salvando o check-in atualizado no repositório
    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
