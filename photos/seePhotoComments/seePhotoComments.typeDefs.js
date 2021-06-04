import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhotoComments(lastId: Int, id: Int!): [Comment]
  }
`