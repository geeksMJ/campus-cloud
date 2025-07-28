/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import BackButton from "./BackButton";
import { useGetCertificate } from "../../Admin/components/courses/useGetCertificate";
import Spinner from "./Spinner";

const Certificate = React.forwardRef((props, ref) => (
  <div ref={ref} className="flex items-center justify-center p-4 bg-gray-100">
    <div className="relative w-full max-w-4xl p-10 bg-white  shadow-lg rounded-lg text-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(${props.link})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="relative z-10 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-5 uppercase tracking-wider">
          Certificate of Completion
        </h1>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-green-500 mb-5"></div>
        <h2 className="text-2xl text-gray-700 mb-8 font-light">
          Mediversal Gurukul
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          This is to certify that
          <div className="text-2xl font-bold text-blue-500 inline-block my-2 px-2">
            {props.name}
          </div>
          from the Department of
          <div className="text-2xl font-bold text-blue-500 inline-block my-2 px-2">
            {props.depertment}
          </div>
          has successfully completed the course
          <div className="text-2xl font-bold text-blue-500 inline-block my-2 px-2">
            {props.course}
          </div>
        </p>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-green-500 mb-8"></div>
        <div className="italic text-gray-700">
          <p>Director</p>
          <p>Mediversal Gurukul</p>
        </div>
      </div>
    </div>
  </div>
));

Certificate.displayName = "Certificate";

export default function App() {
  const { name, courseName, depertment } = useParams();
  console.log(name, courseName, depertment);
  const { certificate, isLoading } = useGetCertificate();

  console.log(certificate);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  if (isLoading) return <Spinner />;
  return (
    <>
      <BackButton />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Certificate
          ref={componentRef}
          link={certificate.certificate}
          name={name}
          course={courseName}
          depertment={depertment}
        />
        <button
          onClick={handlePrint}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
        >
          Download as PDF
        </button>
      </div>
    </>
  );
}
