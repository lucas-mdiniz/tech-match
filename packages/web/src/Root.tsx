import React, {Suspense} from 'react';

type Props = {
  children: React.ReactNode;
  prepared: {
    rootQuery: any;
  };
};
const UserList = ({ children, prepared }: Props) => {

  return (
    <Suspense fallback={'Loading children...'}>{children}</Suspense>
  )
};

export default UserList;
