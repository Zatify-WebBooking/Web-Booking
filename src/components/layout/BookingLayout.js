import HeaderBooking from '../partials/HeaderBooking';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';

const BookingLayout = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <HeaderBooking onSearch={setSearch} />
      <Outlet context={[search, setSearch]} />
      {/* Nếu muốn có Footer thì thêm ở đây */}
    </>
  );
};

export default BookingLayout;