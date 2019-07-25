import React, {useReducer}  from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {

  ADD_CONTACT,
  GET_CONTACTS,
  CONTACT_ERROR,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER

} from '../types'
import axios from 'axios';

const ContactState = props => {

  const initialState = {

    contacts: null,
    current: null,
    filter: null,
    error: null,
    loading: true,
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const getContacts = async () => {

    try {

      const res = await axios.get('/api/contacts')
    
      dispatch({type: GET_CONTACTS, payload: res.data})
      
    } catch (err) {
      
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });

    }

  }

  

  const addContact = async contact => {

    const config = {

      headers: {

        'Content-Type': 'application/json'
      }
    }

    try {

      const res = await axios.post('/api/contacts', contact, config)
    
      dispatch({type: ADD_CONTACT, payload: res.data})
      
    } catch (err) {
      
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });

    }

  }


  const updateContact = async contact => {

    const config = {

      headers: {

        'Content-Type': 'application/json'
      }
    }

    try {

      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
    
      dispatch({type: UPDATE_CONTACT, payload: res.data})
      
    } catch (err) {
      
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });

    }

  }



  const deleteContact = async id => {


    try {

      await axios.delete(`/api/contacts/${id}`)
    
      dispatch({type: DELETE_CONTACT, payload: id});

      
    } catch (err) {
      
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });

    }
    
    

  }


  const setCurrent = contact => {
    
    dispatch({type: SET_CURRENT, payload: contact})

  }

  const clearCurrent = () => {
    
    dispatch({type: CLEAR_CURRENT})

  }


  

  const filterContacts = text => {

    dispatch({type: FILTER_CONTACTS, payload: text})

  }

  const clearFilter = () => {

    dispatch({type: CLEAR_FILTER})

  }

  const clearContacts = () => {
    
    dispatch({type: CLEAR_CONTACTS})

  }



  return (

    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        error: state.error,
        addContact,
        getContacts,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
        
      }}
    >
      {props.children}
    </ContactContext.Provider>

  )

}

export default ContactState;