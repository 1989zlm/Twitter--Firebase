import moment from "moment/moment";
import "moment/locale/tr"; //tarihi turkçeye cevirmek için
import Buttons from "./Buttons";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import {
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import EditMode from "./EditMode";
import Content from "./Content";

// gönderiler için componentte ayrı bir klasör açtık öünkü bunun sebebi gönderileri kendi içinde bi kaç paröaya ayıracağız

const Post = ({ tweet }) => {
  // console.log(tweet);
  //tweeti düzenlemek için ilk önce tweet duzenleme modunda mı ona bakılır
  const [isEditMode, setIsEditMode] = useState(false);

  // consolda tweetın ne zaman atıldığı bilgisi nanosecond net değildi bizde tarıhe çevirrerek consolda göruntuleyıp baktık ve momentla birlikte gunumuzun tarihe çevırdık
  //! console.log(tweet.createdAt.toDate());
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  //! console.log(auth.currentUser.uid); //oturumu açık olan kullanıcı
  //! console.log(tweet.user.id); //tweeti açık olan kullanıcı

  //oturumu açık olan kullanıcı tweetin likes dizisinde varmı?
  const isLiked = tweet?.likes?.includes(auth.currentUser.uid);

  //tweet'i kaldır
  const handleDelete = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    //dokumnaı kaldır
    deleteDoc(tweetRef)
      .then(() => toast.warn("tweet akıştan kaldırıldı"))
      .catch(() => toast.danger("tweet silinirken sorun oluştu"));
  };

  //tweete like la
  const handleLike = async () => {
    // güncellenecek dökümanın referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);
    //belgeyi guncelle
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) // like varsa kaldır
        : arrayUnion(auth.currentUser.uid), //like yoksa ekle
    });
  };
  console.log(isEditMode);
  return (
    <div className="border-b py-6 px-3 border-zinc-600 flex gap-3">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />
      <div className="w-full">
        {/* en ust kısım */}
        <div className="flex justify-between items-center">
          <div className=" flex gap-3 items-center whitespace-nowrap">
            <p className="font-semibold">{tweet.user.name}</p>
            {/* firebase bize nickname vermiyodu. bizde ismi nickname benzettik */}
            <p className="text-gray-400">
              @{tweet?.user?.name?.toLowerCase().split(" ").join("_")}
            </p>
            <p className="text-gray-400 text-sm">{date}</p>
            {tweet.isEdited && (
              <p className="text-gray-400 text-xs">*düzenlendi</p>
            )}
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* orta kısım */}
        <div className="my-4">
          {isEditMode ? (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          ) : (
            <Content tweet={tweet} />
          )}
        </div>

        {/*alt kısım  */}
        <div>
          <Buttons
            isLiked={isLiked}
            handleLike={handleLike}
            likeCount={tweet?.likes?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

//! normalde atılan tweetın sahibi tarafından duzenlenmesi lazım iken başka bir hesaptan girdiğimizde düzenle butonu oradadada görunuyor, bu yuzden yetkili kullanıcı oturumu açık olan kullanıcı(auth.currentUser.uid)
//! tweet.user.id buuda tweete atanın idsi
