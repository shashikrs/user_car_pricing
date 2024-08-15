import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    app.close();
  });

  it('handles a register request', () => {
    const emailReq = 'test1@test.com';
    return request(app.getHttpServer())
      .post('/users/register')
      .send({
        email: emailReq,
        password: 'test',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined;
        expect(email).toEqual(emailReq);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('register and get the logged in user using whoami handler', async () => {
    const emailReq = 'test2@test.com';
    const res = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        email: emailReq,
        password: 'test',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/users/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(emailReq);
  });
});
