import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import MainLayout from './components/layout/MainLayout';
import EmptyLayout from './components/layout/EmptyLayout';
import { Login } from './components/users/Login';
import BookTable from './components/functional/Table/BookTable';
import ScrollToTop from './components/functional/ScrollToTop';
import ViewMenu from './Menu/ViewMenu';
import CreateFood from './Menu/CreateFood';
import EditFood from './Menu/EditFood';

import Food from './Menu/Food';



function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/booktable" element={<BookTable />} />
          <Route path="/viewmenu" element={<ViewMenu />} />
          <Route path="/food" element={<Food />} />
          <Route path="/editfood/:id" element={<EditFood />} />
          <Route path="/createfood" element={<CreateFood />} />

        </Route>
        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>

      </Routes>
    </>
  );
}

export default App;
