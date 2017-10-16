import React, { Component } from 'react';
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, logoutUser } from '../../actions/loginActions';
import { Button } from 'react-toolbox/lib/button'
import Input from "react-toolbox/lib/input/Input";


export const renderField = field => <Input {...field.input} type={field.type} />  // type was not mapping in spread operator.

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps, this.props.cookies);
  }
  render() {
    const { handleSubmit, valid } = this.props

    return (
      <Row>
        <Col lg={4} xl={4}/>
        <Col lg={4} xl={4}>
          {this.props.authenticated ? <h2>You Are Logged In</h2> : <h2>Please Login</h2>}
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.props.errorMessage ? <span><strong>Error!</strong> <span id="errorMessage">{this.props.errorMessage}</span></span> : ''}
            <Row>
              <Col>
                <Field
                  name="email"
                  component={ renderField }
                  type="text"
                  label="Email"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  name="password"
                  component={ renderField }
                  type="password"
                  label="Password"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button disabled={!valid} type="submit" primary raised label="Login" />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

const form = reduxForm({
  form: 'login'
})

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { loginUser, logoutUser })(form(Login));