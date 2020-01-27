import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React, { useContext } from "react";
import { dateFormater_display } from "./../common/util";
import classrooms from "./../constants/classrooms";
import timeZones from "./../constants/time-zones";
import appContext from "./../contexts/app-context";
import modalContext from "./../contexts/modal-context";
import { dateFormater_YYMMDD } from "./../common/util";

const ReserveConfirm = () => {
  const appHandler = useContext(appContext);
  const modalHandler = useContext(modalContext);

  const dateData =
    appHandler.reservedData[dateFormater_YYMMDD({ date: appHandler.date })];
  const classroomData = dateData ? dateData[modalHandler.classroom] : null;
  const timeZoneData = classroomData
    ? classroomData[modalHandler.timeZone]
    : null;

  return (
    <>
      <div className="modalContents">
        <div className="modalHeader">自習室予約確認</div>
        <div className="modalBody">
          <div className="region dateRegion">
            <TextField
              disabled
              label="日程"
              defaultValue={dateFormater_display({ date: appHandler.date })}
              variant="filled"
              style={{ width: "100%" }}
            />
          </div>
          <div className="region classroomRegion">
            <FormControl style={{ width: "90%" }}>
              <InputLabel>{classrooms.label}</InputLabel>
              <Select
                value={modalHandler.classroom}
                onChange={event =>
                  modalHandler.setClassroom(event.target.value)
                }
              >
                {classrooms.places.map(place => {
                  return (
                    <MenuItem key={place.code} value={place.code}>
                      {place.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="region timeZoneRegion">
            <FormControl style={{ width: "90%" }}>
              <InputLabel>{timeZones.label}</InputLabel>
              <Select
                value={modalHandler.timeZone}
                onChange={event => modalHandler.setTimeZone(event.target.value)}
              >
                {timeZones.classification.map(c => {
                  return (
                    <MenuItem key={c.code} value={c.code}>
                      {c.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="reserveRegion">
            <div className="region imageRegion">
              <img src={modalHandler.placeInfo.map_img} alt="" />
            </div>
            <div className="region reservedSeatRegion">
              {[...Array(modalHandler.placeInfo.seatNum).keys()].map(si => {
                si += 1;
                if (timeZoneData && timeZoneData[si]) {
                  return (
                    <div key={si}>
                      {si} : {timeZoneData[si].name}
                    </div>
                  );
                } else {
                  return <div key={si}>{si} :</div>;
                }
              })}
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button variant="contained" onClick={modalHandler.closeModal}>
            戻る
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => modalHandler.setIsReserve(true)}
          >
            席予約
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReserveConfirm;
