import mongodb from "mongodb";
import databaseConfig from "../../constants/database-config";
import url from "url";

export default async (req, res) => {
  const url_parse = url.parse(req.url, true);
  const query = url_parse.query;

  const connectOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  const client = await mongodb.MongoClient.connect(
    databaseConfig.HOST_URI,
    connectOption
  );
  const db = client.db(databaseConfig.DB_NAME);

  const searchKey = new RegExp(query.key, "g");
  await db
    .collection(databaseConfig.RESERVE_COLLECTION_NAME)
    .aggregate([
      { $match: { reserved_at: searchKey } },
      {
        $lookup: {
          from: databaseConfig.SPACE_COLLECTION_NAME,
          localField: "space_id",
          foreignField: "_id",
          as: "space"
        }
      },
      {
        $lookup: {
          from: databaseConfig.TIME_ZONE_COLLECTION_NAME,
          localField: "time_zone_id",
          foreignField: "_id",
          as: "time_zone"
        }
      }
    ])
    .toArray()
    .then(docs => {
      res.status(200).json(convertObj(docs));
    })
    .catch(err => {
      res.status(500).json({});
      console.log(err);
    })
    .then(() => {
      client.close();
    });

  client.close();

  res.end();
};

const convertObj = arr => {
  const obj = {};
  for (let a of arr) {
    const date = a.reserved_at;
    const place = a.space[0].place;
    const time_zone = a.time_zone[0].time_zone;
    const seat_id = a.space[0].seat_id;
    if (!obj[date]) {
      obj[date] = { [place]: { [time_zone]: { [seat_id]: a } } };
    } else {
      if (!obj[date][place]) {
        obj[date][place] = { [time_zone]: { [seat_id]: a } };
      } else {
        if (!obj[date][place][time_zone]) {
          obj[date][place][time_zone] = {};
        }
        obj[date][place][time_zone][seat_id] = a;
      }
    }
  }

  return obj;
};
