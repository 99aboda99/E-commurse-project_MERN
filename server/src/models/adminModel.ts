import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "owner";
}

const AdminSchema = new Schema<IAdmin>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "owner"] },
});

const adminModel = mongoose.model<IAdmin>("Admin", AdminSchema);

export default adminModel;