import express from "express";
import { createJob, getAllData, test } from "../controllers/user_controllers.js";

const router = express.Router();

router.get("/test", test);
router.post("/createjob",createJob)
router.get("/getjobdata",getAllData)

export default router;
