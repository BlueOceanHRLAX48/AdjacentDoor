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
      </Routes>

      <Groups />{/* Temporary locaiton to test Groups */}
    </BrowserRouter>
  );
}

export default App;
