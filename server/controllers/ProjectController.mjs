// Import the 'Project' model and 'logger' utility from the specified paths.
import Project from "../models/Project.mjs";
import logger from "../utils/logger.mjs";

// Define an asynchronous function to add a project to the database.
export const addProject = async (req, res) => {
  // Destructure 'empId' and 'projectName' from the request body.
  const { empId, projectName } = req.body;

  try {
    // Create a new project in the database with the provided 'empId' and 'projectName'.
    const project = await Project.create({
      empId,
      projectName,
    });

    // Log a success message indicating that the project was created successfully and respond with the project data in JSON format.
    console.log({ status: "Success", project });
    res.json(project);
    logger.info("Project created successfully");
  } catch (err) {
    // If an error occurs during project creation, log the error and respond with an error message.
    console.log({ status: "Error", err });
    logger.error(`Error creating project: ${err.message}`);
  }
};

// Define an asynchronous function to retrieve projects by 'empId'.
export const getProjectByEmpId = async (req, res) => {
  // Destructure 'empId' from the request parameters.
  const { empId } = req.params;

  try {
    // Find projects in the database that match the provided 'empId'.
    const projects = await Project.find({ empId: empId });

    if (!projects || projects.length === 0) {
      // If no projects are found, log a message and respond with a message indicating no projects were found.
      logger.info("No projects for the site manager");
      return res.json({ status: "No Projects found" });
    } else {
      // Log a success message indicating that projects were fetched and respond with the retrieved projects in JSON format.
      logger.info("Projects fetched");
      return res.json(projects);
    }
  } catch (err) {
    // If an error occurs during project retrieval, log the error and respond with an error message.
    logger.error(`Error fetching projects: ${err.message}`);
    return res.json({ status: "Error", err });
  }
};
