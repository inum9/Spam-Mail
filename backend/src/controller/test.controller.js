import { nanoid } from 'nanoid';
import Test from '../models/test.model.js';
import { testInboxes } from '../config/email.config.js';
import * as emailService from '../service/email.service.js';
import * as reportService from '../service/report.service.js';

export const createTest = async (req, res, next) => {
  try {
    const { userEmail } = req.body;

    // Generate unique test code
    const testCode = `TEST-${nanoid(10).toUpperCase()}`;

    // Create test document
    const test = await Test.create({
      testCode,
      userEmail,
      status: 'pending',
      results: testInboxes.map(inbox => ({
        provider: inbox.provider,
        email: inbox.email,
        received: false,
        folder: 'NOT_RECEIVED'
      }))
    });

    res.status(201).json({
      success: true,
      data: {
        testId: test._id,
        testCode: test.testCode,
        inboxes: testInboxes.map(inbox => inbox.email),
        instructions: `Send an email to all the above addresses with "${testCode}" in the subject line.`
      }
    });
  } catch (error) {
    next(error);
  }
};

export const startTestCheck = async (req, res, next) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }

    if (test.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Test is already being processed or completed'
      });
    }

    // Update status to processing
    test.status = 'processing';
    await test.save();

    // Start background processing
    processTestAsync(test);

    res.status(200).json({
      success: true,
      message: 'Test processing started. This may take up to 5 minutes.',
      data: {
        testId: test._id,
        status: test.status
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTestStatus = async (req, res, next) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        testId: test._id,
        testCode: test.testCode,
        status: test.status,
        results: test.results,
        deliverabilityScore: test.deliverabilityScore,
        reportUrl: test.reportUrl,
        startedAt: test.startedAt,
        completedAt: test.completedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTestHistory = async (req, res, next) => {
  try {
    const { userEmail } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = userEmail ? { userEmail } : {};

    const tests = await Test.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Test.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        tests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Background processing function
const processTestAsync = async (test) => {
  try {
    // Check each inbox for the email
    const checkPromises = testInboxes.map(inbox => 
      emailService.checkInbox(inbox, test.testCode)
    );

    const results = await Promise.allSettled(checkPromises);

    // Update test results
    test.results = results.map((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        return {
          provider: testInboxes[index].provider,
          email: testInboxes[index].email,
          received: result.value.received,
          folder: result.value.folder,
          receivedAt: result.value.receivedAt,
          messageId: result.value.messageId
        };
      }
      return test.results[index];
    });

    // Calculate deliverability score
    const receivedCount = test.results.filter(r => r.received).length;
    test.deliverabilityScore = Math.round((receivedCount / testInboxes.length) * 100);

    // Generate report URL
    test.reportUrl = `${process.env.FRONTEND_URL}/report/${test._id}`;

    test.status = 'completed';
    test.completedAt = new Date();

    await test.save();

    // Send email notification
    await reportService.sendReportEmail(test);

  } catch (error) {
    console.error('Error processing test:', error);
    test.status = 'failed';
    await test.save();
  }
};
