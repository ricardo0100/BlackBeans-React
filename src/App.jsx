import { useState } from 'react'
import './App.css'
import AccountsList from './Accounts/AccountsList'
import './bootstrap/bootstrap.min.css'
import './bootstrap/bootstrap.min.js'

function App() {

  const [index, setIndex] = useState(2);

  function SelectedTab() {
    switch (index) {
      case 0: return <p>Home</p>
      case 1: return <p>Items</p>
      case 2: return <AccountsList />
      case 3: return <p>Categories</p>
    }
  }

  let homeActive = 'nav-link' + (index == 0 ? ' active' : '');
  let itemActive = 'nav-link' + (index == 1 ? ' active' : '');
  let accountsActive = 'nav-link' + (index == 2 ? ' active' : '');
  let categoriesActive = 'nav-link' + (index == 3 ? ' active' : '');

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <div className='container'>
          <a className='navbar-brand' href='#'>Black Beans</a>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className={homeActive} href='#' onClick={ () => setIndex(0) }>Home</a>
              </li>
              <li className='nav-item'>
                <a className={itemActive} href='#' onClick={ () => setIndex(1) }>Items</a>
              </li>
              <li className='nav-item'>
                <a className={accountsActive} href='#' onClick={ () => setIndex(2) }>Accounts</a>
              </li>
              <li className='nav-item'>
                <a className={categoriesActive} href='#' onClick={ () => setIndex(3) }>Categories</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SelectedTab />
    </div>
  )
}

export default App
