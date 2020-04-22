module.exports = {
  update: `mutation UpdateRover(
    $input: UpdateRoverInput!
    $condition: ModelRoverConditionInput
  ) {
    updateRover(input: $input, condition: $condition) {
      id
      name
      imageURL
    }
  }
  `,
  
  create: `mutation CreateRover(
    $input: CreateRoverInput!
    $condition: ModelRoverConditionInput
  ) {
    createRover(input: $input, condition: $condition) {
      id
      name
      imageURL
    }
  }
  `
}