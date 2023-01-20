import { useEffect, useRef, useState } from 'react';
import { useWhyDidUpdate } from '../useWhyDidUpdate/useWhyDidUpdate';

const properties = ['a', 'c', 'd', 'e', 'f', 'g', 'h', 'l'];

export const usePrevious = (value) => {
  const prevValueRef = useRef(null);

  useEffect(() => {
    prevValueRef.current = value;
  });

  return prevValueRef;
};

export const initialProps = properties.reduce((acc, current) => {
  acc[current] = Math.random();

  return acc;
}, {});

export const getRandomInit = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const updateRandomProps = (props) => {
  const newProps = { ...props };
  const propToUpdate = properties[getRandomInit(0, properties.length - 1)];

  newProps[propToUpdate] = Math.random();

  return newProps;
};

const InnerComponent = (props) => {
  useWhyDidUpdate(props);

  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export const TestPrevious = () => {
  const [props, setProps] = useState(() => initialProps);

  return (
    <div className='App'>
      <button onClick={() => setProps((props) => updateRandomProps(props))}>Update</button>

      <InnerComponent {...props} />
    </div>
  );
};
