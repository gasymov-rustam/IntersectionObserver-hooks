import { useEffect, useRef, useState } from 'react';
import { useLatest } from '../useLatest/useLatest';
import './styles.css';

export const useOutsideClick = (elementRef, handler, attached = true) => {
  const latestHandler = useLatest(handler);

  useEffect(() => {
    if (!attached) return;

    const handleClick = (e) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(e.target)) {
        latestHandler.current();
      }
    };

    document.addEventListener('click', handleClick);

    console.log('___________________useOutsideClick___________________', attached);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [elementRef, latestHandler, attached]);
};

export const Tooltip = ({ opened, onClose }) => {
  const tooltipRef = useRef(null);

  useOutsideClick(tooltipRef, onClose, opened);

  if (!opened) return null;

  return (
    <div ref={tooltipRef} className='tooltip'>
      <div>Some Text</div>
    </div>
  );
};

export const TestOutsideClick = () => {
  const [opened, setOpened] = useState(false);

  const onClose = () => {
    setOpened(false);
  };
  return (
    <div className='tooltip-container'>
      <Tooltip opened={opened} onClose={onClose} />
      <button className='tooltip-trigger' onClick={() => setOpened((v) => !v)}>
        Click to open tooltip
      </button>
    </div>
  );
};
