import mongodb from "mongodb";
import databaseConfig from "../../constants/database-config";
import { dateFormater_YYMMDD } from "./../../common/util";

export default async (req, res) => {
  const str_now = dateFormater_YYMMDD({ date: new Date() });

  const connectOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  const client = await mongodb.MongoClient.connect(
    databaseConfig.HOST_URI,
    connectOption
  );
  const db = client.db(databaseConfig.DB_NAME);

  const timeZoneRes = await db
    .collection(databaseConfig.TIME_ZONE_COLLECTION_NAME)
    .insert({ time_zone: req.body.timeZone });
  const spaceRes = await db
    .collection(databaseConfig.SPACE_COLLECTION_NAME)
    .insert({ place: req.body.classroom, seat_id: req.body.seatId });
  await db.collection(databaseConfig.RESERVE_COLLECTION_NAME).insert({
    reserved_at: req.body.reservedAt,
    name: req.body.name,
    email: req.body.email,
    time_zone_id: timeZoneRes.ops[0]._id,
    space_id: spaceRes.ops[0]._id,
    created_at: str_now,
    updated_at: str_now
  });
  client.close();

  res.end();
};
