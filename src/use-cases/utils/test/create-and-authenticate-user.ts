import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  return { token }
}
