import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = async (page = 1, search = '') => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://job-task-server-site-eta.vercel.app/product?page=${page}&search=${search}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            if (Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setProducts([]);
            }
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Choose the Product</h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="border border-gray-300 p-3 w-full max-w-lg rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {isLoading ? (
                <div className="text-center text-xl text-gray-600">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {products.map((product) => (
                        <div key={product._id} className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            <figure>
                                <img className="h-64 w-full object-cover" src={product.image} alt={product.name} />
                            </figure>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                                <div className="text-gray-600 mt-2">Brand: {product.brand}</div>
                                <div className="text-gray-600 mt-1">Category: {product.category}</div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-lg font-semibold text-blue-500">Price: {product.price} TK</div>
                                    <Link to={`/productDetails/${product._id}`} className="btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold text-gray-700">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
