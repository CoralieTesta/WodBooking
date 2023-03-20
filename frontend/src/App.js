import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
