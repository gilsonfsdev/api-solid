import { CheckinsRepository } from '@/repositories/check-ins-repositoy'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckinsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
