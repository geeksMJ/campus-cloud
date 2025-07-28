/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function Empty({ text }) {
  return (
    <motion.div
      className="w-full flex items-center text-testColor1 justify-center py-2"
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
      <div>
        <div className="w-full flex items-center text-testColor1 justify-center">
          <div className="w-1/4">
            <img className="" src="/empty2.gif" />
          </div>
        </div>
        <p className="text-xl py-2 px-4 text-testColor1 font-medium text-center">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
