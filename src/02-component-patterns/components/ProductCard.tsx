import { createContext, useContext, ReactElement } from 'react';

import { useProduct } from '../hooks/useProduct';

import styles from '../styles/styles.module.css';
import noImage from '../assets/no-image.jpg';

interface Props {
  product: Product;
  children?: ReactElement | ReactElement[];
};

interface Product {
  id: string;
  title: string;
  img?: string;
};

interface ProductContextProps {
    counter: number;
    increaseBy: ( vlaue: number ) => void;
    product: Product;
};


const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;


export const ProductImage = ({ img = '' }): JSX.Element => {
    const { product } = useContext( ProductContext );
    let imgToShow: string;

    if (img) { 
        imgToShow = img
    } else if (product.img) {
        imgToShow = product.img
    } else {
        imgToShow = noImage
    }

  return <img className={styles.productImg} src={ imgToShow } alt="Product" />;
};

export const ProductTitle = ({ title }: { title?: string }): JSX.Element => {
    const { product } = useContext(ProductContext);
  return <span className={styles.productDescription}>{title ? title : product.title}</span>;
};

export const ProductButtons = (): JSX.Element => {

    const { increaseBy, counter} = useContext( ProductContext )

  return (
    <div className={styles.buttonsContainer}>
      <button className={styles.buttonMinus} onClick={() => increaseBy(-1)}>
        -
      </button>

      <div className={styles.countLabel}> {counter} </div>

      <button className={styles.buttonAdd} onClick={() => increaseBy(1)}>
        +
      </button>
    </div>
  );
};

export const ProductCard = ({ children, product }: Props): JSX.Element => {
  const { counter, increaseBy } = useProduct();
  return (
    <Provider
      value={{
        counter,
        increaseBy,
        product,
      }}
    >
      <div className={styles.productCard}>{children}</div>
    </Provider>
  );
};

ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Buttons = ProductButtons;
