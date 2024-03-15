import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    jobsheetno: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    problem: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    model: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    condition: {
      type: String,
      require: true,
    },
    place: {
      type: String,
    },
    ime: {
      type: String,
      require: true,
    },
    deliveryOption: {
      type: String,
      enum: ["direct", "courier"], // Enumerated values for delivery options
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    remark: {
      type: String,
      require: true,
    },

    status: {
      type: String,
      default: "new",
    },
    jobsheetno: {
      type: Number,
      unique: true,
    },
    price: {
      type: Number,
     
    },
    technician_name: {
      type: String,
     
    },
  },
  { timestamps: true }
);

// Define a pre-save middleware to auto-increment jobsheetno
JobSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      // If the document is not new, do not increment jobsheetno
      return next();
    }

    // Find the highest existing jobsheetno
    const highestJobSheetNo = await this.constructor.findOne(
      {},
      { jobsheetno: 1 },
      { sort: { jobsheetno: -1 } }
    );

    // Set the jobsheetno for the new document
    this.jobsheetno = highestJobSheetNo ? highestJobSheetNo.jobsheetno + 1 : 1;

    next();
  } catch (error) {
    next(error);
  }
});

const JobModel = mongoose.model("Job", JobSchema);

export default JobModel;
