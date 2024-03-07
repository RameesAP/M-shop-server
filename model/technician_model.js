import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema(
  {
    technician_name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Technician = mongoose.model("Technician", technicianSchema);

export default Technician;
