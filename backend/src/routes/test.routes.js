import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validation.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.middleware.js';
import * as testController from '../controller/test.controller.js';

const router = express.Router();

// Create new test
router.post(
  '/create',
  rateLimiter,
  [
    body('userEmail')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required')
  ],
  validate,
  testController.createTest
);

// Start test check
router.post('/:testId/check', testController.startTestCheck);

// Get test status
router.get('/:testId', testController.getTestStatus);

// Get test history
router.get('/', testController.getTestHistory);

export default router;
