import { Provider } from 'react-redux';
import './App.css';
import SearchPage from './Page/SearchPage';
import { store } from './Redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SearchPage />
      </Provider>
    </div>
  );
}

export default App;
