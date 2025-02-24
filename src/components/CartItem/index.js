// import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
// import CartContext from '../context/CartContext'
// import './index.css'

// const CartItem = props => (
//   <CartContext.Consumer>
//     {value => {
//       const {
//         removeCartItem,
//         incrementCartItemQuantity,
//         decrementCartItemQuantity,
//       } = value
//       const {cartItemDetails} = props
//       const {dishId, dishName, dishImage, quantity} = cartItemDetails

//       const onRemoveCartItem = () => removeCartItem(dishId)
//       const onIncreaseQuantity = () => incrementCartItemQuantity(dishId)
//       const onDecreaseQuantity = () => {
//         if (quantity > 1) {
//           decrementCartItemQuantity(dishId)
//         }
//       }

//       return (
//         <li className="cart-item">
//           <div className="cart-item-show">
//             <div className="dish-image">
//               <img
//                 className="cart-product-image"
//                 src={dishImage}
//                 alt={dishName}
//                 width="100"
//               />
//             </div>

//             <div className="cart-item-details-container">
//               <p className="cart-product-title">{dishName}</p>
//               <div className="cart-quantity-container">
//                 <button
//                   type="button"
//                   className="quantity-controller-button"
//                   onClick={onDecreaseQuantity}
//                 >
//                   <BsDashSquare color="white" size={12} />
//                 </button>
//                 <p className="quantity">{quantity}</p>
//                 <button
//                   type="button"
//                   className="quantity-controller-button"
//                   onClick={onIncreaseQuantity}
//                 >
//                   <BsPlusSquare color="white" size={12} />
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div>
//             <button
//               type="button"
//               onClick={onRemoveCartItem}
//               className="remove-all-btn"
//             >
//               Remove All
//             </button>
//           </div>
//         </li>
//       )
//     }}
//   </CartContext.Consumer>
// )

// export default CartItem
import {useContext} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = ({cartItemDetails}) => {
  const {
    dishId,
    dishName,
    dishImage,
    quantity,
    dishCurrency,
    dishPrice,
  } = cartItemDetails
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const onIncreaseQty = () => incrementCartItemQuantity(dishId)

  const onDecreaseQty = () => decrementCartItemQuantity(dishId)

  const onRemoveCartItem = () => removeCartItem(dishId)

  return (
    <li className="cart-item-container">
      <img className="cart-item-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details">
        <p className="cart-item-name mb-1">{dishName}</p>
        <p className="dish-currency-price mt-0 mb-2">
          {dishCurrency} {(quantity * dishPrice).toFixed(2)}
        </p>
        <div className="control-btn-group">
          <button type="button" className="control-btn" onClick={onDecreaseQty}>
            -
          </button>
          <p className="cart-item-quantity">{quantity}</p>
          <button type="button" className="control-btn" onClick={onIncreaseQty}>
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className="remove-btn text-danger align-self-center"
        onClick={onRemoveCartItem}
      >
        <FaRegTrashAlt />
      </button>
    </li>
  )
}

export default CartItem
