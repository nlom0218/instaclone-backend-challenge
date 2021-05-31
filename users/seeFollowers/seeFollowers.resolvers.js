import client from "../../client"

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
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
        const followers = await client.user.findMany({
          skip: (page - 1) * 3,
          take: 3,
          where: {
            following: {
              some: {
                username
              }
            }
          },
          select: { username: true, avatar: true }
        })
        const totalFollowers = await client.user.count({
          where: {
            following: {
              some: {
                username
              }
            }
          }
        })
        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / 3)
        }
      } catch (err) { return err }
    }
  }
}