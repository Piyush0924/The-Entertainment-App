import React from 'react';

const SkeletonTrending = () => {
  return (
    <div className='my-4'>
      <h2 className='text-white font-bold md:text-xl px-4'>Loading...</h2>
      <div className='relative flex items-center group'>
        <div className='flex gap-4 overflow-x-scroll'>
          {Array(6).fill().map((_, index) => (
            <div key={index} className='bg-gray-800 w-[280px] h-40 animate-pulse'></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonTrending;