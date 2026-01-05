import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,   
  },
  ip: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ["LOGIN_SUCCESS", "LOGIN_FAIL", "SCAN", "UNKNOWN", "ADMIN_ACTION"],
  },
  username: {
    type: String,
    default: "unknown"
  },
  message: {
    type: String,
    default: ""
  },
  riskScore: {
    type: Number,
    default: 0   // AI kommer uppdatera senare
  },
  analysis: {
    type: String,
    default: ""
  }
});


const Log = mongoose.model("Log", LogSchema);

export default Log;
