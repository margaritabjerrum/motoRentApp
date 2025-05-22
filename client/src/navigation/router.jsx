import { createBrowserRouter } from 'react-router-dom';
import BikesPage from '../pages/bikes-page';
import SingleBikePage from '../pages/single-bike-page';
import Layout from '../components/layout/layout';
import AddBikePage from '../pages/add-bike-page';
import NotFound from '../pages/not-found-page';
import AboutUs from '../pages/about-us-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BikesPage />,
      },
      {
        path: 'bikes/:id',
        element: <SingleBikePage />,
      },
      {
        path: 'add-bike',
        element: <AddBikePage />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
