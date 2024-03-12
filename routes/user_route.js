import express from "express";
import {
  EditSingleItem,
  GetSingleItem,
  checkUser,
  createJob,
  deleteItem,
  getAllData,
  getInvoice,
  getJobCard,
  test,
} from "../controllers/user_controllers.js";

const router = express.Router();

router.get("/test", test);
router.post("/createjob", createJob);
router.get("/getjobdata", getAllData);
router.delete("/deleteitem/:id", deleteItem);
router.get("/getsingleitem/:id", GetSingleItem);
router.put("/editsingleitem/:id", EditSingleItem);
router.get("/checkUser/:number", checkUser);
router.get("/getinvoice/:id",getInvoice)
router.get("/getjobcard/:id",getJobCard)

export default router;
