import Image from 'next/image';
import Link from 'next/link';

import GetStartedImg from './../../assets/get-started-img.jpeg';
import Navbar from '@/app/components/Navbar';


const Page = () => {
  return (
    <>
      <Navbar />

      <div>
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container mx-auto flex px-5 py-16 items-center justify-center flex-col">
            <Image
              className="w-4/6 lg:w-3/12 mb-10 object-cover object-center rounded-2xl shadow-xl"
              alt="hero"
              width=""
              src={GetStartedImg}
            />
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font text-2xl lg:text-3xl mb-4 font-medium text-white tracking-wide">
                Extract <span className='text-green-500 font-bold'>Text</span> from <span className='text-green-500 font-bold'>Images</span>
              </h1>
              <p className="leading-relaxed mb-8 text-lg lg:text-xl">
               This is an application that let you extract texts from any images at no time.
              </p>
              <div className="flex justify-center">
                <Link href='/pages/extractTextFromImages' className="inline-flex text-white bg-green-600 border-0 py-4 px-28 focus:outline-none hover:bg-green-700 rounded text-lg lg:text-xl tracking-wide">
                  Extract
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
