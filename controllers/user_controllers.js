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
