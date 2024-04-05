import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Loader from "./Loader";

const Form = ({ user }) => {
  // console.log(user);
  //teweetle butonundaki yuklenıyor
  const [isLoading, setIsLoading] = useState(false);
  //teweet atma ve resim vs yukleme olayı
  const tweetsCol = collection(db, "tweets");

  // dosya resimse, resmi storage'a yukler ve
  // resmin urlini fonksiyonun çağrıldığı yere döndürür
  const uploadImage = async (file) => {
    // console.log(file);

    //1) dosya resim değilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) {
      return null;
    }
    // console.log("deneme");
    //2) eğer dosya resimse dosyanının yukleneceği konumun referansını al
    const fileRef = ref(storage, v4() + file.name);
    //3) referansını oluşturduğumuz konuma dosyayı ykle
    await uploadBytes(fileRef, file);
    // console.log("deneme");
    //4) yuklenen dosyanın url ine eriş ve öndür
    return await getDownloadURL(fileRef);
  };

  // form gönderildiğinde
  const handleSubmit = async (e) => {
    e.preventDefault();

    //!yuklenme stateını true'ya çek(ne zaman false çekmelıyız, yuklenme bitttiğinde, yullenma ne zaman bıter, adddoc methodu görevini bitirdiğinde oyuzden false kısmını onun altına yazıyoruz )bunu once buraya yazdık ama input boşken twettle butonuna basınca yukleniyor dönüyor ve hiç durmuyor o yuzden set ısloadıngı if'in altına aldık
    // setIsLoading(true);

    //1) inputlardaki verilere eriş
    // console.dir(e.target);
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    //2) yazı ve resim içeriğin yoksa uyarı ver
    // console.log(textContent, imageContent);
    if (!textContent && !imageContent) {
      return toast.info("Lütfen içerik giriniz");
    }
    //!yuklenme stateını true'ya çek
    setIsLoading(true);

    try {
      //3) resmi storage' yğkle
      //uploadImage(imageContent);
      const url = await uploadImage(imageContent);
      // console.log(url);
      //4) yeni tweet dökümanı koleksiyona ekle (bu 4. adım için önce firebaseda createdata yap dedik, sonra config.js e geldik getFirebasestore'u import ve export ettik, sonra yine firebase geçtik ve colection oluşturduk sonra buraya geldik.async ekledik handlsubmıte'e ve await ilede addoc u yazdık, collectinu tanımladık....(imagecotetenti önce null tanımladık))
      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        like: [],
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (err) {
      console.log(err);
    }
    // yuklenme stateini false çek
    setIsLoading(false);

    //5)
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt={user?.displayName}
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />

        <div className="flex justify-between items-center">
          <label
            className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="image"
          >
            <BsCardImage />{" "}
          </label>

          <input className="hidden" id="image" type="file" />

          <button
            type="submit"
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? (
              <>
                <Loader syles={`!text-white`} />
                <span className="text-[10px] ms-2">Yükleniyor</span>
              </>
            ) : (
              " Tweetle"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
