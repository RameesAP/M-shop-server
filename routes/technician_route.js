import express from "express";
import { createTechnician, getAllTechnician } from "../controllers/technician_controllers.js";

const router = express.Router();

router.post("/createtechnician", createTechnician);
router.get("/getalltechnician",getAllTechnician)

export default router;
