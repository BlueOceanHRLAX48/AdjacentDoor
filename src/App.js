import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import MyProfile from './MyProfile';
import Groups from './Groups/Groups';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/groups' element={<Groups />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
