'use client';

import { Button } from '@nextui-org/react';
import { useUserContext } from '@/app/context/userContext';
import { useTranslation } from 'react-i18next';

export function LoginButton() {
  const { t } = useTranslation();
  const { login } = useUserContext();

  return (
    <Button color="danger" variant="flat" onClick={login}>
      <span className="text-c_highlights">{t('login')}</span>
    </Button>
  );
}
