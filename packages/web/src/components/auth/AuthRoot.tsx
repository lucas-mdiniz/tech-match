import React from 'react';

type Props = {
  children: React.ReactNode,
  prepared: {
    rootQuery: any
  }
}

const AuthRoot = ({ children } : Props) => {
    return (
      <>
        {children}
      </>
    )
}

export default AuthRoot;