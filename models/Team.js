const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
 // personalEmail: { type: String, required: true, lowercase: true, trim: true },
  collegeEmail: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true,
    match: [/@akgec\.ac\.in$/]
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female'],
    required: true, 
    trim: true 
  },
  branch: { 
    type: String, 
    // add validation for branch only software side branches
       enum: ['CSE', 'ECE', 'EEE', 'CSE AIML', 'CSDS', 'CS', 'CS HINDI'],
    required: true, 
    trim: true 
  },
  //remove residenceAddress
//   residenceAddress: {
//     street: { type: String, required: true, trim: true },
//     city: { type: String, required: true, trim: true },
//     state: { type: String, required: true, trim: true },
//     pincode: { type: String, required: true, trim: true },
//     country: { type: String, required: true, trim: true }
//   },
  studentNumber: { type: String, required: true, trim: true },
  unstopId: { type: String, required: true, trim: true },
  hackerRankUrl: { type: String, required: true, trim: true },
});

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true, trim: true },
  members: {
    type: [MemberSchema],
    validate: [arr => arr.length === 2, 'Exactly 2 members are required'],
  }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
