import { memo } from 'react';
import { Spinner } from './spinner';

const PendingSpinner = () => {
  console.log('test');
  return (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  );
};

export default memo(PendingSpinner);
