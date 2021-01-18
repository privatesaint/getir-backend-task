import supertest from "supertest";
import app from "../../app";
import dbconnection from "../../config/connection";

let connection;
let request;

beforeAll(async () => {
  connection = await dbconnection();
  request = await supertest(app);
});

afterAll(async () => {
  await connection.disconnect();
});

describe("Fetch Records", () => {
  test("should fetch records with valid data", async (done) => {
    const { body } = await request
      .post("/api/records")
      .send({
        startDate: "2016-01-26",
        endDate: "2018-02-02",
        minCount: 1000,
        maxCount: 2700,
      })
      .expect(200);
    expect(body.code).toEqual(0);
    expect(body.msg).toEqual("Success");
    done();
  });

  test("should return 400 error with invalid payload", async (done) => {
    const { body } = await request.post("/api/records").send({}).expect(400);
    expect(body.code).toEqual(1);
    expect(body.msg).toEqual("Start date is required");
    done();
  });

  test("should return 400 error with invalid end date", async (done) => {
    const { body } = await request
      .post("/api/records")
      .send({
        startDate: "2016-01-26",
        endDate: "2015-01-26",
        minCount: 1000,
        maxCount: 2000,
      })
      .expect(400);
    expect(body.code).toEqual(1);
    expect(body.msg).toEqual("End date must be greater than start date");
    done();
  });

  test("should return 400 error with invalid maxCount", async (done) => {
    const { body } = await request
      .post("/api/records")
      .send({
        startDate: "2016-01-26",
        endDate: "2016-01-28",
        minCount: 2000,
        maxCount: 1000,
      })
      .expect(400);
    expect(body.code).toEqual(1);
    expect(body.msg).toEqual(
      "Maximum count must be greater than minimum count"
    );
    done();
  });
});
