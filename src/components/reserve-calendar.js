import lodash from "lodash";
import React, { useState } from "react";
import { dateFormater_YYMMDD } from "./../common/util";
import holidayConfig from "./../constants/holiday-config";
import AppContext from "./../contexts/app-context";
import ReserveModal from "./reserve-modal";
import classrooms from "./../constants/classrooms";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar/dist/Calendar";

const fetchEvents = () => {
  const reservedDate = lodash.cloneDeep(holidayConfig);

  return reservedDate;
};

const ReserveCalendar = () => {
  const now = new Date();
  const [date, setDate] = useState(now);
  const [reservedDate] = useState(fetchEvents());
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const Tile = ({ date }) => {
    const strDate = dateFormater_YYMMDD({ date });
    return (
      <>
        <div className="reserveButton" variant="contained">
          <div>
            {classrooms.places.map(place => {
              return (
                <div key={place.code}>
                  <span className="place">{place.name}: </span>
                  {now.getTime() > date.getTime() && (
                    <span className="past">-</span>
                  )}
                  {now.getTime() <= date.getTime() &&
                    !reservedDate[place.code].includes(strDate) && (
                      <span className="unreserved">◯</span>
                    )}
                  {now.getTime() <= date.getTime() &&
                    reservedDate[place.code].includes(strDate) && (
                      <span className="reserved">×</span>
                    )}
                </div>
              );
            })}
          </div>
        </div>
        <style>
          {`
          .reserveButton {
            margin: 0;
          }
          .place {
            color: black;
          }
          .past{
            color: black;
          }
          .reserved {
            color: red;
          }
          .unreserved {
            color: deepskyblue;
          }
        `}
        </style>
      </>
    );
  };

  const tileContent = ({ date, view }) =>
    view === "month" ? <Tile date={date} /> : null;
  const onClickDay = () => {
    openModal();
  };

  return (
    <AppContext.Provider value={{ date, modalIsOpen, setIsOpen }}>
      <div>
        <Calendar
          locale="ja-JP"
          showNeighboringMonth={false}
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          onClickDay={onClickDay}
        />
      </div>
      <ReserveModal />
      <style>
        {`
        .react-calendar {
          width: 100%;
        }
        .react-calendar__tile{
          height: 100px;
        }
      `}
      </style>
    </AppContext.Provider>
  );
};

export default ReserveCalendar;
