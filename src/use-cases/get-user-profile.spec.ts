import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersrepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourcerNotFoundError } from './errors/resources-not-found-error'

let usersRepository: UsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersrepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get a profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourcerNotFoundError)
  })
})
