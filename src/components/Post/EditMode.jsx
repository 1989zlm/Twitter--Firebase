import { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";
const EditMode = ({ tweet, close }) => {
  // yuklediğimiz resmi silmek için delete basınca ekran blurlansın
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  // kaydet butonunun tıklanma olayını izle
  const inputRef = useRef();

  //kaydet butonunnun tıklama olayını izleyeceğiz ama e.tergetle değil çunku input form ıçınde tanımlanmamış
  // e.target olayını ızleyebilik için hem form içinde olmalı hemde onsubmıt olmalı o yuzden useref kullanılır
  const handleSave = async () => {
    // console.log(inputRef.current);kaydete bastık consolda ınputun kendisini grduk
    //1)tıklanınca inputta yazdığımız yazı cıksın(yeni başlığa eriş)
    const newText = inputRef.current?.value;
    //2)guncellencek dökumanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    //3)dökümanın içeriğini güncelle
    const updated = isPicDeleting
      ? //!ispicdeletıng true (yani resim silinecekse) ise bunu yapilk iki değeri guncelle ama image'ı null yap
        {
          textContent: newText,
          isEdited: true, //bunu duznlndi yazısı çıksın dye verdik
          imageContent: null, //resmi kaldır
        }
      : //! resim silinmeycekse de yine ilk iki değer guncelle artık rsimle ilgili bişey demeye gerek yok
        {
          textContent: newText,
          isEdited: true, //bunu duznlndi yazısı çıksın dye verdik
        };

    await updateDoc(tweetRef, updated);

    //4) duzenleme modundan çık
    close();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="rounded p-1 px-2 text-black"
        defaultValue={tweet.textContent}
      />

      <button
        onClick={handleSave}
        className="mx-5 p-2 border text-green-400 rounded-lg shadow hover:bg-zinc-500 transition"
      >
        <BiSolidSave />
      </button>
      <button
        className="mx-5 p-2 border text-red-400 rounded-lg shadow hover:bg-zinc-500 transition"
        onClick={close}
      >
        <ImCancelCircle />
      </button>
      {/* tweet içeriğinde resim varsa */}
      {tweet.imageContent && (
        <div className="relative">
          <img
            className={`${
              isPicDeleting ? "blur" : ""
            }  my-2 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
          />

          <button
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-0 right-0 text-xl p-2 bg-white transition text-red-600 hover:scla-90 rounded-full"
          >
            {/* ispcdeleting varsa çöp kovası ıconu yoksa geri dön oku çıksın dedik  */}
            {isPicDeleting ? <BsTrashFill /> : <IoMdReturnLeft />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;
