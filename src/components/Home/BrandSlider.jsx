import Apple from '../../Images/Apple.jpeg';
import Google from '../../Images/Google.jpeg';
import Samsung from '../../Images/Samsung.jpeg';
import Canon from '../../Images/Canon.jpeg';
import Dell from '../../Images/Dell.jpeg';
import Sony from '../../Images/Sony.jpeg';
import Amazon from '../../Images/Amazon.jpeg';

const BrandSlider = () => {
  return (
    <div className="px-4 mt-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Featured Brands</h2>
      <div className="carousel space-x-8">
        <div className="carousel-item">
          <img src={Apple} alt="Apple" className="w-60 h-60 object-contain mx-auto" />
        </div>
        <div className="carousel-item">
          <img src={Google} alt="Google" className="w-60 h-60 object-contain mx-auto" />
        </div>
        <div className="carousel-item">
          <img src={Samsung} alt="Samsung" className="w-60 h-60 object-contain mx-auto" />
        </div>
        <div className="carousel-item">
          <img src={Canon} alt="Canon" className="w-56 h-56 object-contain mx-auto" />
        </div>
        <div className="carousel-item">
          <img src={Dell} alt="Dell" className="w-56 h-56 object-contain mx-auto" />
        </div>
        <div className="carousel-item">
          <img src={Amazon} alt="Amazon" className="w-56 h-56 object-contain mx-auto" />
        </div>
        <div className="carousel-item">
          <img src={Sony} alt="Sony" className="w-56 h-56 object-contain mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
