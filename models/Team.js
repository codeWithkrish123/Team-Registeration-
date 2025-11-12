const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  personalEmail: { type: String, required: true, lowercase: true, trim: true },
  collegeEmail: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true,
    match: [/@akgec\.ac\.in$/]
  },
  gender: { 
    type: String, 
    required: true, 
    enum: ['Male', 'Female', 'Other'],
    trim: true 
  },
  branch: { 
    type: String, 
    required: true, 
    trim: true 
  },
  residenceAddress: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true }
  },
  studentNumber: { type: String, required: true, trim: true },
  unstopId: { type: String, required: true, trim: true },
  hackerRankUrl: { type: String, required: true, trim: true },
});

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true, trim: true },
  members: {
    type: [MemberSchema],
    validate: [arr => arr.length === 2, 'Exactly 2 members are required'],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Team', TeamSchema);
