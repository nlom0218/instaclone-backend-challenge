import client from "../client";

export default {
  User: {
    totalFollowing: async ({ id }) => client.user.count({
      where: {
        followers: { some: { id } }
      }
    }),
    totalFollowers: async ({ id }) => client.user.count({
      where: {
        following: { some: { id } }
      }
    }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return id === loggedInUser.id
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      const exists = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: { some: { id } }
        }

      })
      return Boolean(exists)
    },
    photos: ({ id }) => client.photo.findMany({ where: { userId: id } })
  }
}
