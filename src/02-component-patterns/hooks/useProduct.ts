import { useState, useEffect, useRef } from 'react';
import { onChangeArgs, Product, InitialValues } from '../interfaces/interfaces';

// interface Hook {
//   counter: number;
//   increaseBy: (value: number) => void;
// }

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
}: useProductArgs) => {
// }: useProductArgs): Hook => {
  const [counter, setCounter] = useState<number>(initialValues?.count || value);

  const isMounted = useRef(false);


  // console.log(Math.max(maxCountValue, newValue));

  const increaseBy = (value: number): void => {
    let newValue = Math.max(counter + value, 0);

    if(initialValues?.maxCount) {
      newValue = Math.min(newValue, initialValues.maxCount)
    }    

    setCounter(newValue);

    onChange && onChange({ count: newValue, product });
  };

  const reset = () => {
    setCounter(initialValues?.count || value )
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
    isMaxCountReached: !!initialValues?.count && initialValues?.maxCount === counter,
    maxCount: initialValues?.maxCount,

    increaseBy,
    reset    
  };
};
