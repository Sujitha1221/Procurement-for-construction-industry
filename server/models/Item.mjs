import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    unique:true
  },
  unitPrice: {
    type: Number,
    required: true,
  }
});

const Item = mongoose.model(
  "Item",
  ItemSchema
);

export default Item;
