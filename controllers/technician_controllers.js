import Technician from "../model/technician_model.js";

export const createTechnician = async (req, res, next) => {
  const newTechnician = new Technician(req.body);
  try {
    const technicianSaved = await newTechnician.save();
    res.status(200).json(technicianSaved);
  } catch (error) {
    next(error);
  }
};

export const getAllTechnician = async (req, res, next) => {
  try {
    const getAll = await Technician.find().sort({ createdAt: -1 });
    res.status(200).json(getAll);
  } catch (error) {
    next(error);
  }
};
