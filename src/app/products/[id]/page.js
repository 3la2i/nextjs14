"use client"
import React from 'react';
import { notFound } from 'next/navigation';
import { useCart } from '../../context/cartcontext';  // Make sure this path is correct
import Swal from 'sweetalert2';

export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const [product, setProduct] = React.useState(null);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const fetchProduct = async () => {
      const { id } = params;
      
      if (!id || id === 'undefined') {
        return notFound();
      }
      
      try {
        console.log(`Fetching product with ID: ${id}`);
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            return notFound();
          }
          throw new Error('Failed to fetch product');
        }
        
        const productData = await res.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error in ProductPage:', error);
        setError('Error loading product. Please try again later.');
      }
    };
    
    fetchProduct();
  }, [params]);
   
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      
      // Display a SweetAlert notification
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added to your cart!`,
        confirmButtonText: 'OK',
      });
      
      console.log(`Added ${product.name} to cart`);
    }
  };
      
  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl bg-white p-6 rounded-lg shadow-lg">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-[#82f5a5] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"> {/* Adjusted card size */}
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-64 w-full object-cover md:h-full md:w-64"  // Made image larger
                src={product.images[0]}
                alt={product.name}
              />
            </div>
            <div className="p-10">  {/* Increased padding for more space */}
              <div className="uppercase tracking-wide text-sm text-[#82f5a5] font-semibold">
                {product.category}
              </div>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">{product.name}</h1>  {/* Increased font size */}
              <p className="mt-4 text-gray-600">{product.description}</p>  {/* Added more space to description */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[#4caf50] font-extrabold text-2xl">${product.price}</span>  {/* Larger price font */}
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
              </div>
              <div className="mt-8">  {/* Increased space for the button */}
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#82f5a5] hover:bg-[#4caf50] text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}