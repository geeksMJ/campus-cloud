/* eslint-disable react/prop-types */

import { motion } from "framer-motion";

export default function Heading({ text }) {
  // const flashUpStyle = {
  //   opacity: isRendered ? 1 : 0,
  //   transform: isRendered
  //     ? "translateX(0) scale(1)"
  //     : "translateX(-500px) scale(1)",
  //   transition: " transform 0.5s ",
  // };

  return (
    <motion.div
      className="w-full flex pt-4"
      // style={flashUpStyle}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
    >
      <h1 className="md:text-3xl font-bold bg-blue-600 text-white pr-8 pl-2 shadow shadow-black py-1 rounded-r-full">
        {text}
      </h1>
    </motion.div>
  );
}
