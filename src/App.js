import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/partials/Header';
import Home from './components/pages/Home';
import Footer from './components/partials/Footer';
import MainLayout from './components/layout/MainLayout';
import EmptyLayout from './components/layout/EmptyLayout';
import { Login } from './components/users/Login';
import BookTable from './components/functional/Table/BookTable';
import ScrollToTop from './components/functional/ScrollToTop';



function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* Layout có Header và Footer */}
        <Route element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/booktable" element={<BookTable />} />
        </Route>

        {/* Layout không có Header và Footer */}
        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>

      </Routes>
    </>
  );
}

export default App;
