/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const TypingEffect = ({ text = "Weelcome To Mediversal Gurukul" }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust the speed here (100ms per character)

    return () => clearInterval(typingInterval);
  }, [text]); // Add text as a dependency

  return <p>{displayedText}</p>;
};

export default TypingEffect;
