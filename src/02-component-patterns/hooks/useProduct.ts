import { useState, useEffect, useRef } from 'react';
import { onChangeArgs, Product } from '../interfaces/interfaces';

interface Hook {
  counter: number;
  increaseBy: (value: number) => void;
}

interface useProductArgs {
  product: Product;
  onChange?: ( args: onChangeArgs ) => void;
  value?: number;
}

export const useProduct = ({ onChange, product, value = 0 }: useProductArgs): Hook => {
  
  const [counter, setCounter] = useState<number>( value );

  const isControlled = useRef( !!onChange )

  const increaseBy = (value: number): void => {

    if( isControlled.current ) {
      return onChange!({ count: value, product });
    }

    const newValue = Math.max(counter + value, 0);

    setCounter(newValue);

    onChange && onChange( { count: newValue, product } );
  };

  useEffect(() => {
    setCounter( value );
  }, [value]);

  return {
    counter,
    increaseBy,
  };
};
