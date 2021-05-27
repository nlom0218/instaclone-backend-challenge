import { gql } from "apollo-server-core";

export default gql`
  type MutationResult {
    ok: Boolean!
    token: String
    error: String
  }
`