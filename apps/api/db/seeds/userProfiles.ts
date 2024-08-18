import schema from 'db/schema';
import users from './user';

export const data: (typeof schema.userProfile.$inferInsert)[] = [
  {
    userId: users[0].id!,
    country: '',
    dob: new Date(1990, 0, 18),
    language: '',
  },
  {
    userId: users[1].id!,
    country: '',
    dob: new Date(1990, 0, 18),
    language: '',
  },
  {
    userId: users[2].id!,
    country: '',
    dob: new Date(1990, 0, 18),
    language: '',
  },
];

export default data;
