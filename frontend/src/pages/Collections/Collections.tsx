import React from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';

export const Collections: React.FC = () => {
  return (
    <PageLayout>
      <PageTitle title={'Collections'} button={true}/>
    </PageLayout>
  );
};
