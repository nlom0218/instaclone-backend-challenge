import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      try {
        let hashtagsObjs = []
        if (caption) {
          hashtagsObjs = processHashtags(caption)
        }
        await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: { id: loggedInUser.id }
            },
            ...(hashtagsObjs.length > 0 && { hashtags: { connectOrCreate: hashtagsObjs } })
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