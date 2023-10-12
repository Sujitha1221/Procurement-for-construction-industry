import User from "../models/User.mjs";
import logger from "../utils/logger.mjs";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const {
      empId,
      password,
      role
    } = req.body;
  
    console.log(empId + " " + password + " " + role); 
    const hashedPassword = await bcrypt.hash(password, 12);
  
    User.create({
        empId,
        password: hashedPassword,
        role
    })
      .then((User) => {
        console.log({ status: "Success", User });
        return res.json(User);
      })
      .catch((err) => {
        console.log({ status: "Error", err });
        return res.json({ status: "Error", err });
      });
  };


  export const getAllUser = async (req, res) => {
    User.find()
      .then((User) => {
        return res.json(User);
      })
      .catch((err) => {
        console.log({ status: "Error", err });
        return res.json({ status: "Error", err });
      });
  };
