import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    user: User!
    photo: Photo!
    payload: String!
    createdAt: String!
    updatedAt: String!

    # computed field
    isMine: Boolean!
  }
`