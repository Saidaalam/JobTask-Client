import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://job-task-server-site-eta.vercel.app/product")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, []);

    const product = products.find(product => product._id === id);

    if (!product) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    const { image, name, description, brand, category, price, ratings,createdAt } = product;

    return (
        <div className='dark:bg-[#120505] dark:text-white'>
            <h1 className="text-2xl font-bold mb-4 text-center">See the Product Details</h1>
            <div className="card card-side bg-base-100 shadow-xl p-4">
                <figure>
                    <img className="w-2/3 rounded-xl" src={image} alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold">{name}</h2>
                    <p className="mt-4 text-lg"><span className="font-semibold">Description: </span>{description}</p>
                    <div className="mb-2"><span className="font-semibold">Brand: </span>{brand}</div>
                    <div className="mb-2"><span className="font-semibold">Category: </span>{category}</div>
                    <div className="mb-2"><span className="font-semibold">Price: </span>{price}</div>
                    <div><span className="font-semibold">Ratings: </span>{ratings}/5</div>
                    <div><span className="font-semibold">createdAt: </span>{createdAt}/5</div>
                    <button className="btn dark:bg-violet-600 bg-slate-900 text-white mt-4">
                        <Link to={`/cart/${product._id}`}>Add to Cart</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
