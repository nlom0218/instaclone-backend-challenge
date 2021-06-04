import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { lastId, id }) => client.comment.findMany({
      take: 2,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
      where: {
        photoId: id
      }
    })
  }
}