import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

import awsconfig from './aws-exports';

import './App.css';
import '@aws-amplify/ui/dist/style.css';

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

// import Rover from './Rover';

Amplify.configure(awsconfig);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      update: 0,
      rover: {}
    }; 
  }

  componentDidMount = async () => {
    const rover = await API.graphql(graphqlOperation(queries.getRover, { id: '28eadfb3-6e52-48a7-8122-4385edaab937' }))
    console.log(rover.data.getRover.imageURL);
    this.setState({ rover: rover.data.getRover });

    this.subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateRover)
    ).subscribe({
      next: (roverData) => {
        let data = roverData.value.data.onUpdateRover;
        console.log('onUpdate');
        console.log(data)
        this.setState({rover: data})
      }
    });
  }
  
  addRover = async () => {
    console.log('adding rover');
    
    let roverDetails = {
      name: "Rover1",
      imageURL: "foo"
    };

    const resp = await API.graphql(graphqlOperation(mutations.createRover, { input: roverDetails }));
    console.log(JSON.stringify(resp));
  }

  updateRover = async () => {

    let imageURL = '';

    if (this.state.update == 0) {
      imageURL = 'http://tph-bucket.s3-website-us-west-2.amazonaws.com/dogs-2.jpg';
      this.setState({ update: 1 });
    }
    else {
      imageURL = 'http://tph-bucket.s3-website-us-west-2.amazonaws.com/dogs-1.jpg';
      this.setState({ update: 0 });
    }

    let roverDetails = {
      id: '28eadfb3-6e52-48a7-8122-4385edaab937',
      imageURL
    }

    const resp = await API.graphql(graphqlOperation(mutations.updateRover, { input: roverDetails }));
    console.log(JSON.stringify(resp));
  }

  listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(queries.listRovers));
    console.log(JSON.stringify(allTodos));
  };
  
  render() {
    return (
      <div className="App">
        <button onClick={this.listQuery}>List Rovers</button>
        <button onClick={this.updateRover}>Update Rover</button>
        { this.state.rover &&
          <img src={this.state.rover.imageURL}></img>
        }
      </div>
    );
  }

}

export default withAuthenticator(App, true);
