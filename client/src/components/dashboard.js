import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link'
import Button from 'react-toolbox/lib/button/Button'


class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/login"><Button raised label="Login" accent/></Link>
        {this.props.user ? <h4>Hi {this.props.user.firstName}!</h4> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    content: state.auth.content ,
    jwtToken: state.auth.token,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Dashboard);