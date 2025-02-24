// import {Component} from 'react'
// import CartContext from '../context/CartContext'
// import Header from '../Header'
// import Slidable from '../Slidable'
// import Category from '../Category'

// import './index.css'

// class Home extends Component {
//   state = {
//     restaurantMenuList: [],
//     cartCount: 0,
//     cartItems: {},
//     selectedCategory: null,
//     quantity: 0,
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
//           categoryDishes: category.category_dishes.map(dish => ({
//             dishId: dish.dish_id, // Convert snake_case to camelCase
//             dishName: dish.dish_name,
//             dishImage: dish.dish_image,
//             quantity: dish.quantity,
//             dishPrice: dish.dish_price,
//             dishCurrency: dish.dish_currency,
//             dishCalories: dish.dish_calories,
//             dishDescription: dish.dish_description,
//             dishAvailability: dish.dish_Availability,
//           })),
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
//       <CartContext.Consumer>
//         {({addCartItem, cartList}) => {
//           return (
//             <div>
//               <Header />

//               <div className="restaurant-heading">
//                 <h1 className="restaurant-name">{restaurantName}</h1>
//                 <div className="myorder-cart">
//                   <p className="myorder">My Orders</p>
//                   <p>
//                     Cart:<span className="cartCount"> {cartList.length}</span>
//                   </p>
//                 </div>
//               </div>

//               <Slidable
//                 restaurantMenuList={restaurantMenuList}
//                 onCategorySelect={this.handleCategorySelect}
//                 selectedCategory={selectedCategory}
//               />
//               <Category
//                 restaurantMenuList={restaurantMenuList}
//                 selectedCategory={selectedCategory}
//                 updateCartCount={this.updateCartCount}
//                 addCartItem={addCartItem}
//               />
//             </div>
//           )
//         }}
//       </CartContext.Consumer>
//     )
//   }
// }

// export default Home
import {useState, useEffect} from 'react'

import Header from '../Header'
import DishItem from '../DishItem'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const [cartItems, setCartItems] = useState([])

  const addItemToCart = dish => {
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = dish => {
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExists) {
      setCartItems(prev =>
        prev
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      )
    }
  }

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = getUpdatedData(data[0].table_menu_list)

    setResponse(updatedData)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onUpdateActiveCategoryIdx = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(eachCategory => {
      const onClickHandler = () =>
        onUpdateActiveCategoryIdx(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button
            type="button"
            className="mt-0 mb-0 ms-2 me-2 tab-category-button"
          >
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="m-0 d-flex flex-column dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home-background">
      <Header cartItems={cartItems} />
      <ul className="m-0 ps-0 d-flex tab-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}

export default Home
