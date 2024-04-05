import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useEffect, useState } from "react";
import Aside from "./Aside";
import Main from "./Main";
import Nav from "./Nav";

const FeedPage = () => {
  const [user, setUser] = useState(null);

  //kullanıcı verisini al ve state e aktar
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // kullaıcı home sayfasından ayrıldığında onAuthStateChanged methodunun sürekli kullanıcı oturumunu izleme olayını ipal ediyoruz.(performasn +)
    return () => unsub();
  }, []);

  // console.log(user);
  return (
    // sectiona feed clası verdik grid yapısını css te yazmak için çünkü grid yapısını tailwind te değil css te daha iyi yazarız.
    <section className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </section>
  );
};

export default FeedPage;

//! dosya ismini değiştirip index yaptık ve feedpage adlı bi klasorun içine koyduk böylelikle önceden yaptığımız dosya ismi importlarını değiştirmek zorunda kalmadık çünkü klasörde index.jsx varsa kalsör direk ona bakıyor başka bi yere bakmaz.

//? onAuthStateChanged kullanıcı hareketlerini surekli izler.. sayfayı değiştirip yeniden aynı sayfaya gelice yeniden izlemye alır bu arttıkça izleme olayları artar, bu nedenle bir önceki izleyiciyi durdurmak gerekiyorki bu izleyiciler ustuste binmesin ve performans sorunlarına sebep olmasın bu yuzden unsub fonksiyonu kullandık
