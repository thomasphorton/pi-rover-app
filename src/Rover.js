import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';

import awsconfig from './aws-exports';

import '@aws-amplify/ui/dist/style.css';

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsconfig);

class Rover extends React.Component(props) {

}

export default Rover
