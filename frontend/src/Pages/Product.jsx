import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import { ShopContext } from '../Context/ShopContext';  // Import ShopContext
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);  // Use useContext correctly
  const { productId } = useParams();  // Use useParams correctly
  const product = all_product.find((e) => e.id === Number(productId));

  // Filter related products based on category
  const relatedProducts = all_product.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox /> 
      {/* Pass the filtered related products to the RelatedProducts component */}
      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default Product;
