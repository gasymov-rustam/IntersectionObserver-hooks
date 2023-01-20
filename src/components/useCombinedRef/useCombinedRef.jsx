import { useRef, useEffect, useCallback, useState } from 'react';

const useCombinedRef = (...refs) => {
  const combinedRef = useCallback(
    (element) =>
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref.current === 'function') {
          ref(element);
        } else {
          ref.current = element;
        }
      }),
    refs,
  );

  return combinedRef;
};

const Input = (props) => {
  const { inputRef: parentRef, ...rest } = props;
  const inputRef = useRef(null);
  const [, setState] = useState(1);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const callBackRef = useCombinedRef(inputRef, parentRef);
  // const callBackRef = useCallback((element) => {
  //   inputRef.current = element;

  //   if (!parentRef) return;

  //   if (typeof parentRef.current === 'function') {
  //     parentRef(element);
  //   } else {
  //     parentRef.current = element;
  //   }
  // }, []);

  return (
    <>
      <button onClick={() => setState((prev) => prev + 1)}>Click</button>
      <input {...rest} ref={callBackRef} />
    </>
  );
};

export const TestCombinedRef = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef.current);
  }, []);

  return <Input inputRef={inputRef} />;
};
