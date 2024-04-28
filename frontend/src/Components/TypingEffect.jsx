import React, { useState, useEffect, useMemo } from 'react';

const TypingEffect = () => {
  const tagLines = useMemo(() => ["Today's savings is tomorrow's future.", "Your Everyday Expense Manager.", "Your financial partner for life.", "Transforming lives through finance."], []);

  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [currentTagLine, setCurrentTagLine] = useState(tagLines[0]);

  useEffect(() => {
    const typingEffectInterval = setInterval(() => {
      setCurrentTagIndex((prevIndex) => (prevIndex + 1) % tagLines.length);
    }, 3000);

    return () => clearInterval(typingEffectInterval);
  }, [tagLines]);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setCurrentTagLine((prevTagLine) => {
        const currentTag = tagLines[currentTagIndex];
        if (currentIndex === currentTag.length) {
          // Stop typing effect
          clearInterval(typingInterval);
          return prevTagLine;
        } else {
          // Continue typing effect
          currentIndex++;
          return currentTag.substring(0, currentIndex);
        }
      });
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentTagIndex, tagLines]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <blockquote className="text-dark shadow-lg bg-white p-4 rounded-xl text-2xl md:text-4xl font-bold text-center mb-4">
        "Welcome to <span className="text-yellow-500">Laabh</span>!"
      </blockquote>
      <p className="text-dark text-sm md:text-lg rounded-xl bg-light py-1 px-3">{currentTagLine}</p>
    </div>
  );
}

export default TypingEffect;
