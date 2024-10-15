import React, { useEffect, useState } from "react";
import { PlusCircle, Edit2, Trash2, ShoppingBag, DollarSign, Package, X } from "lucide-react";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/admin/product");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/admin/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (response.ok) {
      alert("Product added successfully!");
      const updatedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, updatedProduct]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: "",
      });
    }
  };

  const handleEditProduct = async (productId, updatedFields) => {
    const response = await fetch(`/api/admin/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, ...updatedFields } : product
        )
      );
      setEditingProductId(null);
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/admin/product/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        alert(data.message);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error: {error}
      </div>
    );

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-700 flex items-center justify-center">
        <ShoppingBag className="mr-2" /> Manage Products
      </h1>

      <form
        onSubmit={handleAddProduct}
        className="mb-12 bg-green-50 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-green-700 flex items-center">
          <PlusCircle className="mr-2" /> Add New Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <input
            type="number"
            name="stock"
            placeholder="Available Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          ></textarea>
          <input
            type="text"
            name="images"
            placeholder="Image URLs (comma-separated)"
            value={newProduct.images}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center"
        >
          <PlusCircle className="mr-2" /> Add Product
        </button>
      </form>

      {Object.entries(productsByCategory).map(
        ([category, categoryProducts]) => (
          <div key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-green-700 border-b-2 border-green-500 pb-2 flex items-center">
              <Package className="mr-2" /> {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categoryProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
                >
                  <div>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-4 transition-all duration-300 hover:opacity-90"
                    />
                    {editingProductId === product._id ? (
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                          handleEditProduct(product._id, {
                            name: e.target.value,
                          })
                        }
                        className="text-xl font-semibold text-green-700 mb-2 w-full border-b border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                      />
                    ) : (
                      <h3 className="text-xl font-semibold text-green-700 mb-2">
                        {product.name}
                      </h3>
                    )}
                    {editingProductId === product._id ? (
                      <textarea
                        value={product.description}
                        onChange={(e) =>
                          handleEditProduct(product._id, {
                            description: e.target.value,
                          })
                        }
                        className="text-green-700 opacity-80 mb-3 w-full border border-green-500 rounded p-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                      />
                    ) : (
                      <p className="text-green-700 opacity-80 mb-3">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      {editingProductId === product._id ? (
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) =>
                            handleEditProduct(product._id, {
                              price: e.target.value,
                            })
                          }
                          className="text-lg font-bold text-green-700 w-1/2 border-b border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                        />
                      ) : (
                        <p className="text-lg font-bold text-green-700 flex items-center">
                          <DollarSign className="mr-1" size={18} />{product.price}
                        </p>
                      )}
                      {editingProductId === product._id ? (
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) =>
                            handleEditProduct(product._id, {
                              stock: e.target.value,
                            })
                          }
                          className="text-sm text-green-700 opacity-70 w-1/2 border-b border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                        />
                      ) : (
                        <p className="text-sm text-green-700 opacity-70 flex items-center">
                          <Package className="mr-1" size={14} /> Stock: {product.stock}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300 flex items-center"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Trash2 className="mr-1" size={16} /> Delete
                      </button>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
                        onClick={() => {
                          if (editingProductId === product._id) {
                            setEditingProductId(null);
                          } else {
                            setEditingProductId(product._id);
                          }
                        }}
                      >
                        {editingProductId === product._id ? (
                          <>
                            <X className="mr-1" size={16} /> Cancel
                          </>
                        ) : (
                          <>
                            <Edit2 className="mr-1" size={16} /> Edit
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductsPage;