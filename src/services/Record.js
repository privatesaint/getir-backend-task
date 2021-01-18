import { connection } from "mongoose";

class RecordService {
  /**
   * @description connect to records collection
   */
  static async collection() {
    return await connection.db.collection("records");
  }

  /**
   * @description filter records
   * @param {*} data
   */
  static async getRecords(data) {
    const collection = await this.collection();
    const { startDate, endDate, minCount, maxCount } = data;

    const match = {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      },
    };

    const project = {
      $project: {
        key: "$key",
        createdAt: "$createdAt",
        totalCount: {
          $sum: "$counts",
        },
        _id: 0,
      },
    };

    return await collection.aggregate([project, match]).toArray();
  }
}

export default RecordService;
