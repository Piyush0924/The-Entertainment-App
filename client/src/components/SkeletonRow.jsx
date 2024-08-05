import React from 'react';

const SkeletonRow = () => {
  return (
    <div className='flex gap-4'>
      {Array(4).fill().map((_, index) => (
        <div key={index} className='bg-gray-800 w-full h-40 animate-pulse'></div>
      ))}
    </div>
  );
};

export default SkeletonRow;