import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

// This defines a test suite with the description 
// 'AppController (e2e)'. It is likely testing the functionality 
// of the AppController in an end-to-end scenario.

describe('AppController (e2e)', () => {
  /***************** Test Setup **************/
  let app: INestApplication;

  beforeEach(async () => {
   // Test.createTestingModule creates a testing module 
   // with the specified imports (in this case, AppModule).
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
        // moduleFixture.compile() compiles the testing module.
    }).compile();
  
    // moduleFixture.createNestApplication() 
    // creates an instance of the NestJS application.
    app = moduleFixture.createNestApplication();
    // app.init() initializes the application. This is 
    // typically done before running tests.
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  /*********************************************/

  // his is a test case that makes an HTTP GET request to the 
  // root endpoint ('/').
  it('/ (GET)', () => {
    // request(app.getHttpServer()) sends the request to the 
    // application's HTTP server.
    return request(app.getHttpServer())
    // .get('/') specifies the HTTP method and endpoint.
      .get('/')
    // .expect(200) asserts that the HTTP response status should be 200 (OK).
      .expect(200)
    // .expect('Hello World!') asserts that the response body should be equal 
    // to 'Hello World!'.
      .expect('Hello World!');
  });

  it('should create a new user', async () => {
    const createUserDto = {
      username: 'testuser',
      password: 'testpassword',
      // Add other properties as needed
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({
      status: 'success',
      error: false,
      message: 'User created successfully',
    });

    // Additional assertions or checks as needed
  });
});
