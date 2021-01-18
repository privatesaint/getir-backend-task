import { Router } from "express";

import getRecords from "../controllers/RecordController";
import requestValidator from "../middleware/RequestValidator";

const router = Router();

router.post("/records", requestValidator, getRecords);

export default router;
