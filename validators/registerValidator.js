const Joi = require('joi');

const hackerRankRegex = /^https?:\/\/(www\.)?hackerrank\.com\/profile\/[A-Za-z0-9_\-]+\/?$/i;

const branchEnum = [
    'CSE', 'CS', 'CSE (AI & ML)', 'CSE (AI)', 'CSE (DS)', 'CSIT', 'CSE (IOT)', 
    'IT', 'ECE', 'EN', 'ME', 'CIVIL', 'BT', 'BBA', 'BCA', 'B.Tech', 'MBA', 'MCA', 'Other'
];

const genderEnum = ['Male', 'Female', 'Other', 'Prefer not to say'];

const memberSchema = Joi.object({
   fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z\s'-]+$/)  // Allows letters, spaces, hyphens, and apostrophes
    .required()
    .messages({
        'string.empty': 'Full Name is required',
        'string.min': 'Full Name must be at least {#limit} characters',
        'string.max': 'Full Name cannot be longer than {#limit} characters',
        'string.pattern.base': 'Full Name can only contain letters, spaces, hyphens, and apostrophes',
        'any.required': 'Full Name is required'
    }),

   collegeEmail: Joi.string()
    .trim()
    .email({ tlds: false })  // Basic email format validation
    .pattern(/^[a-z]+[0-9]*@akgec\.ac\.in$/i)  // Specific domain validation
    .required()
    .messages({
        'string.empty': 'College Email is required',
        'string.email': 'Please enter a valid email address',
        'string.pattern.base': 'Email must be in format: letters followed by numbers @akgec.ac.in (e.g., krish2431224@akgec.ac.in)',
        'any.required': 'College Email is required'
    }),

    studentNumber: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .min(3)
        .max(15)
        .required()
        .messages({
            'string.empty': 'Student Number is required',
            'string.pattern.base': 'Student Number must contain only numbers (e.g., 2431224)',
            'string.min': 'Student Number must be at least 3 digits',
            'string.max': 'Student Number cannot be longer than 15 digits',
            'any.required': 'Student Number is required'
        }),
      branch: Joi.string()
        .trim()
        .valid(...branchEnum)
        .required()
        .messages({
            'string.empty': 'Branch is required',
            'any.only': `Branch must be one of: ${branchEnum.join(', ')}`,
            'any.required': 'Branch is required'
        }),
    unstopId: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .pattern(/^[A-Za-z0-9_-]+$/)  // Alphanumeric with underscores and hyphens
        .required()
        .messages({
            'string.empty': 'Unstop ID is required',
            'string.min': 'Unstop ID must be at least {#limit} characters',
            'string.max': 'Unstop ID cannot be longer than {#limit} characters',
            'string.pattern.base': 'Unstop ID can only contain letters, numbers, underscores and hyphens',
            'any.required': 'Unstop ID is required'
        }),

    hackerRankUrl: Joi.string()
        .trim()
        .pattern(hackerRankRegex)
        .required()
        .messages({
            'string.empty': 'HackerRank Profile URL is required',
            'string.pattern.base': 'Invalid HackerRank Profile URL',
            'any.required': 'HackerRank Profile URL is required'
        }),
        
    gender: Joi.string()
        .valid(...genderEnum)
        .required()
        .messages({
            'string.empty': 'Gender is required',
            'any.only': `Gender must be one of: ${genderEnum.join(', ')}`,
            'any.required': 'Gender is required'
        })
});

const registerSchema = Joi.object({
    teamName: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .pattern(/^[A-Za-z0-9\s-]+$/)  // Alphanumeric with spaces and hyphens
        .required()
        .messages({
            'string.empty': 'Team Name is required',
            'string.min': 'Team Name must be at least {#limit} characters',
            'string.max': 'Team Name cannot be longer than {#limit} characters',
            'string.pattern.base': 'Team Name can only contain letters, numbers, spaces, and hyphens',
            'any.required': 'Team Name is required'
        }),
    members: Joi.array()
        .length(2)
        .items(memberSchema)
        .required()
        .messages({
            'array.base': 'Members must be an array',
            'array.length': 'Exactly two team members are required',
            'any.required': 'Members are required'
        })
});

const checkTeamQuerySchema = Joi.object({
    teamName: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'teamName query parameter is required',
            'any.required': 'teamName query parameter is required'
        })
});

const checkMemberQuerySchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'email query parameter is required',
            'string.email': 'Invalid email format',
            'any.required': 'email query parameter is required'
        })
});

// Validation middleware functions
exports.validateRegistration = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({ errors });
    }
    next();
};

exports.validateTeamQuery = (req, res, next) => {
    const { error } = checkTeamQuerySchema.validate(req.query, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({ errors });
    }
    next();
};

exports.validateMemberQuery = (req, res, next) => {
    const { error } = checkMemberQuerySchema.validate(req.query, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({ errors });
    }
    next();
};