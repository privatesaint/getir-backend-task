import catchAsyncError from "../middleware/catchAsyncError";
import RecordService from "../services/Record";

export default catchAsyncError(async (req, res) => {
  const records = await RecordService.getRecords(req.body);

  return res.status(200).json({
    code: 0,
    msg: "Success",
    records,
  });
});
