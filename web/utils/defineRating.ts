const defineRating = (upvote: number, downvote: number) => {
  if (upvote === 0 && downvote === 0) {
    return "No Reviews";
  } else if (downvote === 0) {
    if (upvote > 1000) {
      return "Very Positive";
    } else {
      return "Excellent";
    }
  } else if (upvote === 0) {
    return "Not Recommended";
  } else if (upvote + downvote > 100 && upvote / (upvote + downvote) > 0.7) {
    return "Very Positive";
  } else if (upvote + downvote > 100 && upvote / (upvote + downvote) < 0.3) {
    return "Very Negative";
  } else if (upvote + downvote > 100 && upvote / (upvote + downvote) > 0.3) {
    return "Controversial";
  } else if (upvote + downvote < 100 && upvote / (upvote + downvote) > 0.7) {
    return "Positive";
  } else if (upvote + downvote < 100 && upvote / (upvote + downvote) < 0.3) {
    return "Negative";
  } else if (upvote + downvote < 100 && upvote / (upvote + downvote) > 0.3) {
    return "Mixed";
  } else {
    return "Not defined";
  }
};

export default defineRating;
