import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true }
        })
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow user."
          }
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: { username }
            }
          }
        })
        return {
          ok: true
        }
      } catch (err) {
        return err
      }
    })
  }
}