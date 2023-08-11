import React from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';

export const Registration: React.FC = () => {
  return (
    <PageLayout>
      <PageTitle title={'Registration'} button={false} />
    </PageLayout>
  );
};
