const { validationResult } = require('express-validator');
const Team = require('../models/Team');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(e => ({ field: e.param, message: e.msg })),
    });
  }
  return null;
}

exports.checkTeamName = async (req, res, next) => {
  const validation = handleValidation(req, res);
  if (validation) return;

  try {
    const { teamName } = req.query;
    const exists = await Team.exists({ teamName: new RegExp(`^${teamName}$`, 'i') });
    res.json({ success: true, exists: !!exists });
  } catch (err) {
    next(err);
  }
};

exports.checkMemberEmail = async (req, res, next) => {
  const validation = handleValidation(req, res);
  if (validation) return;

  try {
    const { email } = req.query;
    const exists = await Team.exists({
      $or: [
        { 'members.personalEmail': email.toLowerCase() },
        { 'members.collegeEmail': email.toLowerCase() },
      ],
    });
    res.json({ success: true, exists: !!exists });
  } catch (err) {
    next(err);
  }
};

exports.registerTeam = async (req, res, next) => {
  const validation = handleValidation(req, res);
  if (validation) return;

  try {
    const { teamName, members } = req.body;

    // Normalize
    members.forEach(m => {
      m.personalEmail = m.personalEmail.toLowerCase();
      m.collegeEmail = m.collegeEmail.toLowerCase();
    });

    // Check team name
    const existingTeam = await Team.findOne({ teamName: new RegExp(`^${teamName}$`, 'i') });
    if (existingTeam)
      return res.status(409).json({ success: false, error: 'Team name already taken' });

    // Check duplicate member emails
    for (const m of members) {
      const used = await Team.findOne({
        $or: [
          { 'members.personalEmail': m.personalEmail },
          { 'members.collegeEmail': m.collegeEmail },
        ],
      });
      if (used) {
        return res.status(409).json({
          success: false,
          error: `Email ${m.personalEmail} or ${m.collegeEmail} already registered`,
        });
      }
    }

    const team = await Team.create({ teamName, members });
    res.status(201).json({ success: true, teamId: team._id });
  } catch (err) {
    next(err);
  }
};
