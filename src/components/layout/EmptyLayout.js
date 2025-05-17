// src/components/layout/EmptyLayout.js
import { Outlet } from 'react-router-dom';

const EmptyLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default EmptyLayout;
