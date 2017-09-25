import React, { Component } from 'react';
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createCard } from '../../actions/cardActions';
import { Button } from 'react-toolbox/lib/button'
import Input from "react-toolbox/lib/input/Input";


const renderField = field => <Input {...field.input} />

const renderTextArea = field => (
  <Input
    multiline={true}
    rows={4}
    {...field.input}
  />
)

class CreateCard extends Component {
  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }
  handleFormSubmit = (formProps) => {
    this.props.createCard(formProps, this.props.jwtToken)
  }

  render() {
    const { valid, createFailureMessage, handleSubmit } = this.props;

    return (
      <Row>
        <Col lg={4} xl={4}/>
        <Col lg={4} xl={4}>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {createFailureMessage ? <h4>{createFailureMessage}</h4> : ''}
            <Row>
              <Col>
                <Field
                  name="title"
                  component={ renderField }
                  type="text"
                  label="Title"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  name="subject"
                  component={ renderField }
                  type="text"
                  label="subject"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  name="body"
                  component={ renderTextArea }
                  type="text"
                  label="Content"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button disabled={!valid} type="submit" primary raised label="Shut Up and Know it" />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

const form = reduxForm({
  form: 'createCard'
})

function mapStateToProps(state) {

  return {
    createFailureMessage: state.cards.createFailureMessage,
    jwtToken: state.auth.token
  };
}

export default connect(mapStateToProps, { createCard })(form(CreateCard));