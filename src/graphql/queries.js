/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRover = /* GraphQL */ `
  query GetRover($id: ID!) {
    getRover(id: $id) {
      id
      name
      imageURL
    }
  }
`;
export const listRovers = /* GraphQL */ `
  query ListRovers(
    $filter: ModelRoverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRovers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageURL
      }
      nextToken
    }
  }
`;
