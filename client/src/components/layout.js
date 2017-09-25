import React from 'react'

import { Col, Container, Row } from 'react-grid-system'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import Button from 'react-toolbox/lib/button/Button'
import Layout from 'react-toolbox/lib/layout/Layout'
import Panel from 'react-toolbox/lib/layout/Panel'
import Navigation from 'react-toolbox/lib/navigation'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'

import theme from '../react-toolbox/theme';
import './style/base.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import '../react-toolbox/theme.css';
import store from '../store'
import { logoutUser } from '../actions/loginActions'


class FlasherAppBar extends React.Component {
  handleIconClick = () => store.dispatch(push('/'))
  handleLogout = () => this.props.logoutUser()

  render(){
    const { user, authenticated } = this.props
    return (
      <AppBar
        leftIcon="menu"
        onLeftIconClick={this.handleIconClick}
        title="Get Flashed"
      >
        {authenticated ? <span>welcome back {user.firstName}</span>  : ''}
        <Navigation type="horizontal">
          {authenticated ?
            <div>
              <Link to="/card/create" className="margin-r-lg">Create</Link>
              <Button primary raised onClick={this.handleLogout} label="Logout"/>
            </div>
             : ''
          }
        </Navigation>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  }
)

const FlasherAppBarWithState = connect(mapStateToProps, { logoutUser })(FlasherAppBar)

export default props => (
    <ThemeProvider theme={theme}>
      <Layout>
        <Panel>
          <FlasherAppBarWithState />
          <Container fluid={true}>
            <Row>
              <Col xl={12} lg={12}>
                <div className="layout-col-container">
                  {props.children}
                </div>
              </Col>
            </Row>
          </Container>
        </Panel>
      </Layout>
    </ThemeProvider>
)