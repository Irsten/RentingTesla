import Details from './components/Details';
import Home from './components/Home';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/details',
    element: <Details />,
  },
];

export default AppRoutes;
