import { FiEdit2 } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { useRef } from "react";

//!NOT: BU DORPDOWN U LOADERSTEN ALDIK AMA BUTONA BASINCA DUZENLE DİYODUK DUZENLEME MODUNA GİRİNCE MENU KAPANMIYORDU. BU NEDENLE BİZDE İNPUTA REF VERDİK. DUZENLE BUTONUNDA HALİHAZIRDA VVAROLAN HANDLEEDİTE BİDE İNPUTREF TANIMLADIK.cureent chacked ide incele yapıp consoldn yazdık

const Dropdown = ({ handleDelete, handleEdit }) => {
  const inputRef = useRef();
  return (
    <label className="popup">
      <input ref={inputRef} type="checkbox" />
      <div className="burger" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <legend>Aksiyonlar</legend>
        <ul>
          <li>
            <button
              onClick={() => {
                handleEdit();
                inputRef.current.checked = false;
              }}
            >
              <FiEdit2 />
              <span>Düzenle</span>
            </button>
          </li>
          <hr />
          <li>
            <button onClick={handleDelete}>
              {/* //!bu svglerın yerine react ıcondan ıcon aldık <svg
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line y2="18" x2="6" y1="6" x1="18"></line>
                <line y2="18" x2="18" y1="6" x1="6"></line>
              </svg> */}

              <FaTrashAlt />
              <span>Sil</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default Dropdown;
