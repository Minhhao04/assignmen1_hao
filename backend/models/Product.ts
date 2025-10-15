import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image?: string;
}

const ProductSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: [true, "Product name is required"] },
  description: { type: String, required: [true, "Product description is required"] },
  price: { type: Number, required: [true, "Product price is required"] },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model<IProduct>("Product", ProductSchema);
