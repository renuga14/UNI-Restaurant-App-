// import {Component} from 'react'

// import Slidable from './Slidable'
// import Category from './Category'

// import './App.css'

// class App extends Component {
//   state = {
//     restaurantMenuList: [],
//     cartCount: 0,
//     cartItems: {},
//     selectedCategory: null,
//   }

//   componentDidMount() {
//     this.getProducts()
//   }

//   getProducts = async () => {
//     try {
//       const restrantantApi =
//         'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

//       const response = await fetch(restrantantApi)
//       if (response.ok) {
//         const fetchedData = await response.json()
//         const restaurantName = fetchedData[0]?.branch_name || 'Nxt Cafe'
//         this.setState({restaurantName})

//         const updatedData = fetchedData[0].table_menu_list.map(category => ({
//           menuCategoryId: category.menu_category_id,
//           menuCategoryName: category.menu_category,
//           categoryDishes: category.category_dishes || [],
//         }))

//         this.setState({
//           restaurantMenuList: updatedData,
//           selectedCategory:
//             updatedData.length > 0 ? updatedData[0].menuCategoryId : null,

//           restaurantName,
//         })
//         console.log('updatedData', updatedData)
//       } else {
//         console.error('Failed to fetch data')
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error)
//     }
//   }

//   updateCartCount = change => {
//     this.setState(prevState => ({
//       cartCount: change,
//     }))
//   }

//   handleCategorySelect = menuCategoryId => {
//     this.setState({selectedCategory: menuCategoryId})
//   }

//   render() {
//     const {restaurantMenuList, cartCount, selectedCategory, restaurantName} =
//       this.state

//     return (
//       <div>
//         <div className="restaurant-heading">
//           <h1 className="restaurant-name">{restaurantName}</h1>
//           <div className="myorder-cart">
//             <p className="myorder">My Orders</p>
//             <p>
//               Cart:<span className="cartCount"> {cartCount}</span>{' '}
//             </p>
//           </div>
//         </div>

//         <Slidable
//           restaurantMenuList={restaurantMenuList}
//           onCategorySelect={this.handleCategorySelect}
//           selectedCategory={selectedCategory}
//         />
//         <Category
//           restaurantMenuList={restaurantMenuList}
//           selectedCategory={selectedCategory}
//           updateCartCount={this.updateCartCount}
//         />
//       </div>
//     )
//   }
// }

// export default App
import {useState} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/LoginForm'
import Cart from './components/Cart'

import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

// write your code here
const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')

  const addCartItem = dish => {
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (!isAlreadyExists) {
      setCartList(prev => [...prev, dish])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    }
  }

  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllCartItems = () => setCartList([])

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        restaurantName,
        setRestaurantName,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
