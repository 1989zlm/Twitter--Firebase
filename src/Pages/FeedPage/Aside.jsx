import { collection, count, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Aside = () => {
  const [tweetsCount, setTweetsCount] = useState(0);

  useEffect(() => {
    //kaç tweet attıysak onun aside kısmında sayı olarak görmek için bu yaıldı
    const tweetsCol = collection(db, "tweets");
    const q = query(tweetsCol, count());

    onSnapshot(
      q,
      (snapshot) => {
        //  console.log(snapshot.size);
        setTweetsCount(snapshot.size);
      },
      []
    );
  }, []);
  return (
    <div className="max-xl:hidden p-4">
      <h1 className="text-xl font-semibold">Gönderi Sayısı: {tweetsCount}</h1>
    </div>
  );
};

export default Aside;
