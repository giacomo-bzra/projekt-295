/**
 * Solution Exercise 1.
 */
import Datastore from '@seald-io/nedb'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

// DB schema / settings
export const User = z.object({
  _id: z.string().optional(),
  email: z.string(),
  passwordHash: z.string(),
  name: z.string(),
  geburtsdatum: z.string(),
  abschluss: z.array(z.string())
})


const giacomo = {
    email: "giacomo.dimitri@gmail.com",
    passwordHash: bcrypt.hashSync("1234", 12),
  name: "Giacomo Dimitr",
  geburtsdatum: "07,04,2009",
  abschluss: ["primarschule", "mittelschule", "hoffentlich imst"]
}

const sami = {
  email: "sami.Boudatt@gmail.com",
  passwordHash: bcrypt.hashSync("4321", 12),
  name: "sami boudatt",
  geburtsdatum: "bro, ka man",
  abschluss: ["primarschule", "mittelschule", "hoffentlich imst"]
}
// Model Type
export declare type UserModel = z.infer<typeof User>

let nedb: Datastore<UserModel> | null = null

export function userDb() {
  if (!nedb) {
    nedb = new Datastore( {
      filename: './data/user.db',
      autoload: true
    } )
  }
  return nedb
}


export async function initializeUserDb() {
  const db = userDb();
  await userDb().autoloadPromise;

  //gpt hilfe
const count = await db.count({});
if (typeof count === "number" && count === 0) {
    await db.insert([giacomo, sami]);
    console.log("Inserted initial users to DB");
}
}
