import React, {useContext, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'


const Navbar = ({title, icon}) => {

  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const {logout, user, isAuthenticated} = authContext;

  const {clearContacts} = contactContext;

  const onLogout = () => {

    clearContacts();
    logout();
    

  }

  const authLinks = (

    <Fragment>
      <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/">Hello {user && user.name}!</Link></li>
      <li className="nav-item"><Link className="nav-link" to="#!" href="#!" onClick={onLogout}><i className="fas fa-sign-out-alt" />{' '}<span className="hide-sm">Logout</span></Link></li>
    </Fragment>

  );

  const guestLinks = (

    <Fragment>
      <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>   
    </Fragment>

  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
    <div className="container">
     
      <Link className="navbar-brand" to="/"><i className={icon}></i> {title}</Link>

      <ul className="navbar-nav">
        {isAuthenticated ? authLinks: guestLinks }
      </ul>
    </div>
  </nav>

  )
}

Navbar.propTypes = {

  title: PropTypes.string.isRequired,
  icon: PropTypes.string

}

Navbar.defaultProps = {

  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"

}


export default Navbar
