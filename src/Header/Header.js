import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestAsyncLogin } from '../reducers/authReducers'

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import { Panel, Sidebar, NavDrawer } from 'react-toolbox';
import Layout from 'react-toolbox/lib/layout/Layout';
import IconButton from 'react-toolbox/lib/button/Button'
import Button from 'react-toolbox/lib/button'
import theme from './header.css';

class LayoutTest extends React.Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false
  };

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };

  render() {
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive}
                   pinned={this.state.drawerPinned} permanentAt='xxxl'
                   onOverlayClick={ this.toggleDrawerActive }>
          <p>
            This is a side drawer
          </p>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } theme={theme}/>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            <h1>Main Content</h1>
            <p>{this.props.authenticated ?
              'You are logged in!' :
              <Button disabled={this.props.isAuthenticating}
                      onClick={this.props.requestAsyncLogin}
                      label="Login"
                      primary
                      raised
              />
              }
            </p>
            <Checkbox label='Pin drawer' checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />
            <Checkbox label='Show sidebar' checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />
          </div>
        </Panel>
        <Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' accent onClick={ this.toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  isAuthenticating: state.auth.isAuthenticating
})

const mapDispatchToProps = dispatch => bindActionCreators({
  requestAsyncLogin
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutTest)