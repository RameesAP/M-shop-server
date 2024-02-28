import express from "express";
import { createJob, test } from "../controllers/user_controllers.js";

const router = express.Router();

router.get("/test", test);
router.post("/createjob",createJob)

export default router;
