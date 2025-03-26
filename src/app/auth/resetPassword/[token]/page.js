import RecoveryPassword from '@/components/auth/recoveryPass';

import './styles.scss';

export default function Recovery({ params }) {
  const token = params.token;

  return (
    <main className='recoveryPage'>
      <RecoveryPassword token={token} />
    </main>
  );
}
