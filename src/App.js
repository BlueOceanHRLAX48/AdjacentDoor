import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Groups from './Groups/Groups';
import Home from './Home';
import Login from './Login';
import MyProfile from './MyProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/groups' element={<Groups />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
