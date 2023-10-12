import mongoose from "mongoose";

const SiteManagerSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const SiteManager = mongoose.model(
  "SiteManager",
  SiteManagerSchema
);

export default SiteManager;
