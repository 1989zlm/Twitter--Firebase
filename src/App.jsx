import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import FeedPage from "./Pages/FeedPage";
import ProtectedRoute from "./Pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* herkes tarafından kullanılan bir route old.için giriş ayfası olan authpagei protectedroute içerisine almadık */}
        <Route path="/" element={<AuthPage />} />
        {/* Kullanıcının erişimi için hesabına giriş yapmasının zorunlu olmasını istediğimiz route'ları kapsayıcı bir router içerisine al */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<FeedPage />} />
          <Route path="/profil" element={<h1>Profil</h1>} />
          <Route path="/ayar" element={<h1>Ayar</h1>} />
          <Route path="/mesaj" element={<h1>Mesajlar</h1>} />
          <Route path="/mail" element={<h1>Mail</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
