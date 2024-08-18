import schema from 'db/schema';

export class PersonalInfoDto
  implements
    Omit<
      typeof schema.userProfile.$inferSelect & typeof schema.user.$inferSelect,
      | 'userId'
      | 'id'
      | 'password'
      | 'createdAt'
      | 'createdBy'
      | 'modifiedAt'
      | 'modifiedBy'
    >
{
  email!: string;
  firstName!: string | null;
  lastName!: string | null;
  dob!: Date;
  country!: string;
  language!: string | null;
}
// Omit<
//   typeof schema.userProfile.$inferSelect | typeof schema.user.$inferSelect,
//   | 'userId'
//   | 'id'
//   | 'password'
//   | 'createdAt'
//   | 'createdBy'
//   | 'modifiedAt'
//   | 'modifiedBy'
// > {}
