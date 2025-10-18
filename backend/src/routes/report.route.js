import express from 'express';
import Test from '../models/test.model.js';

const router = express.Router();

// Get report by ID
router.get('/:testId', async (req, res, next) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        testCode: test.testCode,
        userEmail: test.userEmail,
        status: test.status,
        results: test.results,
        deliverabilityScore: test.deliverabilityScore,
        startedAt: test.startedAt,
        completedAt: test.completedAt
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
