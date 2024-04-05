import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // kullnıcın yetkisi varmı ? state'i
  const [isAuth, setIsAuth] = useState();

  //   const navigate = useNavigate();

  useEffect(() => {
    // onAuthStateChanged > kullanıcı otrumunun değişiminş izle(açılma kapanma)
    const unsub = onAuthStateChanged(auth, (user) => {
      // eğer oturum açtıysa yetkiyi true'ya, kapattıysa false'a çekiyoruz
      setIsAuth(user ? true : false);
    });
    return () => unsub();
  }, []);

  // eğerki yetkisi yoksa ekrana bunu bas
  if (isAuth === false) {
    // useNavigate kullanınca bileşen tam yüklenemden yönlendirme yapmamızdan kaynkalı react uyarı veriyordu bizde useNavigate yerine Navigate bileşeni kullandık. Bunu kullanınca browser router bileşenin yüklenem işlemini tamamlmış gibi allgıyo ve "to" propu oalrak tanımmdladığımız sayfaya yönlendiriyor
    return <Navigate to={"/"} />;
  }

  // kapsayıcı bir route'da alt route'u çağırma
  return <Outlet />;
};

export default ProtectedRoute;
