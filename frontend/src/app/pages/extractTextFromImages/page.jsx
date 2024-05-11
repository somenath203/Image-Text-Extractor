'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import BeatLoader from 'react-spinners/BeatLoader';

import Navbar from '@/app/components/Navbar';
import UploadImg from './../../assets/upload_img.jpeg';
import axios from 'axios';

const Page = () => {
  const [imageUploadedByUser, setFileUploadedByUser] = useState();

  const [isEmptyFormSubmitted, setIsEmptyFormSubmitted] = useState(false);

  const triggerModalOpenRef = useRef();

  const [extractedText, setExtractedText] = useState('');

  const [uploadedImage, setUploadedImage] = useState();

  const [loading, setLoading] = useState();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (!imageUploadedByUser) {
        setIsEmptyFormSubmitted(true);

        setTimeout(() => {
          setIsEmptyFormSubmitted(false);
        }, 7000);

        return;
      }

      setIsEmptyFormSubmitted(false);

      const formData = new FormData();

      formData.append('imageUploadedByUser', imageUploadedByUser);

      setLoading(true);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_FASTAPI_URL}/extract-text-from-image`,
        formData
      );

      setExtractedText(data?.extracted_text);

      setUploadedImage(URL.createObjectURL(imageUploadedByUser));

      setLoading(false);

      triggerModalOpenRef.current.showModal();
    } catch (error) {
      setIsEmptyFormSubmitted(false);

      setLoading(false);

      toast.error('Something went wrong!! Please try after sometime!!');

      console.log(error);
    }
  };

  const copyExtractedTextToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  return (
    <>
      <Navbar />

      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container mx-auto flex px-16 py-16 md:flex-row flex-col items-center">
          <div class="lg:max-w-lg lg:w-full md:w-3/4 w-5/6 md:mb-0 mb-10">
            <Image
              class="object-cover object-center rounded"
              alt="hero"
              src={UploadImg}
              width=""
            />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font text-2xl lg:text-3xl mb-4 font-medium text-white">
              Upload your image below
              <br class="hidden lg:inline-block" />
              to extract text out of it
            </h1>
            <p class="mb-8 leading-relaxed">
              Upload any image of your image and get each and every text
              extracted from the image. Make sure the image is either in JPG,
              PNG or in JPEG format and only 1 image is allowed to upload at a
              time, not multiple images
            </p>
            <form
              className="flex flex-col gap-5 w-full lg:w-4/5"
              onSubmit={onSubmitForm}
            >
              <input
                type="file"
                className="file-input file-input-bordered file-input-success w-full"
                disabled={loading}
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFileUploadedByUser(e.target.files[0])}
              />

              {loading && (
                <div className="flex items-center justify-center lg:justify-start lg:items-start">
                  <BeatLoader color={'#33D05F'} loading={loading} />
                </div>
              )}

              {!loading && (
                <button
                  type="submit"
                  className="border-2 py-3 uppercase tracking-wider rounded-xl w-60 text-lg lg:text-xl border-green-500 hover:border-green-700"
                >
                  Extract Text
                </button>
              )}

              {isEmptyFormSubmitted && (
                <div role="alert" className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error while submitting as no image is uploaded.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <dialog ref={triggerModalOpenRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg text-center uppercase tracking-wider">
            Extracted Text
          </h3>
          <div className="mt-10 flex items-center flex-col justify-center gap-8">
            <Image
              alt="uploadedimage"
              width={270}
              height={50}
              src={uploadedImage}
              className="rounded-xl border-8 border-green-600"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <p>Resultant Extracted Text</p>
              <p className="py-4 text-lg text-center font-semibold tracking-wide">
                {extractedText
                  ? extractedText
                  : 'It seems like the application failed to detect any text in this image.'}
              </p>
              {extractedText && (
                <i
                  className="ri-file-copy-line text-3xl text-green-600 cursor-pointer"
                  onClick={copyExtractedTextToClipboard}
                ></i>
              )}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Page;
