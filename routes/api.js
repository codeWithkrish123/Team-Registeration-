const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/registerController');
const { registerValidation, checkTeamQuery, checkMemberQuery } = require('../validators/registerValidator');

router.get('/check/team', checkTeamQuery, ctrl.checkTeamName);
router.get('/check/member', checkMemberQuery, ctrl.checkMemberEmail);
router.post('/register', registerValidation, ctrl.registerTeam);

module.exports = router;
