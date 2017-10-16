import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'


const redirectUser = () => (
  (dispatch) => (
    dispatch(push('/login'))
  )
)


export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.authenticated) {
        this.props.redirectUser()
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return connect(mapStateToProps, { redirectUser })(Authentication);
}