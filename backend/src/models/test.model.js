import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    enum: ['gmail', 'outlook', 'yahoo', 'gmail2', 'outlook2']
  },
  email: {
    type: String,
    required: true
  },
  received: {
    type: Boolean,
    default: false
  },
  folder: {
    type: String,
    enum: ['INBOX', 'SPAM', 'PROMOTIONS', 'NOT_RECEIVED'],
    default: 'NOT_RECEIVED'
  },
  receivedAt: Date,
  messageId: String
}, { _id: false });

const testSchema = new mongoose.Schema({
  testCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  results: [testResultSchema],
  deliverabilityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  reportUrl: String,
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  expiresAt: {
    type: Date,
    default: () => Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}, {
  timestamps: true
});

// Index for efficient queries
testSchema.index({ createdAt: 1 });
testSchema.index({ userEmail: 1, createdAt: -1 });

export default mongoose.model('Test', testSchema);
