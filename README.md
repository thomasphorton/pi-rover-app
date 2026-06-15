# Pi Rover App

A React web application that serves as a real-time dashboard for a Raspberry Pi-powered rover. The frontend displays a live camera feed from the rover and updates automatically as new images are captured, using AWS AppSync GraphQL subscriptions.

## How It Works

The system is composed of three parts working together:

1. **Raspberry Pi rover** — captures images and uploads them to Amazon S3, then invokes an AWS Lambda function to update the rover's state.
2. **AWS backend** — a Lambda function updates the rover record in AWS AppSync (GraphQL). AppSync broadcasts the change to all connected clients via a real-time subscription.
3. **This React app** — authenticates users via Amazon Cognito, fetches the current rover state on load, and subscribes to live updates so the displayed image refreshes automatically whenever the rover sends a new one.

```
Pi Rover → S3 (image) → Lambda → AppSync (GraphQL mutation)
                                         ↓ subscription
                               React App (live image update)
```

## AWS Backend Services

| Service | Purpose |
|---|---|
| **AWS AppSync** | GraphQL API — stores rover state and pushes real-time updates |
| **Amazon Cognito** | User authentication (private access only) |
| **AWS Lambda** | Receives events from the rover and writes updates to AppSync |
| **Amazon S3** | Stores rover camera images |
| **AWS Amplify Hosting** | Hosts the React frontend |

### GraphQL Data Model

```graphql
type Rover {
  id: ID!
  name: String!
  imageURL: String
}
```

Access is restricted to authenticated users (Cognito user pools) and the Lambda function (IAM).

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [AWS Amplify CLI](https://docs.amplify.aws/cli/start/install/) (`npm install -g @aws-amplify/cli`)
- An AWS account with Amplify configured

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/thomasphorton/pi-rover-app.git
cd pi-rover-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Amplify backend

If you are deploying your own backend, initialise and push the Amplify environment:

```bash
amplify init
amplify push
```

This provisions the AppSync API, Cognito user pool, Lambda function, S3 bucket, and Amplify Hosting. An `src/aws-exports.js` file will be generated automatically with your environment's connection details.

If you are connecting to an existing environment, pull the configuration:

```bash
amplify pull
```

### 4. Run the app locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be prompted to sign in or create an account via the Cognito-powered login screen.

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the development server at `http://localhost:3000` |
| `npm test` | Runs the test suite in interactive watch mode |
| `npm run build` | Creates an optimised production build in the `build/` folder |

## Deploying

After running `amplify push`, deploy the frontend to Amplify Hosting:

```bash
npm run build
amplify publish
```

## Project Structure

```
src/
  App.js          # Main component — fetches rover state and subscribes to updates
  Rover.js        # Rover component (in progress)
  graphql/
    queries.js    # getRover, listRovers
    mutations.js  # createRover, updateRover, deleteRover
    subscriptions.js  # onCreateRover, onUpdateRover, onDeleteRover
amplify/
  backend/
    api/          # AppSync GraphQL schema
    auth/         # Cognito user pool configuration
    function/     # Lambda function that updates rover state from the Pi
    storage/      # S3 bucket for rover images
    hosting/      # Amplify Hosting configuration
```
