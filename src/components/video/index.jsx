import { useState } from 'react';
import Image from 'next/image';

import './style.scss';

export default function VideoPackage({ url, imageFallback }) {
  const [show, setShow] = useState(url ? 'video' : 'image');

  return (
    <div className="videoPackage">
      {show === 'image' && (
        <Image src={imageFallback} layout="fill" objectFit="contain" />
      )}
      {show === 'video' && (
        <video
          height={'100%'}
          src={url}
          controls
          autoPlay
          onError={(err) => setShow('image')}
        ></video>
      )}
    </div>
  );
}
