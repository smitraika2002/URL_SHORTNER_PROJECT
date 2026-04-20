import db from '../db/index.js';
import { usersTable } from '../models/index.js';

export async function getuserbyemail(email) {
  const user = await db
    .select({
        id: usersTable.id,
        name: usersTable.name,
        age: usersTable.age,
        email: usersTable.email,
        password: usersTable.password,
        salt: usersTable.salt
    })
    .from(usersTable)
    .where(usersTable.email.eq(email));
  return user[0];
}