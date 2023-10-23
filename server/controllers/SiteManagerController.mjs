// Import the 'SiteManager' model, 'bcrypt' library, and 'logger' utility from the specified paths.
import SiteManager from "../models/SiteManager.mjs";
import bcrypt from "bcrypt";
import logger from "../utils/logger.mjs";

// Define an asynchronous function to register a site manager.
export const register = async (req, res) => {
  // Destructure request data, including 'empId', 'name', and 'password'.
  const { empId, name, password } = req.body;

  try {
    // Create a new site manager in the database with the provided 'empId', 'name', and 'password'.
    const siteManager = await SiteManager.create({
      empId,
      name,
      password,
    });

    // Log a success message indicating that the site manager was added, and respond with the created site manager data.
    logger.info("Site Manager added");
    res.json(siteManager);
  } catch (err) {
    // If an error occurs during site manager creation, log the error.
    logger.error(`Error creating site manager: ${err.message}`);
  }
};

// Define an asynchronous function to handle site manager login.
export const login = async (req, res) => {
  // Destructure 'empId' and 'password' from the request body.
  const { empId, password } = req.body;

  try {
    // Find a site manager by 'empId'.
    const siteManager = await SiteManager.findOne({ empId });

    if (!siteManager) {
      // If the site manager is not found, respond with an error message and log it.
      logger.error(`User not found`);
      return res.status(401).json({ error: "Invalid employee ID" });
    }

    // Compare the provided password with the hashed password stored in the database using 'bcrypt'.
    bcrypt.compare(password, siteManager.password, (err, response) => {
      if (err) {
        // Handle bcrypt error, respond with a 500 Internal Server Error, and log the error.
        logger.error("Bcrypt comparison failed");
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (response) {
        // If the password is correct, log a success message and respond with the 'empId'.
        logger.info("Logged in successfully");
        return res.json({ empId });
      } else {
        // If the password is incorrect, respond with an error message and log it.
        logger.error("Invalid password");
        return res.status(401).json({ error: "Invalid password" });
      }
    });
  } catch (e) {
    // Handle other errors, respond with a 501 Internal Server Error, and log the error.
    logger.error(`Error logging in: ${err.message}`);
    res.status(501).json({ error: "Internal Server Error" });
  }
};
