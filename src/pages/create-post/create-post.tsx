import { CreateForm } from './create-form';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { Route } from 'react-router-dom';
import { ErrorPage } from '../error-page';


export const CreatePost = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? <CreateForm/> : <Route path="*" element={<ErrorPage code={404} message="We can't find that page." />} />}
    </div>
    
  )
}
