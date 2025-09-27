import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import FlashCards from './pages/FlashCards';
import Profile from './pages/Profile';



const ProtectedRoute = ( props ) => {
  return (props.children);
}


const App = () => {

  // const [gotData, setGotData] = useState(false);

  return (
    <Routes>
      <Route path='/*' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
      <Route path='/flashcards' element={<FlashCards/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    
  )

}

export default App;