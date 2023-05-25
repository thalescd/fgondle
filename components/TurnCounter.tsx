interface TurnCounterProps {
  turn: number;
  limitTurns: number;
}

function TurnCounter({ turn, limitTurns }: TurnCounterProps) {
  return (
    <h3 className='text-center text-2xl my-4'>Turn {turn}/{limitTurns}</h3>
  );
}

export default TurnCounter;