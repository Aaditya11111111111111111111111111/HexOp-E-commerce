import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const normalizeCategory = (category) => {
    const normalized = category.toLowerCase();
    return normalized === 'kids' ? 'kid' : normalized;
  };

  const filteredProducts = all_product.filter(product =>
    normalizeCategory(product.category) === normalizeCategory(props.category)
  );

  return (
    <div className='shop-category'>
      <img className="shopcategory-banner" src={props.banner} alt="Category Banner" />
      
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length > 0 ? '1-' + Math.min(12, filteredProducts.length) : '0'}</span> 
          out of 36 products
        </p>

        {/* Sort Button Aligned to Right */}
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="dropdown icon" />
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <div className="no-products">
            No products found in this category.
          </div>
        )}
      </div>

      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
