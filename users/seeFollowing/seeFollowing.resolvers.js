import client from "../../client"

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true }
        })
        if (!ok) {
          return {
            ok: false,
            error: "User not found."
          }
        }
        const following = await client.user.findMany({
          take: 3,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
          where: {
            followers: {
              some: {
                username
              }
            }
          },
          orderBy: { id: "asc" },
          select: { username: true, avatar: true, id: true }
        })
        return {
          ok: true,
          following
        }
      } catch (error) {
        return error
      }
    }
  }
}