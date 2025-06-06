import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import RestaurantDetail from './components/restaurants/RestaurantDetail';
import MainLayout from './components/layout/MainLayout';
import EmptyLayout from './components/layout/EmptyLayout';
import BookTable from './components/restaurants/BookTable';
import ScrollToTop from './components/common/ScrollToTop';
import ViewMenu from './components/restaurants/ViewMenu';
import CreateFood from './components/restaurants/CreateFood';
import EditFood from './components/restaurants/EditFood';

import Food from './components/restaurants/Food';
import BookingWeb from './components/booking/BookingWeb';
import BookingLayout from './components/layout/BookingLayout';
import HotelDetail from './components/hotels/HotelDetail';
import AboutRestaurant from './components/restaurants/AboutRestaurant';
import AboutHotel from './components/hotels/AboutHotel';
import React from 'react';
import BookRoom from './components/hotels/BookRoom';
import PriceHotel from './components/hotels/PriceHotel';
import FloatingZaloButton from './components/common/FloatingZaloButton';
import GalleryRestaurant from './components/restaurants/GalleryRestaurant';
import GalleryHotel from './components/hotels/GalleryHotel';
import TourDetail from './components/tourist/TourDetail';
import ContactInfo from './components/partials/ContactInfo';
import Tourist from './components/tourist/Tourist';

function GalleryRestaurantWrapper() {
  const { id } = useParams();
  const restaurantId = parseInt(id, 10);
  return <GalleryRestaurant id={restaurantId} />;
}

function GalleryHotelWrapper() {
  const { id } = useParams();
  const hotelId = parseInt(id, 10);
  return <GalleryHotel id={hotelId} />;
}

function TourDetailWrapper() {
  const { id } = useParams();
  const tourId = parseInt(id, 10);
  return <TourDetail tourId={tourId} />;
}

function App() {
  return (
    <>
      <FloatingZaloButton />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/booking/:id" element={<BookTable />} />
          <Route path="/viewmenu/:id" element={<ViewMenu />} />
          <Route path="/food/:restaurantId" element={<Food />} />
          <Route path="/editfood/:id" element={<EditFood />} />
          <Route path="/createfood/:id" element={<CreateFood />} />
          <Route path="/createfood/:id" element={<CreateFood />} />
          <Route path="/about/:id" element={<AboutRestaurant />} />
          <Route path="/galleryrestaurant/:id" element={<GalleryRestaurantWrapper />} />
        </Route>
        <Route element={<EmptyLayout />}>
          <Route path='/hotel/:id' element={<HotelDetail />} />
          <Route path='/hotel/abouthotel/:id' element={<AboutHotel />} />
          <Route path='/hotel/price/:id' element={<PriceHotel />} />
          <Route path='/hotel/bookroom/:id' element={<BookRoom />} />
          <Route path="/galleryhotel/:id" element={<GalleryHotelWrapper />} />
          <Route path="/tourist/:id" element={<TourDetailWrapper />} />
          <Route path="/tourist" element={<Tourist />} />
          <Route path="/contact-info" element={<ContactInfo />} />
        </Route>
        <Route element={<BookingLayout />}>
          <Route path="/" element={<BookingWeb />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
