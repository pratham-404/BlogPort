import './App.css';

// npm install react-router-dom
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { CreatePost } from './pages/create-post/create-post';
// import { Login } from './pages/login';
import { Main } from './pages/main/main';
import { ErrorPage } from './pages/error-page';

import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className=''>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="*" element={<ErrorPage code={404} message="We can't find that page." />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
