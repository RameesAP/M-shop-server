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

export const deleteItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const itemToDelete = await JobModel.findByIdAndDelete(itemId);

    if (!itemToDelete) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      deletedItem: itemToDelete,
    });
  } catch (error) {
    next(error);
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetSingleItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;

    // Retrieve the single item based on its ID
    const singleItem = await JobModel.findById(itemId);

    if (!singleItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      message: 'Item retrieved successfully',
      singleItem: singleItem,
    });
  } catch (error) {
    next(error);
    console.error(error);
    next(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const EditSingleItem = async (req, res, next) => {
  try {
    const itemId = req.params.id; // Corrected from req.params.itemId to req.params.id
    const updatedData = req.body;

    // Your validation or additional logic here

    // Update the item in the database
    const updatedItem = await JobModel.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Send the updated item as a response
    res.status(200).json({ message: 'Item updated successfully', updatedItem });
  } catch (error) {
    next(error);
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};