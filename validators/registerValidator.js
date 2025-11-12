const { body, query } = require('express-validator');

const hackerRankRegex = /^https?:\/\/(www\.)?hackerrank\.com\/profile\/[A-Za-z0-9_\-]+\/?$/i;

const memberValidation = (prefix) => [
  body(`${prefix}.fullName`)
    .trim()
    .notEmpty().withMessage('Full Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Full Name must be between 2 and 100 characters'),

  body(`${prefix}.personalEmail`)
    .trim()
    .notEmpty().withMessage('Personal Email is required')
    .isEmail().withMessage('Invalid Personal Email'),

  body(`${prefix}.collegeEmail`)
    .trim()
    .notEmpty().withMessage('College Email is required')
    .isEmail().withMessage('Invalid College Email')
    .matches(/@akgec\.ac\.in$/i).withMessage('College Email must be from @akgec.ac.in domain'),

  body(`${prefix}.studentNumber`)
    .trim()
    .notEmpty().withMessage('Student Number is required')
    .isAlphanumeric().withMessage('Student Number must be alphanumeric')
    .isLength({ min: 3, max: 50 }).withMessage('Invalid Student Number'),

  body(`${prefix}.unstopId`)
    .trim()
    .notEmpty().withMessage('Unstop ID is required')
    .isLength({ min: 2, max: 50 }).withMessage('Invalid Unstop ID'),

  body(`${prefix}.hackerRankUrl`)
    .trim()
    .notEmpty().withMessage('HackerRank Profile URL is required')
    .matches(hackerRankRegex).withMessage('Invalid HackerRank Profile URL'),
];

exports.registerValidation = [
  body('teamName')
    .trim()
    .notEmpty().withMessage('Team Name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Team Name must be between 3 and 100 characters'),
  body('members')
    .isArray({ min: 2, max: 2 })
    .withMessage('Exactly two team members are required'),
  ...memberValidation('members.0'),
  ...memberValidation('members.1'),
];

exports.checkTeamQuery = [
  query('teamName').trim().notEmpty().withMessage('teamName query param required'),
];

exports.checkMemberQuery = [
  query('email').trim().notEmpty().withMessage('email query param required').isEmail(),
];
