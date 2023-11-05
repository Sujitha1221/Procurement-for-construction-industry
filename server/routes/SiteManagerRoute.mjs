// Import the 'express' framework and the required controller functions from the specified paths.
import express from "express";
import { register, login } from "../controllers/SiteManagerController.mjs";

// Create an instance of an Express Router.
const route = express.Router();

// Define routes for handling site manager registration and login.

// Route to register a site manager, using the 'register' controller function.
route.post("/register", register);

// Route to log in a site manager, using the 'login' controller function.
route.post("/login", login);

// Export the router to be used by the application.
export default route;
