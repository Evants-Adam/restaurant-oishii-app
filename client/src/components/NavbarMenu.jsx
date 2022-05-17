// Import Syntax
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// ## Component Navbar Menu ##
export default function NavbarMenu() {
  const history = useHistory()
  const [isLogin] = useState(() => {
    if (!localStorage.getItem('access_token')) {
      return false
    } else {
      return true
    }
  });

  // ## Function ##
  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('access_token')
  };

  // Render Component
  return (
    <>
      <header id="topnav" className="defaultscroll scroll-active active scroll">
        <div className="container">
          <div>
            <a className="logo">
                <img src="" alt="" className="logo-dark" height="50" />
            </a>
          </div>
          <div id="navigation">
            <ul className="navigation-menu">
              <li className="has-submenu">
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  history.push('/home')}
                }>Home</a>
              </li>
              { !isLogin ? '' : 
              <li className="has-submenu">
              <a>Action</a><span className="menu-arrow"></span>
              <ul className="submenu">
                <li><a href="" onClick={(e) => {
                  e.preventDefault();
                  history.push('/orders')}
                }>View My Order</a></li>
                <li><a href="" onClick={(e) => {
                  handleLogOut(e)
                  history.push('/login')}
                }>Sign Out</a></li>
              </ul>
              </li>
              }
              { isLogin ? '' : 
              <li className="has-submenu">
              <a href="" onClick={(e) => {
                handleLogOut(e)
                history.push('/login')}
              }>Login / Register</a>
              </li>
              }
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}