import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;