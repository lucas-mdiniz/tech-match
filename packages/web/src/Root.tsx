import React from 'react';

type Props = {
  children: React.ReactNode;
  prepared: {
    rootQuery: any;
  };
};


const Root = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
};

export default Root;
