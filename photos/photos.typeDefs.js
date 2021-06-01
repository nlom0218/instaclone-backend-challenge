import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User
    file: String
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int): [Photo]
    createdAt: String!
    updatedAt: String!

    totalPhotos: Int!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`