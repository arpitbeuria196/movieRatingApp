import './App.css';
import MovieSearchForRating from './components/MovieSearchForRating';
import MovieDetails from './components/MovieDetails';
import { Provider } from 'react-redux';
import store from './utils/appStore';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  // Define routes using 'element' instead of 'name'
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MovieSearchForRating />,
    },
    {
      path:  "/details/:movieId",
      element: <MovieDetails />,
    },
    {
      path: "*", // Catch-all route for unmatched paths
      element: <div>Page Not Found</div>,
    },
  ]);
  

  return (
    <Provider store={store}>
      <div className="App">
        {/* Provide the router configuration to the RouterProvider */}
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
