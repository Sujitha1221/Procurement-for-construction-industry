import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AccountantSchema = new Schema({
  empId: {
    type: String,
    required: true,
  },

  accountantId: {
    type: String,
    required: true,
  },

  accountantEmail: {
    type: String,
    required: true,
  },
});

const Accountant = mongoose.model("Accountant", AccountantSchema);

export default Accountant;
