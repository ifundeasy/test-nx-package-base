const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const http = require('http');
const request = require('supertest');
const { app: svcAuth, services } = require('svc-auth');

describe('Test example', () => {
  beforeAll(async () => {
    const { app, sql } = await svcAuth();
    const server = http.createServer(app)
    await server.listen(3000)

    console.info(`svc-auth (under svc-auth) listen on ${3000}`)
    expect(services.v1.odd.isOdd(123)).toBe(true)

    Object.assign(this, {
      app, sql, services, server
    })
  });

  afterAll(async () => {
    console.info('All done');
    await this.sql.sequelize.close();
    this.server.close();
  });

  test('[svc-auth] GET /', (done) => {
    request(this.app)
      .get('/api/v1')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.slug).toBe('test-nx-package-base')
        expect(res.body.name).toBe('svc-main')
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
