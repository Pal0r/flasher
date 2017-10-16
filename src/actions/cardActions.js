import axios from 'axios'
import { push } from 'react-router-redux'
import * as Actions  from '../constants/actionTypes'


const API_URL = 'http://localhost:3000/api'


export const createCard = (flashCard, jwtToken) => {
  return (dispatch) =>(
    axios.post(`${API_URL}/cards/create`, flashCard, {
      headers: { 'Authorization': jwtToken }
    })
      .then(response => {
        dispatch({type: Actions.CREATE_CARD_SUCCEEDED, card: response.data.card })
        dispatch(push('/'))
      })
      .catch(error => {
        dispatch({ type: Actions.CREATE_CARD_FAILED, error})
      })
  )
}

export const getCards = (jwtToken) => {
  return (dispatch) => {
    axios.get(`${API_URL}/cards/all`, {
      headers: { 'Authorization': jwtToken }
    })
      .then(response =>{
        let cardsById = []
        let cardsByHash = {}

        // eslint-disable-next-line
        response.data.cards.map(card => {
          cardsById.push(card._id)
          cardsByHash[card._id] = card
          cardsByHash[card._id]['visible'] = false
        })
        // Set first card to visible
        cardsByHash[cardsById[0]].visible = true
        dispatch(
          {
            type: Actions.RETRIEVE_CARDS_SUCCEEDED,
            cardsById: cardsById,
            cardsByHash: cardsByHash,
            loading: false
          }
        )
      })
      .catch(error => {dispatch({ type: Actions.RETRIEVE_CARDS_FAILED, error: "Failed to retrieve flashcards" })})
  }
}

export const getCard = (jwtToken) => {
  return (dispatch) => {
    axios.get(`${API_URL}/cards/:id`, {
      headers: { 'Authorization': jwtToken }
    })
      .then(response =>{dispatch({ type: Actions.RETRIEVE_CARD_SUCCEEDED, card: response.data.card })})
      .catch(error => {dispatch({ type: Actions.RETRIEVE_CARD_FAILED, error: "Failed to retrieve flashcard" })})
  }
}

export const filterBySubject = (jwtToken) => {
  return (dispatch) => {
    axios.get(`${API_URL}/cards/:subject`, {
      headers: { 'Authorization': jwtToken }
    })
      .then(response =>{
        const cardsById = []
        const cardsByHash = {}

        // eslint-disable-next-line
        response.data.cards.map((card) => {
          cardsById.append(card._id)
          cardsByHash[card._id] = card
        })
        dispatch(
          {
            type: Actions.RETRIEVE_CARD_SUBJECT_SUCCEEDED,
            cardsById: cardsById,
            cardsByHash: cardsByHash,
            loading: false
          }
        )
      })
      .catch(error => {dispatch({ type: Actions.RETRIEVE_CARD_SUBJECT_FAILED, error: "Failed to filter flashcards" })})
  }
}

export const deleteCard = (jwkToken, card_id) => {
  return (dispatch) => {
    axios.delete(`${API_URL}/cards/remove/${card_id}`, {
      headers: { 'Authorization': jwkToken }
    })
      .then(response =>{dispatch({ type: Actions.DELETE_CARD_SUCCEEDED, card_id })})
      .catch(error => {dispatch({ type: Actions.DELETE_CARD_FAILED, error: "Failed to filter flashcards" })})
  }
}

export const editCard = (card, card_id, jwkToken) => {
  return (dispatch) => {
    axios.put(`${API_URL}/cards/edit/${card_id}`, card, {
      headers: { 'Authorization': jwkToken }
    })
      .then(response =>{dispatch({ type: Actions.EDIT_CARD_SUCCEEDED, edited_card: response.data.card })})
      .catch(error => {dispatch({ type: Actions.EDIT_CARD_FAILED, error: "Failed to edit flashcard" })})
  }
}

export const filterCards = (previous_card_id, next_card_id) => {
  return (dispatch) => {
    dispatch({type: Actions.FILTER_CARDS, previous_card_id, next_card_id})
  }
}
