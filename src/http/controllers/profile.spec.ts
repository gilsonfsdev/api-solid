import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'João das neves',
      email: 'joaodasneves@example.com',
      password: '1234567',
    })

    const authReponse = await request(app.server).post('/sessions').send({
      email: 'joaodasneves@example.com',
      password: '1234567',
    })

    const { token } = authReponse.body

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
