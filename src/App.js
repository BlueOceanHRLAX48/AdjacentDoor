import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import MyProfile from './MyProfile';
import Groups from './Groups/Groups';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [leftClass, setLeftClass] = useState(false);

  const showMenu = () => {
    setLeftClass(!leftClass);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home leftClass={leftClass} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/groups' element={<Groups />} />
      </Routes>
      <div>
        <Footer showMenu={showMenu} />
      </div>
    </BrowserRouter>
  );
}

export default App;
