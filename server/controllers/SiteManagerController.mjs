import SiteManager from "../models/SiteManager.mjs";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { empId, name, password } = req.body;

  try {
    const siteManager = await SiteManager.create({
      empId,
      name,
      password,
    });
    console.log({ status: "Success", siteManager });
    res.json(siteManager);
  } catch (err) {
    console.log({ status: "Error", err });
  }
};

export const login = async (req, res) => {
  const { empId, password } = req.body;
  console.log(empId);

  try {
    const siteManager = await SiteManager.findOne({ empId });

    if (!siteManager) {
      // User not found
      return res.status(401).json({ error: "Invalid employee Id" });
    }

    bcrypt.compare(password, siteManager.password, (err, response) => {
      if (err) {
        // Handle bcrypt error
        return res.status(500).json({ error: "Internal Server Error1" });
      }

      if (response) {
        return res.json({ empId });
      } else {
        // Incorrect password
        return res.status(401).json({ error: "Invalid password" });
      }
    });
  } catch (e) {
    // Handle other errors
    res.status(501).json({ error: "Internal Server Error" });
  }
};
