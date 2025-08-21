import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import fallbackImg from '../assets/fallback.png';

interface FoodData {
  id?: number;
  name: string;
  description: string | null;
  ingredients: string;
  benefits: string;
  imageUrl: string;
}

interface FoodDisplayProps {
  data: FoodData;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ data }) => {
  const [imgSrc, setImgSrc] = useState<string>(data.imageUrl);
  const isRemote = /^https?:\/\//i.test(data.imageUrl);

  useEffect(() => {
    setImgSrc(data.imageUrl);
  }, [data.imageUrl]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mx-auto h-[22rem] items-center justify-center">
      {/* Image Box */}
      <div className="relative bg-bento-light dark:bg-bento-dark rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-green-200 dark:border-green-800 h-64 sm:h-80">
            <img
            src={imgSrc}
            alt={data.name.toUpperCase()}
            className="w-full h-full object-cover rounded-2xl"
            onError={() => {
              if (isRemote) setImgSrc(fallbackImg);
            }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
            <span className="text-white font-extrabold text-lg sm:text-2xl tracking-wide">{data.name}</span>
            </div>
      </div>
      {/* Markdown Box */}
      <div className="bg-bento-light dark:bg-bento-dark p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
  <div className="markdown-content text-gray-600 dark:text-gray-300 space-y-4 text-left">
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight text-left">
            {children}
          </h2>
        ),
        strong: ({ children }) => (
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {children}
          </span>
        ),
        p: ({ children }) => (
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-left">
            {children}
          </p>
        ),
      }}
    >
      {`
## ${data.name.toUpperCase()}

**📝 Description:**  
${data.description || "_No description available._"}

**🧾 Ingredients:**  
${data.ingredients || "_Not available_"}

**🌿 Benefits:**  
${data.benefits || "_Not available_"}
      `}
    </ReactMarkdown>
  </div>
      </div>
    </div>
  );
};

export default FoodDisplay;