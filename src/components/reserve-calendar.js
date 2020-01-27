import React, { useState, useEffect } from "react";
import { dateFormater_YYMMDD } from "./../common/util";
import holidayConfig from "./../constants/holiday-config";
import AppContext from "./../contexts/app-context";
import ReserveModal from "./reserve-modal";
import classrooms from "./../constants/classrooms";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar/dist/Calendar";
import axios from "axios";
import apiConfig from "./../common/api-config";

const ReserveCalendar = () => {
  const now = new Date();
  const [date, setDate] = useState(now);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reservedData, setReservedDate] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (monthDate = now) => {
    const strDate = dateFormater_YYMMDD({ date: monthDate });
    const fetchKey = strDate.slice(0, 6);

    const response = await axios.get(apiConfig.URI.FETCH_RESERVE_URI, {
      params: {
        key: fetchKey
      }
    });

    setReservedDate(response.data);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const Tile = ({ date }) => {
    const strDate = dateFormater_YYMMDD({ date });

    useEffect(() => {}, []);

    return (
      <>
        <div className="reserveButton" variant="contained">
          <div className="buttonContents">
            {classrooms.places.map(place => {
              return (
                <div key={place.code}>
                  <span className="place">{place.name}: </span>
                  {now.getTime() > date.getTime() && (
                    <span className="past">-</span>
                  )}
                  {now.getTime() <= date.getTime() &&
                    !holidayConfig[place.code].includes(strDate) && (
                      <span className="unreserved">◯</span>
                    )}
                  {now.getTime() <= date.getTime() &&
                    holidayConfig[place.code].includes(strDate) && (
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
  const onClickMonth = value => {
    fetchData(value);
  };
  const onActiveDateChange = ({ activeStartDate }) => {
    fetchData(activeStartDate);
  };

  return (
    <AppContext.Provider value={{ date, modalIsOpen, setIsOpen, reservedData }}>
      <div>
        <Calendar
          locale="ja-JP"
          showNeighboringMonth={false}
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          onClickDay={onClickDay}
          onClickMonth={onClickMonth}
          onActiveDateChange={onActiveDateChange}
        />
      </div>
      <ReserveModal className="modal" />
      <style>
        {`
        .react-calendar {
          min-width: 100%;
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
