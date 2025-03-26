import SliceGiver from '@/components/sliceGiver';
import HowToWork from '@/components/howToWork';
import OurPackages from '@/components/ourPackages';

import './styles.scss';

export default function Giver() {
  return (
    <main className='outPackages'>
      <SliceGiver />
      <HowToWork />
      <OurPackages />
    </main>
  );
}
