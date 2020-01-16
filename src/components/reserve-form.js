import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";
import { dateFormater_display, dateFormater_YYMMDD } from "./../common/util";
import classrooms from "./../constants/classrooms";
import timeZones from "./../constants/time-zones";
import appContext from "./../contexts/app-context";
import modalContext from "./../contexts/modal-context";
import axios from "axios";
import apiConfig from "./../common/api-config";

const ReserveForm = () => {
  const appHandler = useContext(appContext);
  const modalHandler = useContext(modalContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isConfirm, setIsConfirm] = useState("");

  const insertReserve = () => {
    const body = {
      reservedAt: dateFormater_YYMMDD({ date: appHandler.date }),
      classroom: modalHandler.classroom,
      timeZome: modalHandler.timeZone,
      name: name,
      email: email
    };

    axios
      .post(apiConfig.URI.REGISTER_RESERVE_URI, body)
      .then(() => {
        alert("席の予約を行いました。");
      })
      .catch(error => {
        console.log(error);
        alert(`
        席の予約に失敗しました。
        お手数ですがしばらくしてから再度お試しください。`);
      });
  };

  const reserve = async () => {
    await insertReserve();
    modalHandler.closeModal();
  };

  const InputForm = () => {
    return (
      <div>
        <h1>自習室予約フォーム</h1>
        <div className="reserveForm">
          <div className="dateColumn">
            <TextField
              disabled
              label="日程"
              defaultValue={dateFormater_display({ date: appHandler.date })}
              variant="filled"
            />
          </div>
          <div className="classroomColumn">
            <FormControl component="fieldset">
              <FormLabel component="legend">{classrooms.label}</FormLabel>
              <RadioGroup
                aria-label={classrooms.class}
                name={classrooms.class}
                value={modalHandler.classroom}
                onChange={event =>
                  modalHandler.setClassroom(event.target.value)
                }
              >
                {classrooms.places.map(place => (
                  <FormControlLabel
                    key={place.code}
                    value={place.code}
                    control={<Radio color="primary" />}
                    label={place.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <div className="timeZoneColumn">
            <FormControl component="fieldset">
              <FormLabel component="legend">{timeZones.label}</FormLabel>
              <RadioGroup
                aria-label={timeZones.class}
                name={timeZones.class}
                value={modalHandler.timeZone}
                onChange={event => modalHandler.setTimeZone(event.target.value)}
              >
                {timeZones.classification.map(c => (
                  <FormControlLabel
                    key={c.code}
                    value={c.code}
                    control={<Radio color="primary" />}
                    label={c.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <div
            className="seatCulumn"
            style={{
              margin: "10px",
              width: "90%",
              height: "400px",
              backgroundColor: "red"
            }}
          >
            教室の予約状況
          </div>
          <div className="nameColumn">
            <TextField
              required={true}
              label="名前"
              variant="filled"
              onChange={event => {
                event.persist();
                setName(event.target.value);
              }}
            />
          </div>
          <div className="emailColumn">
            <TextField
              required={true}
              label="メールアドレス"
              variant="filled"
              onChange={event => {
                event.persist();
                setEmail(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <Button variant="contained" onClick={modalHandler.closeModal}>
            戻る
          </Button>
          <Button variant="contained" onClick={() => setIsConfirm(true)}>
            確認
          </Button>
        </div>
      </div>
    );
  };

  const InputConfirm = () => {
    return (
      <div>
        <h1>自習室予約フォーム</h1>
        <div className="reserveForm">
          <div className="dateColumn">
            <TextField
              disabled
              label="日程"
              defaultValue={dateFormater_display({ date: appHandler.date })}
              variant="filled"
            />
          </div>
          <div className="classroomColumn">
            {classrooms.places.map(place => {
              if (place.code === modalHandler.classroom) {
                return (
                  <TextField
                    key={place.code}
                    disabled
                    label={classrooms.label}
                    defaultValue={place.name}
                    variant="filled"
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="timeZoneColumn">
            {timeZones.classification.map(c => {
              if (c.code === modalHandler.timeZone) {
                return (
                  <TextField
                    key={c.code}
                    disabled
                    label={timeZones.label}
                    defaultValue={c.name}
                    variant="filled"
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <div
            className="seatCulumn"
            style={{
              margin: "10px",
              width: "90%",
              height: "400px",
              backgroundColor: "red"
            }}
          >
            教室の予約状況
          </div>
          <div className="nameColumn">
            <TextField
              disabled
              label={"名前"}
              defaultValue={name}
              variant="filled"
            />
          </div>
          <div className="emailColumn">
            <TextField
              disabled
              label={"メールアドレス"}
              defaultValue={email}
              variant="filled"
            />
          </div>
        </div>
        <div className="buttons">
          <Button variant="contained" onClick={() => setIsConfirm(false)}>
            戻る
          </Button>
          <Button variant="contained" onClick={reserve}>
            予約確定
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isConfirm && <InputForm />}
      {isConfirm && <InputConfirm />}
    </>
  );
};

export default ReserveForm;
