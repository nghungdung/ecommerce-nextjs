import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function NavBar() {
  const router = useRouter()
  const isActive = (r) => {
    if(r === router.pathname){
      return " active"
    }else{
      return ""
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        E-Commerce
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/cart" className={"nav-link" + isActive('/cart')} >
              <i className="bi bi-basket2-fill" aria-hidden="true"></i>
              Cart 
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/signin" className={"nav-link" + isActive('/signin')} >
            <i className="bi bi-person-circle" aria-hidden="true"></i>
              Sign in 
            </Link>
          </li>
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              User Name
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Profile</a>
              <a className="dropdown-item" href="#">Logout</a>
            </div>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar