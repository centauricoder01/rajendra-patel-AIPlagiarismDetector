import { ChooseUs } from "@/components/Chooseus";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="bg-white mt-[4rem]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-100 bg-gray-100 rounded-full dark:bg-gray-100 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-200"
            role="alert"
          >
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3 bg-blue-700">
              New
            </span>{" "}
            <span className="text-sm font-medium text-black">
              Detect Plagiarism at No cost
            </span>
            <svg
              className="ml-2 w-5 h-5 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
            <strong className="text-blue-600">{"AI-Powered "}</strong>
            Plagiarism Detection
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Our AI-powered plagiarism detector uses state-of-the-art natural
            language processing to identify potential instances of plagiarism
            with unparalleled accuracy.
          </p>
          <div className="flex flex-col mb-4 lg:mb-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="/upload"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black border rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Upload Your Document
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">
              PARTNERED WITH
            </span>
            <div className="flex flex-wrap justify-center items-center md:gap-1 gap-6 mt-8 text-gray-500 sm:justify-between ">
              <Image
                src={"/harvard.png"}
                alt="harvard"
                width={150}
                height={150}
                className="object-contain w-20 md:w-28"
              />

              <Image
                src={"/pen.png"}
                alt="pen"
                width={150}
                height={150}
                className="object-contain w-20 md:w-28"
              />
              <Image
                src={"/stanford.png"}
                alt="stanford"
                width={150}
                height={150}
                className="object-contain w-20 md:w-28"
              />
            </div>
          </div>
        </div>
      </section>
      {/* why choose us */}
      <div
        className="h-[60rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full mb-32  items-start justify-start my-16"
        id="features"
      >
        <h1 className="flex justify-center w-[100%] items-center font-extrabold mb-10 mt-10 text-3xl md:text-5xl">
          Why Choose Us
        </h1>
        <Tabs tabs={ChooseUs} />
      </div>
      <Footer />
    </>
  );
}
