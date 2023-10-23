// PurchaseRequisition.mjs

import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  }
});

const Project = mongoose.model(
  "Project",
  ProjectSchema
);

export default Project;
