import { data } from './data';
import { useInView } from 'react-intersection-observer';

const PhotoItem = ({ photo, idx }) => {
  const { ref, inView } = useInView({ threshold: 0.7, triggerOnce: true });

  return (
    <div ref={ref} key={`photo=${idx}`}>
      {inView ? (
        <img src={photo} alt='Error' width={250} height={250} className='img' />
      ) : (
        <div style={{ width: 250, height: 250, background: '#000' }} />
      )}

      <h5>Photo #{idx}</h5>
    </div>
  );
};

export const Photos = () => {
  return (
    <div className='App'>
      <div className='photos' style={{ display: 'flex', flexWrap: 'wrap', gap: 50 }}>
        {data.map((photo, idx) => (
          <PhotoItem key={`photo=${idx}`} photo={photo} idx={idx} />
        ))}
      </div>
    </div>
  );
};
