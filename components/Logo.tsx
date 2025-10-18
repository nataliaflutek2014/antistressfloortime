import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`text-brand-green-dark font-serif text-center ${className}`}>
      <p className="text-3xl font-bold leading-tight">МУЗЫКАЛЬНЫЙ</p>
      <p className="text-3xl font-bold leading-tight">ФЛОРТАЙМ</p>
      <p className="text-lg mt-2">НАТАЛЬЯ КАМЕНЕВА</p>
    </div>
  );
};
