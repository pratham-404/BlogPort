import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection} from 'firebase/firestore';
import {auth, db} from '../../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormData{
  title: string,
  description: string
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("* Required Field"),
    description: yup.string().required("* Required Field"),
  })

  const {register, handleSubmit, formState: {errors}} = useForm <CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");
  
  const onCreatePost = async (data : CreateFormData) => {

    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid
    });

    navigate("/")
  };
  
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <section className="text-gray-400 bg-gray-900 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Create Post</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever's on your mind... Let it out ...</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">

                  <div className='mb-4'>
                    <p className="leading-7 text-sm text-gray-400">Title</p>
                    <input type="text" {...register("title")} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900  focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    <p className="leading-7 text-sm text-red-400">{errors.title?.message}</p>
                  </div>

                  <div className='mb-4'>
                    <p className="leading-7 text-sm text-gray-400">Description</p>
                    <textarea {...register("description")} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 h-64 text-base outline-none text-gray-100 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
                    <p className="leading-7 text-sm text-red-400">{errors.description?.message}</p>
                  </div>

                  <div>
                    <input type="submit" className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"/>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  )
}
