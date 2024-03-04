import express from "express";
import {
  EditSingleItem,
  GetSingleItem,
  createJob,
  deleteItem,
  getAllData,
  test,
} from "../controllers/user_controllers.js";

const router = express.Router();

router.get("/test", test);
router.post("/createjob", createJob);
router.get("/getjobdata", getAllData);
router.delete("/deleteitem/:id", deleteItem);
router.get("/getsingleitem/:id", GetSingleItem);
router.put("/editsingleitem/:id", EditSingleItem);

export default router;
