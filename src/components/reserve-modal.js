import React, { useContext, useState, useEffect } from "react";
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
  const [placeInfo, setPlaceInfo] = useState({});
  const [classificationInfo, setClassificationInfo] = useState({});

  useEffect(() => {
    for (let place of classrooms.places) {
      if (place.code === classroom) {
        setPlaceInfo(place);
      }
    }
    for (let c of timeZones.classification) {
      if (c.code === timeZone) {
        setClassificationInfo(c);
      }
    }
  }, [classroom, timeZone]);

  const closeModal = () => {
    appHandler.setIsOpen(false);
    setIsReserve(false);
  };

  const customStyles = {
    content: {
      maxHeight: "90%",
      maxWidth: "90%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: 0
    }
  };

  return (
    <>
      <ModalContext.Provider
        value={{
          classroom,
          setClassroom,
          timeZone,
          setTimeZone,
          setIsReserve,
          closeModal,
          placeInfo,
          classificationInfo
        }}
      >
        <div>
          <Modal
            style={customStyles}
            isOpen={appHandler.modalIsOpen}
            onRequestClose={closeModal}
          >
            {!isReserve && <ReserveConfirm />}
            {isReserve && <ReserveForm />}
          </Modal>
        </div>
      </ModalContext.Provider>
      <style>
        {`
          .modalContents {
            padding: 16px;
          }
          .modalHeader {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 8px;
            padding-bottom: 8px;
            font-weight: bold;
            font-weight: 20px;
            border-bottom: solid 1px #0000ff;
          }
          .modalBody{
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .region{
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .dateRegion{
            width: 100%;
          }
          .classroomRegion{
            width: 50%;
          }
          .timeZoneRegion{
            width: 50%;
          }
          .region img {
            display: inline-block;
            max-width: 260px;
          }
          .caution {
            color: red;
          }
          .buttons{
            display: flex;
            justify-content: space-between;
            padding-top: 8px;
          }
        `}
      </style>
    </>
  );
};

export default ReserveModal;
