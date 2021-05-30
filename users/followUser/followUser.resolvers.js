import client from "../../client"
import { protectedResolver } from "../users.utils"

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      try {
        const ok = await client.user.findUnique({ where: { username } })
        if (!ok) {
          return {
            ok: false,
            error: "That user does not exist."
          }
        } else if (ok.username === loggedInUser.username) {
          return {
            ok: false,
            error: "You don't follow you."
          }
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              connect: { username }
            }
          }
        })
        return {
          ok: true
        }
      } catch (err) { return err }
    })
  }
}