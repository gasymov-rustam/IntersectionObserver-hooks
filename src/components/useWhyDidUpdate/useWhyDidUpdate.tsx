import { useEffect, useRef } from 'react';

export const useWhyDidUpdate = (props: any): void => {
  const previousProps = useRef<any>();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const allKeys: string[] = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          changesObj[key] = {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            from: previousProps.current[key],
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    previousProps.current = props;
  });
};
