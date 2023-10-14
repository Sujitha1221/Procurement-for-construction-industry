import Accountant from "../models/Accountant.mjs";

export const createAccountant = async (req, res) => {
  const { empId, accountantId, accountantEmail } = req.body;

  try {
    const newAccountant = new Accountant({
      empId,
      accountantId,
      accountantEmail,
    });

    const savedAccountant = await newAccountant.save();
    res.json(savedAccountant);
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const getAccountantByEmpId = async (req, res) => {
  const { empId } = req.params;

  try {
    const accountant = await Accountant.findOne({ empId });

    if (accountant) {
      res.json(accountant);
    } else {
      res
        .status(404)
        .json({ status: "Error", message: "Accountant not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
