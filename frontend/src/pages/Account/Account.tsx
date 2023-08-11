import React from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';

export const Account: React.FC = () => {
  return (
    <PageLayout>
      <PageTitle title={'My Account'} button={true} />
    </PageLayout>
  );
};
