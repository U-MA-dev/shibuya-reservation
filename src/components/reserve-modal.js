import React, { useContext, useState } from "react";
import Modal from "react-modal";
import classrooms from "./../constants/classrooms";
import timeZones from "./../constants/time-zones";
import AppContext from "./../contexts/app-context";
import ModalContext from "./../contexts/modal-context";
import ReserveConfirm from "./../components/reserve-confirm";
import ReserveForm from "./../components/reserve-form";

Modal.setAppElement("#root");
const ReserveModal = () => {
  const appHandler = useContext(AppContext);
  const [classroom, setClassroom] = useState(classrooms.places[0].code);
  const [timeZone, setTimeZone] = useState(timeZones.classification[0].code);
  const [isReserve, setIsReserve] = useState(false);

  const closeModal = () => {
    appHandler.setIsOpen(false);
    setIsReserve(false);
  };

  return (
    <ModalContext.Provider
      value={{
        classroom,
        setClassroom,
        timeZone,
        setTimeZone,
        setIsReserve,
        closeModal
      }}
    >
      <div>
        <Modal isOpen={appHandler.modalIsOpen} onRequestClose={closeModal}>
          {!isReserve && <ReserveConfirm />}
          {isReserve && <ReserveForm />}
        </Modal>
      </div>
    </ModalContext.Provider>
  );
};

export default ReserveModal;
