import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(async (_, { id, caption }, { loggedInUser }) => {
      try {
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { hashtags: { select: { hashtag: true } } }
        })
        console.log(oldPhoto.hashtags);
        if (!oldPhoto) {
          return {
            ok: false,
            error: "Photo not found."
          }
        }
        await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHashtags(caption)
            }
          }
        })
        return {
          ok: true
        }
      } catch (error) {
        return error
      }
    })
  }
}