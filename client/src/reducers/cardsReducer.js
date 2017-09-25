import * as Actions  from '../constants/actionTypes'

const INITIAL_STATE = {
  cardsByHash: {},
  cardsById: [],
  createFailureMessage: '',
  loading: true
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case Actions.CREATE_CARD_SUCCEEDED:
      return {...state, cards: action.payload}
    case Actions.RETRIEVE_CARDS_SUCCEEDED:
      return {...state, cardsByHash: action.cardsByHash, cardsById: action.cardsById, loading: false, message: ''}
    case Actions.RETRIEVE_CARDS_FAILED:
      return { ...state, loading: false, message: "Failed to retrieve cards" }
    case Actions.CREATE_CARD_FAILED:
      return { ...state, createFailureMessage: "There was an error saving", loading: false}
    // TODO: Investigate action creator for this
    case Actions.DELETE_CARD_SUCCEEDED:
      const prunedCardIds = state.cardsById.filter(card_id => {
        return card_id !== action.card_id // return all the items not matching the action.id
      })
      delete state.cardsByHash[action.card_id] // delete the hash associated with the action.id
      const prunedCardsByHash = {...state.cardsByHash}
      // Set the next card as visible
      prunedCardsByHash[prunedCardIds[0]].visible = true
      return {...state, cardsById: prunedCardIds, cardsByHash: prunedCardsByHash}
    case Actions.FILTER_CARDS:
      const filteredCardsByHash = {}
      // eslint-disable-next-line
      Object.keys(state.cardsByHash).map((id) =>{
        filteredCardsByHash[id] = state.cardsByHash[id]
        if(id === action.previous_card_id){ return filteredCardsByHash[id].visible = false}
        if(id === action.next_card_id){ return filteredCardsByHash[id].visible = true}
      })
      return {...state, cardsByHash: filteredCardsByHash}

    case Actions.EDIT_CARD_SUCCEEDED:
      const updatedCardsByHash = {...state.cardsByHash}

      action.edited_card['visible'] = true
      updatedCardsByHash[action.edited_card._id] = action.edited_card
      return {...state, cardsByHash: updatedCardsByHash}

    case Actions.EDIT_CARD_FAILED:
      return {...state, error: action.error}
    default:
      return state
  }
}