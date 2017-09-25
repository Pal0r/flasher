import React from 'react'
import { shallow, mount } from 'enzyme'
import Input from "react-toolbox/lib/input/Input";
import { Provider } from 'react-redux'
import { Col, Row } from 'react-grid-system'



import Login from './login'
import store from '../../store'


describe('<Login /> Component', () => {
  let loginComponent, mountedLoginComponent
  beforeEach(()=>{
    loginComponent = (
      <Provider store={store}>
        <Login />
      </Provider>
    )
    mountedLoginComponent = shallow(loginComponent)
  })
  it('Should contain 2 input fields', () => {
    console.log(mountedLoginComponent.instance().find(Col))
    expect(mountedLoginComponent.find(Input).length).toEqual(2)
  })
})