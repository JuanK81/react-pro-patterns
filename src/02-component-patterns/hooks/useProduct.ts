import { useState, useEffect, useRef } from 'react';
import { onChangeArgs, Product, InitialValues } from '../interfaces/interfaces';

interface Hook {
  counter: number;
  increaseBy: (value: number) => void;
}

interface useProductArgs {
  product: Product;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
  initialValues,
}: useProductArgs): Hook => {
  const [counter, setCounter] = useState<number>(initialValues?.count || value);

  const isMounted = useRef(false);

  // console.log(Math.max(maxCountValue, newValue));

  const increaseBy = (value: number): void => {
    const maxCountValue: number = Math.max(initialValues?.maxCount || 0);
    const newValue = Math.max(counter + value, 0);

    if (maxCountValue === 0) {
      return setCounter(newValue);
    }

    setCounter(Math.min(maxCountValue, newValue));

    onChange && onChange({ count: newValue, product });
  };

  useEffect(() => {
    if (!isMounted.current) return;

    setCounter(value);
  }, [value]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return {
    counter,
    increaseBy,
  };
};
