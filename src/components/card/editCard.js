import React, { Component } from 'react';
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux';
import { Card, CardTitle } from 'react-toolbox/lib/card'
import { Field, reduxForm } from 'redux-form';
import { editCard } from '../../actions/cardActions';
import { Button } from 'react-toolbox/lib/button'
import Input from "react-toolbox/lib/input/Input";


const renderField = (field, card) => <Input {...field.input} />

const renderTextArea = field => (
  <Input
    multiline={true}
    rows={4}
    {...field.input}
  />
)

class EditCard extends Component {
  handleFormSubmit = (formProps) => {
    this.props.editCard(formProps, this.props.card._id, this.props.jwtToken)
    this.props.toggleEdit()
  }

  render() {
    const { valid, createFailureMessage, handleSubmit, card } = this.props;

    return (
      <Row>
        <Col lg={11} xl={11} className="margin-t-lg">
          <Card className='pad-all-lg'>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {createFailureMessage ? <h4>{createFailureMessage}</h4> : ''}
              <CardTitle title='Edit Flash Card' />
              <Row>
                <Col>
                  <Field
                    name="title"
                    type="text"
                    required
                    component={ renderField }
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field
                    name="subject"
                    type="text"
                    required
                    component={ renderField }
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field
                    name="body"
                    component={ renderTextArea }
                    type="text"
                    required
                    placeholder={card.body}
                  />
                </Col>
              </Row>
              <Row className="align-center">
                <Col lg={6} sm={12}>
                  <Button disabled={!valid} type="submit" label="Confirm" />
                </Col>
                <Col lg={6} sm={12}>
                  <Button onClick={this.props.toggleEdit} label="Never mind" />
                </Col>
              </Row>
            </form>
          </Card>
        </Col>
      </Row>
    )
  }
}

const form = reduxForm({
  form: 'editCard',
})

function mapStateToProps(state, ownProps) {
  return {
    createFailureMessage: state.cards.createFailureMessage,
    jwtToken: state.auth.token,
    initialValues: {
      title: ownProps.card.title,
      body: ownProps.card.body,
      subject: ownProps.card.subject
    }
  };
}

export default connect(mapStateToProps, { editCard })(form(EditCard));