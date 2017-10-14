import React from 'react'
import { createMockStore } from 'redux-test-utils'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'
import Input from "react-toolbox/lib/input/Input"
import { Button } from 'react-toolbox/lib/button'


import LoginForm, { renderField } from './login'
import { componentWithStore } from '../../utils/test-utils'


describe('Render Field Input function', () => {
  let field,
    fieldProps = {
      type: 'password',
      input: {
        name: 'password',
        type: 'password',
        label: 'password',
        required: true
      }
    }
  beforeEach(() => {
    field = mount(renderField(fieldProps))
  })
  it('Should render a <Input /> component', () => {
    expect(field.find(Input)).to.have.length(1)
  })

  it('Should pass correct props to dump Input component', () => {
    const shallowField = shallow(renderField(fieldProps))
    expect(shallowField.props().type).to.equal('password')
    expect(shallowField.props().required).to.equal(true)
  })
})

describe('Connected LoginForm', () => {
  let testState, mockStore, props, mountedLoginForm, shallowLoginForm

  beforeEach( () => {
    testState = {
      auth: {
        error: '',
        errorMessage: '',
        message: '',
        authenticated: false,
      }
    }
    props = {
      handleSubmit: sinon.spy(),
      valid: false
    }
    mockStore = createMockStore(testState)
    mountedLoginForm = componentWithStore(<LoginForm {...props}/>, mockStore, true)
    shallowLoginForm = componentWithStore(<LoginForm {...props}/>, mockStore)
  })

  it('Should render `Please Login` when unauthenticated', () => {
    expect(shallowLoginForm.props().authenticated).to.equal(false)
    expect(mountedLoginForm.find('h2').text()).to.equal('Please Login')
  })

  it('Should render `You Are Logged In` when authenticated', () => {
    const authState = {
      auth: {
        error: '',
        errorMessage: '',
        message: '',
        authenticated: true,
        user: {},
        token: 'JWT 123'
      }
    }
    const authStore = createMockStore(authState)
    const mountedAuthenticatedLoginForm = componentWithStore(<LoginForm/>, authStore, true)
    // FIXME: mockStore dispatch `should` be updating state, but it's not.
    // So we're initializing a new store with the expected auth object
    // mockStore.dispatch({type: "AUTH_USER", user: {}, token: ''})
    expect(mountedAuthenticatedLoginForm.find('h2').text()).to.equal('You Are Logged In')
  })

  it('Should not be valid on render', () => {
    expect(mountedLoginForm.find(Button).props().disabled).to.equal(false)
  })

  it('Should call handleSubmit on submit', () => {
    mountedLoginForm.find(Button).simulate('submit')
    expect(props.handleSubmit.called).to.equal(true)
    // Not really a test of the submit dispatch event
    expect(mockStore.isActionTypeDispatched('@@redux-form/REGISTER_FIELD')).to.equal(true)
  })
})
