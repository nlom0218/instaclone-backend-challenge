import client from "../../client"

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) => client.user.findMany({
      take: 3,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
      where: {
        username: {
          startsWith: keyword.toLowerCase()
        }
      }
    })
  }
}
