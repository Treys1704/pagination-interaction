import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(3);
  const [direction, setDirection] = useState(0);
  const totalPages = 15;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 20 : -20,
      opacity: 0,
      filter: "blur(2.5px)",
      scale: 0.95,
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -20 : 20,
      opacity: 0,
      filter: "blur(2.5px)",
      scale: 0.95,
    }),
  };

  return (
    <div className="bg-gray-100 rounded-full flex items-center px-2 py-2 gap-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-black group"
        }`}
      >
        <ArrowLeft
          className={`w-5 h-5 transition-colors ${
            currentPage === 1 ? "text-gray-400" : "group-hover:text-white"
          } text-black`}
        />
      </button>

      <div className="w-24 flex items-center justify-center overflow-hidden">
        <div className="flex items-center text-black">
          <div className={`relative h-6 overflow-hidden  ${currentPage < 10 ? "w-5" : "w-6"}`}>
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              <motion.span
                key={currentPage}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="absolute flex items-center justify-center"
              >
                {currentPage}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mr-2">of</span>
          <span>{totalPages}</span>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-black group"
        }`}
      >
        <ArrowRight
          className={`w-5 h-5 transition-colors ${
            currentPage === totalPages ? "text-gray-400" : "group-hover:text-white"
          } text-black`}
        />
      </button>
    </div>
  );
}
