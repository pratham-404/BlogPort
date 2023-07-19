import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { Post as IPost } from './main';

import likeChecked from "../../assets/like-checked.svg";
import likeUnchecked from "../../assets/like-unchecked.svg";

interface Props{
    post: IPost;
}

interface Like{
  likeId: string;
  userId: string;
}

export const Post = (props : Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
  }

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      
      if(user){
        setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{ userId: user?.uid, likeId: newDoc.id}])
      }
    } catch (err) {
      console.log(err);
    }    
  };

  const removeLike = async () => {
    const likesToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
    const likeToDeleteData = await getDocs(likesToDeleteQuery);
    const likeId = likeToDeleteData.docs[0].id;
    const likeToDelete = doc(db, "likes", likeId);
    
    await deleteDoc(likeToDelete);
    try {      
      if(user){
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (err) {
      console.log(err);
    }    
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, [])

  return (
    <div>
        <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-800">
            <div className="md:flex-grow">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-medium text-white title-font mb-2">{props.post.title}</h2>
                    </div>
                    <div className="flex items-center">

                      <button onClick={hasUserLiked ? removeLike : addLike}>
                        <img src={hasUserLiked ? likeChecked : likeUnchecked} className="w-10 h-10 text-white p-2 rounded-full" alt="Like icon"/>
                      </button>
                    
                      {likes && <p className="text-white">{likes?.length}</p>}
                    </div>
                  </div>
                  <p className="mt-1 text-gray-200 text-sm">~ {props.post.username}</p>
                </div>
                <p className="leading-relaxed">{props.post.description}</p>
            </div>
            </div>
          </div>
        </section>
    </div>
  )
}
