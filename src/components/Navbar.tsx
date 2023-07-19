
import { Link, useLocation } from 'react-router-dom'
import { auth, provider } from '../config/firebase'

// npm install react-firebase-hooks
import { useAuthState } from 'react-firebase-hooks/auth'

import { signInWithPopup } from 'firebase/auth'

import { signOut } from 'firebase/auth'

import appIcon from "../assets/icon.svg";


export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  const location = useLocation();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <div>
      <header className="text-gray-200 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to='/' className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img src={appIcon} className="w-10 h-10 text-white p-2 rounded-full" alt="icon"></img>
            <span className="text-xl">BlogPort</span>
          </Link>

          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        
            {(user && (location.pathname !== "/createpost")) && (
              <Link to="/createpost" className="mr-5 hover:text-white">
                <button className="mr-5 inline-flex items-center bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-white mt-4 md:mt-0">Create Post</button>
              </Link>
            )}

            {/* <Link to="" className="mr-5 hover:text-white">Second Link</Link>
            <Link to="" className="mr-5 hover:text-white">Third Link</Link>
            <Link to="" className="mr-5 hover:text-white">Fourth Link</Link> */}
          </nav>

          {user && (
            <>
              <p className="mr-5 text-white">{user?.displayName}</p>
              <img src={user?.photoURL || ""} className="mr-5 w-10 h-10 text-gray-200 rounded-full" alt="profile"></img>
            </>
          )}
          
          {/* {!user && (
            <Link to='/login'><button className="mr-5 inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-white mt-4 md:mt-0">Login</button></Link>
          )} */}

          {!user && (
            <button onClick={signInWithGoogle} className="mr-5 inline-flex items-center bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-white mt-4 md:mt-0">Login</button>
          )}
          
          {user && (
            <button onClick={signUserOut} className="mr-5 inline-flex items-center bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-white mt-4 md:mt-0">Logout</button>
          )}
          
        </div>
      </header>
    </div>
    
  )
}

