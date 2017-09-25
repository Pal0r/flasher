import React, { Component} from 'react';
import { Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button/Button'
import EditCard from '../card/editCard'
import { WarningButton, ErrorButton } from '../buttons'

import * as cardStyles from './card.css'

import { deleteCard, filterCards } from '../../actions/cardActions'


export class FlashCardContainer extends Component {
  render(){
    const { deleteCard, filterCards, cardsByHash, jwtToken, cardsById } = this.props
    return (
      <Row>
        <Col lg={4} xl={4}/>
        {cardsById.map((card_id, index) =>
          (cardsByHash[card_id].visible ?
            <FlashCard
              key={index}
              deleteCard={ () => deleteCard(jwtToken, card_id) }
              toggleNext={cardsById[index + 1 ] ? () => filterCards( card_id, cardsById[index + 1 ]) : ''}
              togglePrevious={cardsById[index - 1] ? () => filterCards(card_id, cardsById[index - 1]) : ''}
              card={cardsByHash[card_id]}
            /> : ''
          )
        )}
      </Row>
    )
  }
}

export const CardContainer = ({card}) => (
  <Card style={{height: '200px'}}>
    <CardTitle title={ card.title } subtitle={ card.subject }/>
    <CardText>{ card.body }</CardText>
  </Card>
)


export class FlashCard extends Component {
  constructor(){
    super()
    this.state = {
      edit: false
    }
  }
  toggleEdit = () => {
    this.setState({edit: !this.state.edit})
  }
  render() {
    const {card, deleteCard, toggleNext, togglePrevious} = this.props
    return (
      <Col lg={4} xl={4} className="margin-t-md">
        {this.state.edit ? <EditCard card={card} toggleEdit={() => this.toggleEdit() } /> : <CardContainer card={card}/>}
        <Row>
          <Col className={cardStyles.cardColContainer}>
            {togglePrevious ? <Button label="Previous" onClick={togglePrevious}/> : ''}
            {this.state.edit ? '' : <WarningButton label="edit" onClick={this.toggleEdit}/>}
            <ErrorButton label="delete" onClick={deleteCard} />
            {toggleNext ? <Button label="Next" onClick={toggleNext}/> : ''}
          </Col>
        </Row>
      </Col>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    jwtToken: state.auth.token,
    cardsById: state.cards.cardsById,
    cardsByHash: state.cards.cardsByHash
  }
}

export default connect(mapStateToProps, { deleteCard, filterCards })(FlashCardContainer)