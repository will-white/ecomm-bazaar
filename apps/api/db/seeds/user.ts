import schema from 'db/schema';

export const users: (typeof schema.user.$inferInsert)[] = [
  {
    email: 'test@test.invalid',
    // password: '12345',
    password: Buffer.from(
      '$2a$12$hjc0OVZAQq.cCg3P8zE4MuYpbpfniYaxpZNV7jk5QcMseYc95bJWW'
    ),
    id: '5b24d195-deec-436e-8dda-5425b49058e2',
    firstName: 'testy',
    lastName: 'McTestyFace',
    createdBy: '5b24d195-deec-436e-8dda-5425b49058e2',
    modifiedBy: '5b24d195-deec-436e-8dda-5425b49058e2',
  },
  {
    email: 'killjoy@derp.invalid',
    // password: 'abc123',
    password: Buffer.from(
      '$2a$12$t1K5tz.kcdMhAf7L21EUCOA4RZzOG1VZiEbdcQvExx8mcLBUurOAe'
    ),
    id: '1ac8eb2d-9f7d-4cd1-b9fb-2361f94363df',
    createdBy: '1ac8eb2d-9f7d-4cd1-b9fb-2361f94363df',
    modifiedBy: '1ac8eb2d-9f7d-4cd1-b9fb-2361f94363df',
  },
  {
    email: 'tester@test.invalid',
    // password: 'ohThisIsSupposedToBeAHash...',
    password: Buffer.from(
      '$2a$12$6a9L3V7./Skv1F60O77Ave.dVtoWxWemrodD.1VCLggPYoa/xSZGa'
    ),
    id: 'b37e9e08-c40a-4e35-b404-9a7eb4feed72',
    createdBy: 'b37e9e08-c40a-4e35-b404-9a7eb4feed72',
    modifiedBy: 'b37e9e08-c40a-4e35-b404-9a7eb4feed72',
  },
];

export default users;
