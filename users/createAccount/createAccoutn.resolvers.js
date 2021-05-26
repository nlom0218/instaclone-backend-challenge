import client from "../../client";
import bcrypt from "bcrypt"

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password, }) => {
      try {
        const existingUser = await client.user.findFirst({ where: { OR: [{ username }, { email }] } })
        if (existingUser) {
          throw new Error("Username or Email is already taken.")
        }
        const uglyPassword = await bcrypt.hash(password, 10)
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            ...(lastName && { lastName }),
            password: uglyPassword
          }
        })
      } catch (err) {
        return err
      }
    }
  }
}