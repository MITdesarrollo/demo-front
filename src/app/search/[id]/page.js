import React from 'react';
import DreamonSelect from '../../dreamon/page';

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default async function PackageDetails({ params }) {
  const packageId = params.id;
  const guid = generateGUID();

  const response = await fetch(`${process.env.api}/api/Package/Get/${packageId}?q=${guid}`);
  const dataPackage = await response.json();

  return <DreamonSelect data={dataPackage} />;
}
