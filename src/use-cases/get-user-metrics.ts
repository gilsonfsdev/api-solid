import { CheckinsRepository } from '@/repositories/check-ins-repositoy'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckinsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInCount = await this.checkInRepository.countByUserId(userId)

    return { checkInCount }
  }
}
