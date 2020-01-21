import nakano_room from "./../../public/nakano_room.png";
import shibuya_room from "./../../public/shibuya_room.png";

const classrooms = {
  class: "classroom",
  label: "教室",
  places: [
    {
      code: "shibuya",
      name: "渋谷",
      orderedId: "1",
      seatNum: 7,
      map_img: shibuya_room
    },
    {
      code: "nakano",
      name: "中野",
      orderedId: "2",
      seatNum: 7,
      map_img: nakano_room
    }
  ]
};

export default classrooms;
