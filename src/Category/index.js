import {useState, useEffect} from 'react'
import './index.css'

const Category = ({restaurantMenuList, selectedCategory, updateCartCount}) => {
  const [cartItems, setCartItems] = useState({})
  const [totalCartCount, setTotalCartCount] = useState(0)

  useEffect(() => {
    const newTotalCartCount = Object.values(cartItems).reduce(
      (total, count) => total + count,
      0,
    )
    setTotalCartCount(newTotalCartCount)
    updateCartCount(newTotalCartCount)
  }, [cartItems])

  if (restaurantMenuList.length === 0) {
    return <p>Loading menu...</p>
  }

  const selectedCategoryDishes =
    restaurantMenuList.find(
      category => category.menuCategoryId === selectedCategory,
    )?.categoryDishes || []

  const handleCountIncrease = dishId => {
    setCartItems(prevItems => ({
      ...prevItems,
      [dishId]: (prevItems[dishId] || 0) + 1,
    }))
  }

  const handleCountDecrease = dishId => {
    setCartItems(prevItems => ({
      ...prevItems,
      [dishId]: Math.max((prevItems[dishId] || 0) - 1, 0),
    }))
  }

  return (
    <div className="category-items-container">
      <ul>
        {selectedCategoryDishes.map(dish => (
          <li className="category-items" key={dish.dish_id}>
            <div className="items-name">
              <h1 className="dish-name">{dish.dish_name}</h1>
              <p className="currency-price">{`${dish.dish_currency} ${dish.dish_price}`}</p>
              <p className="description">{dish.dish_description}</p>
              {!dish.dish_Availability && <p>Not available</p>}
              {dish.addonCat?.length > 0 && (
                <span className="Customizations">Customizations available</span>
              )}

              <div className="handlecount">
                {dish.dish_Availability && (
                  <button
                    type="button"
                    onClick={() => handleCountDecrease(dish.dish_id)}
                  >
                    -
                  </button>
                )}
                <p className="cartItems-count">
                  {cartItems[dish.dish_id] || 0}
                </p>

                {dish.dish_Availability && (
                  <button
                    type="button"
                    onClick={() => handleCountIncrease(dish.dish_id)}
                  >
                    +
                  </button>
                )}
              </div>
            </div>

            <div>
              <p className="calories">{dish.dish_calories} Calories</p>
            </div>

            <div>
              {dish.dish_image && (
                <img src={dish.dish_image} alt={dish.dish_name} width="100" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category
