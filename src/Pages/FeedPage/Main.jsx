import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();
  useEffect(() => {
    //abone oluncak kolleksiyonun referansını al(verileri canlı olarak almakyani)
    const collectionRef = collection(db, "tweets");

    //atılan twetlerin sırasını belirle(ayarları belirle)
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    //kolecsiyondaki verileri canlı olarak al(tweetlere abone ol)
    //const unsub = onSnapshot(collectionRef, (snapshot)
    const unsub = onSnapshot(q, (snapshot) => {
      const tempTweets = []; // veriler dokuman olarak göeliyor foreachile dönüp

      //!snapshot.docs.forEach((doc) => console.log(doc.data() nesneyi dağıtarak yazdık çunku id documanda ayrı geliyor, datayı ayrı aldık id yi ayrı aldık
      snapshot.docs.forEach((doc) =>
        tempTweets.push({ ...doc.data(), id: doc.id })
      );
      //console.log(tempTweets); //bunları yaptıktan sonra state e aktarmak için usestate tutuuyoruz
      setTweets(tempTweets);
    });
    // onsnapshot a unsub atarız çunku firrebase da sürekli izleme olayı var bu performans duşuuklupune sebep oluyor.. yanı kullanıcı sayfadan ayrıldığı zaman kolleksiyonu izlemeyi bırak
    return () => unsub(); //bunda sonra aşağıya inip twetleri ekrana basması için ternary yazarız
  }, []);
  return (
    <div className="border border-zinc-600 overflow-y-auto">
      <header className="font-bold p-4 border-b border-zinc-600">
        Anasayfa
      </header>
      <Form user={user} />
      {!tweets ? (
        <Loader styles={`w-8 h-8 my-10`} />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
