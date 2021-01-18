import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";
import catchAsyncError from "../middleware/catchAsyncError";

const Joi = JoiBase.extend(JoiDate);

export default catchAsyncError(async (req, res, next) => {
  const data = req.body;

  const requestSchema = Joi.object({
    startDate: Joi.date().required().format("YYYY-MM-DD").max("now").messages({
      "date.base": "Not a valid date",
      "date.format": "Invalid date format",
      "any.required": "Start date is required",
      "date.max": "Start date must be less than or equal to today",
    }),
    endDate: Joi.date()
      .required()
      .format("YYYY-MM-DD")
      .min(Joi.ref("startDate"))
      .max("now")
      .messages({
        "date.base": "Not a valid date",
        "date.base": "Not a valid date",
        "date.format": "Invalid date format",
        "any.required": "End date is required",
        "any.ref": "End date must be greater than start date",
        "date.max": "End date must be less than or equal to today",
        "date.min": "End date must be greater than start date",
      }),
    minCount: Joi.number().required().messages({
      "number.base": "Invalid value",
      "any.required": "Minimum count is required",
    }),
    maxCount: Joi.number().required().min(Joi.ref("minCount")).messages({
      "number.base": "Invalid value",
      "any.required": "Maximum count is required",
      "number.min": "Maximum count must be greater than minimum count",
    }),
  });

  const validatedData = await requestSchema.validateAsync(data);

  if (validatedData) {
    next();
  }
});
