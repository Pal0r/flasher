import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { Circle } from 'better-react-spinkit'

import { getCards } from '../../actions/cardActions'
import FlashCardContainer from '../card/flashcard'


class HomePage extends Component {
  componentDidMount = () => {
    // setTimeout(() => (
    //   this.props.getCards(this.props.jwtToken)
    // ), 2000)
    this.props.getCards(this.props.jwtToken)
  }

  render() {
    return (
      <Row>
        {this.props.loading ?
          <div>
            <Col lg={4} />
            <Col lg={4} xl={4}>
              <Circle size={400} color={'grey'} />
            </Col>
          </div>
         :
          <FlashCardContainer />
        }
      </Row>
    );
  }
}
const mapStateToProps = (state) =>({
  jwtToken: state.auth.token,
  loading: state.cards.loading
})

export default connect(mapStateToProps, { getCards })(HomePage);