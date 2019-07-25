import React, {useContext, Fragment, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {

  const contactContext = useContext(ContactContext);

  const {contacts, filter, getContacts, loading} = contactContext;

  useEffect(() => {
    
    getContacts();

    // eslint-disable-next-line
  }, [])

  if(contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Add Contact.</h4>
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (

      filter !== null ? filter.map(contact => (
        <ContactItem key={contact._id} contact={contact} />
      )) : contacts.map(contact => (
        <ContactItem key={contact._id} contact={contact} />
      ))
      ) : <Spinner />}
      
    </Fragment>
  )
}

export default Contacts
