// Client-side sentiment analysis using keyword matching
export type SentimentType = 'positive' | 'neutral' | 'negative';
export type PriorityLevel = 'high' | 'medium' | 'low';

interface SentimentResult {
  sentiment: SentimentType;
  score: number;
  priority: PriorityLevel;
  suggestedResponses: string[];
}

const positiveKeywords = [
  'love', 'amazing', 'great', 'excellent', 'awesome', 'fantastic', 'perfect',
  'best', 'wonderful', 'brilliant', 'outstanding', 'superb', 'thank', 'thanks',
  'appreciate', 'helpful', 'good', 'nice', 'happy', 'pleased'
];

const negativeKeywords = [
  'hate', 'terrible', 'awful', 'worst', 'horrible', 'bad', 'poor', 'disappointed',
  'disappointing', 'angry', 'frustrated', 'issue', 'problem', 'broken', 'bug',
  'error', 'fail', 'failed', 'complaint', 'unhappy', 'refund', 'cancel'
];

const urgentKeywords = [
  'urgent', 'asap', 'immediately', 'emergency', 'critical', 'serious', 'major',
  'broken', 'not working', 'can\'t', 'cannot', 'help', 'stuck'
];

export function analyzeSentiment(text: string): SentimentResult {
  const lowerText = text.toLowerCase();
  
  let positiveScore = 0;
  let negativeScore = 0;
  let urgencyScore = 0;

  positiveKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) positiveScore++;
  });

  negativeKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) negativeScore++;
  });

  urgentKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) urgencyScore++;
  });

  let sentiment: SentimentType;
  let score: number;

  if (positiveScore > negativeScore) {
    sentiment = 'positive';
    score = Math.min(100, 50 + (positiveScore * 10));
  } else if (negativeScore > positiveScore) {
    sentiment = 'negative';
    score = Math.max(0, 50 - (negativeScore * 10));
  } else {
    sentiment = 'neutral';
    score = 50;
  }

  const priority: PriorityLevel = 
    urgencyScore >= 2 || negativeScore >= 3 ? 'high' :
    negativeScore >= 1 || urgencyScore >= 1 ? 'medium' : 'low';

  const suggestedResponses = generateResponses(sentiment, lowerText);

  return { sentiment, score, priority, suggestedResponses };
}

function generateResponses(sentiment: SentimentType, text: string): string[] {
  const hasQuestion = text.includes('?') || text.includes('how') || text.includes('what') || text.includes('when');
  
  if (sentiment === 'positive') {
    return [
      "Thank you so much for your kind words! We're thrilled to hear you're enjoying our service. 😊",
      "We really appreciate your positive feedback! It means a lot to our team.",
      "Thanks for sharing! We're glad we could help. Let us know if you need anything else!"
    ];
  } else if (sentiment === 'negative') {
    if (hasQuestion) {
      return [
        "We're sorry to hear about this issue. Let me help you resolve this right away. Could you provide more details?",
        "I apologize for the inconvenience. Our team is here to help. Can you share more information so we can assist you better?",
        "We take your concerns seriously. Let's work together to fix this. What specific issue are you experiencing?"
      ];
    }
    return [
      "We sincerely apologize for your experience. We'd like to make this right. Please DM us with more details.",
      "We're sorry this happened. Your feedback is important to us. Our team will look into this immediately.",
      "Thank you for bringing this to our attention. We're investigating and will reach out shortly with a solution."
    ];
  } else {
    if (hasQuestion) {
      return [
        "Thanks for reaching out! I'd be happy to help answer your question.",
        "Great question! Let me provide you with the information you need.",
        "Thanks for asking! Here's what you need to know..."
      ];
    }
    return [
      "Thanks for your comment! We appreciate you engaging with our content.",
      "We hear you! Thanks for sharing your thoughts with us.",
      "Thank you for your feedback! It helps us improve."
    ];
  }
}
