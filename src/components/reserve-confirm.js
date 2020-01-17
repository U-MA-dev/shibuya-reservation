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

const ReserveConfirm = () => {
  const appHandler = useContext(appContext);
  const modalHandler = useContext(modalContext);

  return (
    <div>
      <h1>自習室予約確認</h1>
      <div className="dateColumn">
        <TextField
          disabled
          label="日程"
          defaultValue={dateFormater_display({ date: appHandler.date })}
          variant="filled"
        />
      </div>
      <FormControl>
        <InputLabel>{classrooms.label}</InputLabel>
        <Select
          value={modalHandler.classroom}
          onChange={event => modalHandler.setClassroom(event.target.value)}
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
      <FormControl>
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
      <div
        style={{
          margin: "10px",
          width: "90%",
          height: "400px",
          backgroundColor: "red"
        }}
      >
        <div className="imageRegion">test</div>
        <div className="reservedSeatRegion">教室の予約状況</div>
      </div>
      <div className="buttons">
        <Button variant="contained" onClick={modalHandler.closeModal}>
          戻る
        </Button>
        <Button
          variant="contained"
          onClick={() => modalHandler.setIsReserve(true)}
        >
          席予約
        </Button>
      </div>
    </div>
  );
};

export default ReserveConfirm;
