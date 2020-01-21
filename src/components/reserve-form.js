import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useContext, useState } from "react";
import apiConfig from "./../common/api-config";
import { dateFormater_display, dateFormater_YYMMDD } from "./../common/util";
import classrooms from "./../constants/classrooms";
import timeZones from "./../constants/time-zones";
import appContext from "./../contexts/app-context";
import modalContext from "./../contexts/modal-context";

const ReserveForm = () => {
  const appHandler = useContext(appContext);
  const modalHandler = useContext(modalContext);
  const [seatId, setSeatId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dateData =
    appHandler.reservedData[dateFormater_YYMMDD({ date: appHandler.date })];
  const classroomData = dateData ? dateData[modalHandler.classroom] : null;
  const timeZoneData = classroomData
    ? classroomData[modalHandler.timeZone]
    : null;

  const insertReserve = () => {
    const body = {
      reservedAt: dateFormater_YYMMDD({ date: appHandler.date }),
      classroom: modalHandler.classroom,
      timeZone: modalHandler.timeZone,
      seatId: seatId,
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

  return (
    <>
      <div>
        <h1>自習室予約フォーム</h1>
        <div className="reserveForm">
          <div className="dateColumn">
            <TextField
              disabled
              label="日程"
              value={dateFormater_display({ date: appHandler.date })}
              variant="filled"
            />
          </div>
          <div className="classroomColumn">
            {Object.keys(modalHandler.placeInfo).length && (
              <TextField
                disabled
                label={classrooms.label}
                value={modalHandler.placeInfo.name}
                variant="filled"
              />
            )}
          </div>
          <div className="timeZoneColumn">
            {Object.keys(modalHandler.classificationInfo).length && (
              <TextField
                disabled
                label={timeZones.label}
                value={modalHandler.classificationInfo.name}
                variant="filled"
              />
            )}
          </div>
          <div className="reserveRegion">
            <div className="imageRegion">
              <img src={modalHandler.placeInfo.map_img} alt="" />
            </div>
            <div className="reservedSeatRegion">
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
          <div className="seatCulumn">
            <FormControl>
              <InputLabel>席ID</InputLabel>
              <Select
                value={seatId}
                onChange={event => {
                  event.persist();
                  setSeatId(event.target.value);
                }}
              >
                <MenuItem value={0}>
                  <em>選択してください</em>
                </MenuItem>
                {[...Array(modalHandler.placeInfo.seatNum).keys()].map(si => {
                  si += 1;
                  if (!timeZoneData || !timeZoneData[si]) {
                    return (
                      <MenuItem key={si} value={si}>
                        {si}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </div>
          <div className="nameColumn">
            <TextField
              required={true}
              label="名前"
              value={name}
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
              value={email}
              onChange={event => {
                event.persist();
                setEmail(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <Button
            variant="contained"
            onClick={() => modalHandler.setIsReserve(false)}
          >
            戻る
          </Button>
          <Button variant="contained" onClick={reserve}>
            予約確定
          </Button>
        </div>
      </div>
      <style jsx>{`
        .reserveRegion {
          width: 100%;
        }
        .imageRegion {
          float: left;
        }
        .imageRegion img {
          display: inline-block;
          max-height: 400px;
        }
        .reservedSeatRegion {
        }
        .buttons {
          clear: left;
        }
      `}</style>
    </>
  );
};

export default ReserveForm;
