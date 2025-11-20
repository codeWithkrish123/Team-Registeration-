const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const { 
    validateRegistration, 
    validateTeamQuery, 
    validateMemberQuery 
} = require('../validators/registerValidator');

// Routes
// check health ping
 
router.get('/check/team', validateTeamQuery, registerController.checkTeamName);
router.get('/check/member', validateMemberQuery, registerController.checkMemberEmail);
router.post('/register', validateRegistration, registerController.registerTeam);

// New team registration endpoint with CSRF protection
router.post('/team-register', validateRegistration, registerController.registerTeam);

module.exports = router;