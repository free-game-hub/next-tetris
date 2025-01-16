export interface GameScheme{
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    h1: string;
    p: string;
  };
  gameFeatures: {
    title: string;
    features: string[];
  };
  gameplayInstructions: {
    title: string;
    instructions: string[];
  };
  gameScreenshots: {
    title: string;
  };
  playerReviews: {
    title: string;
    submitReviewLabel: string;
    nameLabel: string;
    reviewLabel: string;
    submitButtonLabel: string;
    reviews: Array<{
      content: string;
      author: string;
      rating?: number;
    }>;
  };
  faq: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  slug: string;
  imageUrl: string;
  iframeSrc?: string;
}

