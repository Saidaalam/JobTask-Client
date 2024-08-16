import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../../src/components/hooks/useAuth';

const AddProduct = () => {
  const { user } = useAuth() || {};

  const handleAddProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productName = formData.get('productName');
    const brandName = formData.get('brandName');
    const image = formData.get('image');
    const price = formData.get('price');
    const category = formData.get('category');
    const ratings = formData.get('ratings');
    const description = formData.get('description');
    const createdAt = new Date().toISOString();
    const email = user.email;

    const productInfo = { productName, brandName, image, price, category, ratings, description, createdAt, email };

    fetch("https://job-task-server-site-eta.vercel.app/product", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(productInfo)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success("Product added successfully!");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });

    console.log(productInfo);
  };

  return (
    <div className="dark:bg-[#120505] dark:text-white px-4 sm:px-6 lg:px-10">
      <div className="pt-10">
        <div className="shadow-lg p-5 border dark:bg-[#1a2641d5]">
          <div className="mt-5 mb-8">
            <p className="text-center text-3xl font-semibold">
              <span className="dark:text-white">
                Add Product
              </span>
            </p>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <label className="block mb-2 dark:text-white" htmlFor="productName">
                  Product Name
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#274675]"
                  type="text"
                  placeholder="Product Name"
                  id="productName"
                  name="productName"
                />

                <label className="block mt-4 mb-2 dark:text-white" htmlFor="brandName">
                  Brand Name
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#274675]"
                  type="text"
                  placeholder="Brand Name"
                  id="brandName"
                  name="brandName"
                />

                <label className="block mt-4 mb-2 dark:text-white" htmlFor="price">
                  Price
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#274675]"
                  type="number"
                  placeholder="Enter Price"
                  id="price"
                  name="price"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 dark:text-white" htmlFor="image">
                  Image URL
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#274675]"
                  type="text"
                  placeholder="Enter Image URL"
                  id="image"
                  name="image"
                />

                <label className="block mb-2 mt-4 dark:text-white" htmlFor="category">
                  Category
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#274675]"
                  type="text"
                  placeholder="Enter Category"
                  id="category"
                  name="category"
                />

                <label className="block mb-2 mt-4 dark:text-white" htmlFor="ratings">
                  Ratings
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#274675]"
                  type="number"
                  placeholder="Enter Ratings"
                  id="ratings"
                  name="ratings"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
            </div>

            <label className="block mb-2 mt-4 dark:text-white" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-md focus:outline-[#274675]"
              placeholder="Description"
              id="description"
              name="description"
            ></textarea>

            <input
              className="px-4 w-full py-2 mt-4 rounded hover:bg-[#3180ab] bg-[#274675] duration-200 text-white cursor-pointer font-semibold"
              type="submit"
              value="Add Product"
            />
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
