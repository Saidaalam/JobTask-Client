import { useState, useEffect } from 'react';

const Category = ({ categoryName }) => {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortOption, setSortOption] = useState('NewestFirst');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryName]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await fetch('https://job-task-server-site-eta.vercel.app/category');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
        setError(null);
      } else {
        setProducts([]);
        setError('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    }
  };

  const filteredProducts = products.filter(product => {
    return (
      product.categoryName === categoryName &&
      (selectedBrand ? product.brand === selectedBrand : true) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedPriceRange ? (
        product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
      ) : true)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'LowToHigh') return a.price - b.price;
    if (sortOption === 'HighToLow') return b.price - a.price;
    if (sortOption === 'NewestFirst') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === 'OldestFirst') return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Products</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="border p-2 rounded-lg bg-sky-700 text-white focus:ring-blue-500 transition"
        >
          <option value="">Category</option>
          <option value="Laptops">Laptops</option>
          <option value="Monitors">Monitors</option>
          <option value="Headphones">Headphones</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Smart Home">Smart Home</option>
          <option value="Kitchen Appliances">Kitchen Appliances</option>
          <option value="Gaming">Gaming</option>
          <option value="Cameras">Cameras</option>
          <option value="Accessories">Accessories</option>
        </select>
        
        <select
          onChange={(e) => setSelectedBrand(e.target.value)}
          value={selectedBrand}
          className="border p-2 rounded-lg bg-sky-700 text-white focus:ring-blue-500 transition"
        >
          <option value="">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Sony">Sony</option>
          <option value="Dell">Dell</option>
          <option value="Amazon">Amazon</option>
          <option value="Canon">Canon</option>
          <option value="KitchenAid">KitchenAid</option>
        </select>

        <select
          onChange={(e) => {
            const value = e.target.value;
            setSelectedPriceRange(value ? JSON.parse(value) : null);
          }}
          value={selectedPriceRange ? JSON.stringify(selectedPriceRange) : ''}
          className="border p-2 rounded-lg bg-sky-700 text-white focus:ring-blue-500 transition"
        >
          <option value="">All Prices</option>
          <option value="[1,500]">1-500 TK</option>
          <option value="[500,1000]">500-1000 TK</option>
          <option value="[1000,1500]">1000-1500 TK</option>
          <option value="[1500,2000]">1500-2000 TK</option>
        </select>

        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          className="border p-2 rounded-lg bg-sky-700 text-white focus:ring-blue-500 transition"
        >
          <option value="NewestFirst">CreatedAt: Newest First</option>
          <option value="OldestFirst">CreatedAt: Oldest First</option>
          <option value="LowToHigh">Price: Low to High</option>
          <option value="HighToLow">Price: High to Low</option>
        </select>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <figure>
                <img
                  className="h-60 w-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
              </figure>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <div className="text-gray-600 mb-2">Brand: {product.brand}</div>
                <div className="text-gray-600 mb-2">Category: {product.category}</div>
                <div className="text-gray-800 font-bold mb-2">Price: {product.price} TK</div>
                <div className="text-gray-500">
                  Date Added: {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
