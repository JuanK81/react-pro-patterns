import { useState } from 'react';

interface Hook {
  counter: number;
  increaseBy: (value: number) => void;
}

export const useProduct = (): Hook => {
  const [counter, setCounter] = useState<number>(0);

  const increaseBy = (value: number): void => {
    setCounter((prev) => Math.max(prev + value, 0));
  };
  return {
    counter,
    increaseBy,
  };
};
