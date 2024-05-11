import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <i className="ri-text-snippet text-3xl lg:text-4xl text-green-500"></i>
            <span className="ml-3 text-lg lg:text-xl tracking-wider uppercase">
              ImgText<span className="text-green-500 font-bold">Extract</span>{' '}
            </span>
          </a>
          <Link className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0" href='https://github.com/somenath203/Image-Text-Extractor' target="_blank">
            <i className="ri-github-fill text-green-500 text-2xl lg:text-3xl"></i>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
