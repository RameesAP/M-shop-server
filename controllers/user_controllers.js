import JobModel from "../model/job_model.js";

export const test = (req, res) => {
  res.json({
    message: "APi route is working !",
  });
};

export const createJob = async (req, res, next) => {
  const newJob = new JobModel(req.body);
  try {
    const jobSaved = await newJob.save();
    res.status(200).json(jobSaved);
  } catch (error) {
    next(error);
  }
};

export const getAllData = async (req, res, next) => {
  try {
    const getAll = await JobModel.find().sort({ createdAt: -1 });
    res.status(200).json(getAll);
  } catch (error) {
    next(error);
  }
};