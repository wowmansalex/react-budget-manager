import React from 'react';

const Entry = ({ entry }) => {
  return (
    <div className='flex flex-row justify-between'>
      <span>{entry.description}</span>
      <span>{entry.type}</span>
      <span>{entry.category}</span>
      <span>{entry.amount}</span>
    </div>
  );
};

export default Entry;
