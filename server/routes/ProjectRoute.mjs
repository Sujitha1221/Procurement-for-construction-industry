// Import the 'express' framework and the required controller functions from the specified paths.
import express from "express";
import {
  addProject,
  getProjectByEmpId,
} from "../controllers/ProjectController.mjs";

// Create an instance of an Express Router.
const route = express.Router();

// Define routes for adding and retrieving projects.

// Route to add a project, using the 'addProject' controller function.
route.post("/add-project", addProject);

// Route to get projects by employee ID, using the 'getProjectByEmpId' controller function.
route.get("/get-project-by-empid/:empId", getProjectByEmpId);

// Export the router to be used by the application.
export default route;
