import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const ok = await client.photo.findUnique({ where: { id } })
        if (!ok) {
          return {
            ok: false,
            error: "Photo not found."
          }
        }
        const like = await client.like.findUnique({
          where: {
            photoId_userId: {
              photoId: id,
              userId: loggedInUser.id
            }
          }
        })
        if (like) {
          await client.like.delete({
            where: { id: like.id }
          })
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              photo: { connect: { id } }
            }
          })
        }
        return {
          ok: true
        }
      } catch (error) {
        return error
      }
    })
  }
}