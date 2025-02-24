// import {Link, withRouter} from 'react-router-dom'

// import Cookie from 'js-cookie'
// import CartContext from '../context/CartContext'
// import './index.css'

// const Header = props => {
//   const onClickLogout = () => {
//     Cookie.remove('jwt_token')
//     const {history} = props
//     history.replace('/login')
//   }

//   const renderCartItemsCount = () => (
//     <CartContext.Consumer>
//       {value => {
//         const {cartList} = value
//         const cartItemsCount = cartList.length

//         return (
//           <>
//             <button type="button" className="cart-button">
//               🛒 Cart <span className="cart-count">{cartItemsCount}</span>
//             </button>
//           </>
//         )
//       }}
//     </CartContext.Consumer>
//   )

//   return (
//     <nav className="nav-header">
//       <div className="nav-content">
//         <img
//           className="website-logo"
//           src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
//           alt="website logo"
//         />
//         <ul className="nav-menu">
//           <li className="nav-menu-item">
//             <Link to="/" className="nav-link">
//               Home
//             </Link>
//           </li>

//           <li className="nav-menu-item">
//             <Link to="/cart" className="nav-link">
//               Cart
//               {renderCartItemsCount()}
//             </Link>
//           </li>
//         </ul>

//         <button
//           type="button"
//           className="logout-mobile-btn"
//           onClick={onClickLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   )
// }
// export default withRouter(Header)
/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'js-cookie'
import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartIcon = () => (
    <div className="cart-icon-link">
      <Link to="/cart">
        <button type="button" className="cart-icon-button" data-testid="cart">
          <AiOutlineShoppingCart className="cart-icon" />
        </button>
      </Link>
      <div className="cart-count-badge d-flex justify-content-center align-items-center">
        <p className="m-0 cart-count">{cartList.length}</p>
      </div>
    </div>
  )

  return (
    <header className="p-4 d-flex flex-row align-items-center nav-header">
      <Link to="/">
        <h1 className="m-0 logo-heading">{restaurantName}</h1>
      </Link>
      <div className="d-flex flex-row align-items-center ms-auto">
        <p className="mt-0 mb-0 me-2 d-none d-sm-block my-orders-text">
          My Orders
        </p>
        <button
          type="button"
          className="btn btn-outline-danger ms-2 me-2 btn-sm"
          onClick={onLogout}
        >
          Logout
        </button>
        {renderCartIcon()}
      </div>
    </header>
  )
}

export default withRouter(Header)
