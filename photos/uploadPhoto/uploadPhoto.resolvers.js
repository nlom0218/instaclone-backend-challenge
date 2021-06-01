import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      try {
        let hashtagsObjs = []
        if (caption) {
          const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g)
          hashtagsObjs = hashtags.map(hashtag => ({ where: { hashtag }, create: { hashtag } }))
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