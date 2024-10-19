import logo from './logo.svg';
import './App.css';
import MovieSearch from './components/MovieSearchForRating';
import MovieSearchForRating from './components/MovieSearchForRating';
import { Provider } from 'react-redux';
import store from './utils/appStore';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <MovieSearchForRating/>
    </div>

    </Provider>
    
  );
}

export default App;
