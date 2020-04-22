/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRover = /* GraphQL */ `
  mutation CreateRover(
    $input: CreateRoverInput!
    $condition: ModelRoverConditionInput
  ) {
    createRover(input: $input, condition: $condition) {
      id
      name
      imageURL
    }
  }
`;
export const updateRover = /* GraphQL */ `
  mutation UpdateRover(
    $input: UpdateRoverInput!
    $condition: ModelRoverConditionInput
  ) {
    updateRover(input: $input, condition: $condition) {
      id
      name
      imageURL
    }
  }
`;
export const deleteRover = /* GraphQL */ `
  mutation DeleteRover(
    $input: DeleteRoverInput!
    $condition: ModelRoverConditionInput
  ) {
    deleteRover(input: $input, condition: $condition) {
      id
      name
      imageURL
    }
  }
`;
