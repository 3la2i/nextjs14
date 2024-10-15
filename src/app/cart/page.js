"use client"
import React from 'react';
import { useCart } from '../context/cartcontext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    console.log('CartPage mounted, current cart:', cart);
  }, []);

  React.useEffect(() => {
    console.log('Cart updated in CartPage:', cart);
  }, [cart]);

  if (!isClient) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#a2e08ff3]"></div>
    </div>;
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-[#a2e08ff3] shadow-text">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-2xl text-[#a2e08ff3] font-semibold">Your cart is empty</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cart.map((product) => (
                <div key={product._id} className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                  <img src={product.images[0]} alt={product.name} className="w-full h-48 object-contain rounded-md mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-lg font-bold text-[#a2e08ff3] mb-4">${product.price}</p>
                  <button
                    className="mt-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="text-2xl font-bold text-[#a2e08ff3] mt-8 text-center">
              Total Price: ${totalPrice()}
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                className="bg-[#a2e08ff3] hover:bg-[#588b49f3] text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link href="/checkout">
                <button className="bg-[#a2e08ff3] hover:bg-[#588b49f3] text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}