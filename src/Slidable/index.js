import './index.css'

const Slidable = ({restaurantMenuList, onCategorySelect, selectedCategory}) => {
  if (restaurantMenuList.length === 0) {
    console.log('Rendered Categories:', restaurantMenuList)

    return <p>Loading categories...</p>
  }

  return (
    <div className="slidable-container">
      {restaurantMenuList.length > 0 ? (
        restaurantMenuList.map(category => (
          <button
            key={category.menuCategoryId}
            className={
              category.menuCategoryId === selectedCategory ? 'active-tab' : ''
            }
            onClick={() => onCategorySelect(category.menuCategoryId)}
          >
            {category.menuCategoryName}
          </button>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  )
}

export default Slidable
