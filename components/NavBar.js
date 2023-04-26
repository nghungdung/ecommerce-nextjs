import React, {useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from "js-cookie"



function NavBar() {
  const router = useRouter()
  const {state, dispatch} = useContext(DataContext)
  const { auth, cart } = state


  const isActive = (r) => {
    if(r === router.pathname){
      return " active"
    }else{
      return ""
    }
  }
  
  const handleLogout = () =>{
    Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: {success: 'Logged out'} })
    return router.push('/')
  }

  const adminRouter = () => {
    return (
      <>
      <li><Link className="dropdown-item" href="/users">Users</Link></li>
      <li><Link className="dropdown-item" href="/create">Products</Link></li>
      <li><Link className="dropdown-item" href="/categories">Categories</Link></li>
      </>
    )
  }

  const loggedRouter = () => {
    return(
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={auth.user.avatar}
        style={{
          borderRadius: '50%', width: '30px', height: '30px',
          transform: 'translateY(-3px)', marginRight: '3px'
        }}/>
        
        {auth.user.name}
        </a>
        <ul className="dropdown-menu" >
          <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
          {
            auth.user.role === 'admin' && adminRouter()
          }
          <li><div className='dropdown-divider'></div></li>
          <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
        </ul>
      </li>
    )
    
  }

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className='container-fluid'>
        <Link className="navbar-brand" href="/">
          E-Commerce
        </Link>      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <Link href="/news" className={"nav-link" + isActive('/news')} >
              <i className='bi bi-newspaper px-1' aria-hidden="true"></i>
              News
            </Link>
            <li className="nav-item">
              
              <Link href="/cart" className={"nav-link" + isActive('/cart')} >
                <i className="bi bi-basket2-fill position-relative px-1" aria-hidden="true">
                  <span className='position-absolute'
                  style={{
                    padding: '3px 6px',
                    background: '#ed143dc2',
                    borderRadius: '50%',
                    top: '-10px',
                    right: '4px',
                    color: 'white',
                    fontSize: '14px'
                  }}>
                    {cart.length}
                  </span>
                </i>
                Cart 
              </Link>
            </li>
            {
              Object.keys(auth).length === 0
              ? <li className="nav-item">
                <Link href="/signin" className={"nav-link" + isActive('/signin')} >
                  <i className="bi bi-person-circle px-1" aria-hidden="true"></i>
                  Sign in 
                </Link>
              </li>
              :loggedRouter()
            }                
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar