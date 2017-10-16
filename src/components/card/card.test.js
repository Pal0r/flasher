import React from 'react'
import { shallow, mount } from 'enzyme'
import { CardTitle } from 'react-toolbox/lib/card'

import {
  CardContainer,
  FlashCardContainer,
  FlashCard,
} from './flashcard'
import EditCard from '../card/editCard'
import { deleteCard, filterCards } from '../../actions/cardActions'

import { WarningButton } from '../buttons'


const cardsById =[123, 1234]
const cardsByHash = {123:{
  subject: 'React',
  title: 'Enzyme Testing With React',
  body: 'Enzyme provides numerous testing utilities'
}, 1234: {
  subject: 'React',
  title: 'Enzyme Shallow Method',
  body: 'Helps ensure you don\'t test child components',
  visible: true
}}
const jwtToken = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTYzN2JiNzk2MTFmYjMy' +
  'MmFlZmNmOGQiLCJmaXJzdE5hbWUiOiJyeWFuIiwibGFzdE5hbWUiOiJwYWxvIiwiZW1haWwiOiJyeWFucGFsb0Bn' +
  'bWFpbC5jb20iLCJyb2xlIjoiTWVtYmVyIiwiaWF0IjoxNTAzNTkwNTU1LCJleHAiOjE1MDM2MDA2MzV9.Vg-HQR7' +
  '9UYb4AcoOxNzZqrhhuTHVzXkhcVdalCjI3s8'


describe('Visibility testing for a FlashCardContainer', () =>{
  let flashCardContainer

  beforeEach(()=>{
    flashCardContainer = shallow(
      <FlashCardContainer
        deleteCard={deleteCard}
        filterCards={filterCards()}
        jwtToken={jwtToken}
        cardsByHash={cardsByHash}
        cardsById={cardsById}
      />
    )
  })

  it('Renders a card flashCardContainer', ()=>{
    expect(flashCardContainer.length).toEqual(1)
  })

  it('Check flashCardContainer receives props', () => {
    //When called on a shallow wrapper, .props() will return values
    // for props on the root node that the component renders,
    // not the component itself. Use instance function.
    const flashCardContainerProps = flashCardContainer.instance().props

    expect(flashCardContainerProps.jwtToken).toBe(jwtToken)
    expect(flashCardContainerProps.deleteCard).toBe(deleteCard)
    expect(flashCardContainerProps.filterCards).toBeDefined()
    expect(flashCardContainerProps.cardsByHash).toEqual(cardsByHash)
    expect(flashCardContainerProps.cardsById).toEqual(cardsById)
  })

  it('Should render (1) visible child FlashCard', ()=>{
    expect(flashCardContainer.find(FlashCard).length).toEqual(1)
  })
})

describe("<CardContainer /> Dumb component", () => {
  const cardObject = cardsByHash[123]
  const card = <CardContainer card={cardObject} />

  it('Should render a card', () => {
    expect(card).toBeDefined()
  })

  it("Should receive a card as props", ()=>{
    expect(card.props.card).toBeDefined()
  })

  it("Should render card object subject text", () => {
    expect(shallow(card).find(CardTitle).props().subtitle).toEqual(cardObject.subject)
  })
})

describe("<FlashCard/> Smart Component", () => {
  let wrapper
  const cardObject = cardsByHash[123]
  const flashCard = <FlashCard
    card={cardObject}
    deleteCard={deleteCard}
    toggleNext={filterCards()}
    togglePrevious={filterCards()}
  />

  beforeEach(()=>{
    wrapper = shallow(flashCard)
  })

  it("Should render a WarningButton/edit button", ()=>{
    expect(wrapper.find(WarningButton).length).toEqual(1)
    expect(wrapper.find(CardContainer).length).toEqual(1)
    expect(wrapper.state('edit')).toBe(false)
  })

  it("Should pass toggleEdit props to the EditCard", () => {
    expect(wrapper.find(CardContainer).props('card')).toBeDefined()
  })

  it("Should display an Edit component on edit click", ()=>{
    let mountedCard = shallow(flashCard)
    let editButton = wrapper.find(WarningButton)

    wrapper.instance().toggleEdit()
    expect(wrapper.state('edit')).toBe(true)
    expect(wrapper.find(EditCard).length).toEqual(1)
    expect(wrapper.find(EditCard).props('toggleEdit')).toBeDefined()
    expect(editButton.length).toEqual(1)

    expect(mountedCard.state('edit')).toBe(false)

    editButton.simulate('click')
    expect(wrapper.state('edit')).toBe(false)

    // CardContainer should also not be present
    expect(wrapper.find(CardContainer).length).toEqual(1)
  })

  it("toggleEdit() should toggle edit state when called", () => {
    wrapper.instance().toggleEdit()
    expect(wrapper.state('edit')).toBe(true)
    wrapper.instance().toggleEdit()
    expect(wrapper.state('edit')).toBe(false)
  })

  it("Displays 'previous' label when togglePrevious is defined", () => {
    expect(wrapper.find("[label='previous']")).toBeDefined()
    expect(wrapper.find("[label='next']")).toBeDefined()
    expect(wrapper.find("[label='delete']")).toBeDefined()
  })
})
