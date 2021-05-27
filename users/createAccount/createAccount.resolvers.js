import client from "../../client";
import bcrypt from "bcrypt"

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password, }) => {
      try {
        const existingUser = await client.user.findFirst({ where: { OR: [{ username }, { email }] } })
        if (existingUser) {
          return {
            ok: false,
            error: "Username or Email is already taken."
          }
        }
        const uglyPassword = await bcrypt.hash(password, 10)
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            ...(lastName && { lastName }),
            password: uglyPassword
          }
        })
        return {
          ok: true
        }
      } catch (err) {
        return err
      }
    }
  }
}