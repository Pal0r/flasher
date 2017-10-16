import React, { Component } from 'react';

import LayoutContainer from './components/layout';
import Routes from './routes'

class App extends Component {

  render(){
    return(
      <LayoutContainer>
        <Routes />
      </LayoutContainer>
    )
  }
}

export default App