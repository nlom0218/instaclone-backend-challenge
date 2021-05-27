import client from "../../client"
import bcrypt from "bcrypt"
import { protectedResolover } from "../users.utils"

export default {
  Mutation: {
    editProfile: protectedResolover(
      async (_, { firstName, lastName, username, email, password: newPassword }, { loggedInUser }) => {
        let uglyPassword = null
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10)
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            username,
            email,
            ...(uglyPassword && { password: uglyPassword })
          }
        })
        if (updatedUser.id) {
          return {
            ok: true
          }
        } else {
          return {
            ok: false,
            error: "Colud not update profile."
          }
        }
      }
    )
  }
}