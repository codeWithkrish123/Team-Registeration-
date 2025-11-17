const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, 'Full name is required'],
    trim: true
  },
  collegeEmail: { 
    type: String, 
    required: [true, 'College email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[a-z]+[0-9]+@akgec\.ac\.in$/,
      'Email must be in format: letters followed by numbers @akgec.ac.in (e.g., krish2431224@akgec.ac.in)'
    ]
  },
  studentNumber: { 
    type: String, 
    required: [true, 'Student number is required'],
    trim: true,
    match: [/^[0-9]{3,15}$/, 'Student number must be 3-15 digits']
  },
  branch: { 
    type: String, 
    enum: [
      'CSE', 'CS', 'CSE (AI & ML)', 'CSE (AI)', 'CSE (DS)', 'CSIT', 'CSE (IOT)', 
      'IT', 'ECE', 'EN', 'ME', 'CIVIL', 'BT', 'BBA', 'BCA', 'B.Tech', 'MBA', 'MCA', 'Other'
    ],
    required: [true, 'Branch is required'],
    trim: true 
  },
  unstopId: { 
    type: String, 
    required: [true, 'Unstop ID is required'],
    trim: true,
    match: [/^[A-Za-z0-9_-]{3,50}$/, 'Unstop ID must be 3-50 characters (letters, numbers, _, -)']
  },
  hackerRankUrl: { 
    type: String, 
    required: [true, 'HackerRank URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        // Check if the URL contains 'hackerrank.com' anywhere in it
        return /hackerrank\.com/i.test(v);
      },
      message: 'Please enter a valid HackerRank profile URL (e.g., https://www.hackerrank.com/username)'
    }
  },
  gender: { 
    type: String, 
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other', 'Prefer not to say'],
      message: 'Please select a valid gender (Male, Female, Other, or Prefer not to say)'
    }
  }
}, { _id: false });

const TeamSchema = new mongoose.Schema({
  teamName: { 
    type: String, 
    required: [true, 'Team name is required'], 
    unique: true, 
    trim: true,
    minlength: [3, 'Team name must be at least 3 characters'],
    maxlength: [100, 'Team name cannot be longer than 100 characters']
  },
  members: {
    type: [MemberSchema],
    validate: {
      validator: function(arr) {
        return arr.length === 2;
      },
      message: 'Exactly 2 team members are required'
    },
    required: [true, 'Team members are required']
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Team', TeamSchema);