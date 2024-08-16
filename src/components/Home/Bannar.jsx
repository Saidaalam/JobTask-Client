import bannar from '../../Images/bannar.png';

const Bannar = () => {
  return (
    <div className="relative" style={{ backgroundImage: `url(${bannar})`, height: '500px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-col justify-center items-center text-center text-neutral-content h-full p-4 md:p-8">
        <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-bold text-white shadow-md">WELCOME TO Product Hunter</h1>
        <p className="mb-4 md:mb-6 text-lg md:text-2xl text-white shadow-md">Discover the best products just for you</p>
        <a
          href="/product"
          className="px-4 py-2 md:px-6 md:py-3 text-base md:text-lg font-semibold text-white bg-sky-950 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Explore Now
        </a>
      </div>
    </div>
  );
};

export default Bannar;
