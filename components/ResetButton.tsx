import { MouseEventHandler } from 'react';

interface ResetButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <div className='text-center'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={onClick}
      >Play again</button>
    </div>
  );
};

export default ResetButton;