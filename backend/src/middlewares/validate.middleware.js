import { validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse.util.js';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
        return next(new ErrorResponse(message, 400));
    }
    next();
};

export default validate;
