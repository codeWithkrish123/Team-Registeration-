const Team = require('../models/Team');

// Helper function to handle validation errors
const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(e => ({ 
                field: e.path.join('.'), 
                message: e.msg 
            })),
        });
    }
    return null;
};

// Check if team name exists
const checkTeamName = async (req, res, next) => {
    try {
        const { teamName } = req.query;
        const exists = await Team.exists({ teamName: new RegExp(`^${teamName}$`, 'i') });
        res.json({ success: true, exists: !!exists });
    } catch (err) {
        next(err);
    }
};

// Check if member email exists
const checkMemberEmail = async (req, res, next) => {
    try {
        const { email } = req.query;
        const exists = await Team.exists({ 
            $or: [
                { 'members.0.collegeEmail': email },
                { 'members.1.collegeEmail': email }
            ] 
        });
        res.json({ success: true, exists: !!exists });
    } catch (err) {
        next(err);
    }
};

// Register a new team
const registerTeam = async (req, res, next) => {
    try {
        const { teamName, members } = req.body;
        
        // Check if team name already exists
        const teamExists = await Team.exists({ teamName: new RegExp(`^${teamName}$`, 'i') });
        if (teamExists) {
            return res.status(400).json({
                success: false,
                message: 'Team name already exists'
            });
        }

        // Check if any member email is already registered
        const emails = members.map(m => m.collegeEmail);
        const emailExists = await Team.exists({
            $or: [
                { 'members.0.collegeEmail': { $in: emails } },
                { 'members.1.collegeEmail': { $in: emails } }
            ]
        });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'One or more team members are already registered'
            });
        }

        // Create new team
        const team = new Team({ teamName, members });
        await team.save();

        res.status(201).json({
            success: true,
            message: 'Team registered successfully',
            team
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    checkTeamName,
    checkMemberEmail,
    registerTeam
};