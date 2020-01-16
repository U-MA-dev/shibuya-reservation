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
  const response = await db
    .collection(databaseConfig.RESERVE_COLLECTION_NAME)
    .insert({
      id: 1,
      reserved_at: req.body.reservedAt,
      name: req.body.name,
      email: req.body.email,
      space_id: req.body.spaceId,
      created_at: str_now,
      updated_at: str_now
    });
  console.log(response);
  client.close();

  res.end();
};
