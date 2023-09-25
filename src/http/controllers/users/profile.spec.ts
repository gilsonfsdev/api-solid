import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileReponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileReponse.statusCode).toEqual(200)
    expect(profileReponse.body.user).toEqual(
      expect.objectContaining({
        email: 'joaodasneves@example.com',
      }),
    )
  })
})
