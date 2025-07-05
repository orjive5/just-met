declare global {
  interface UserUnsafeMetadata {
    age: string;
    gender: string;
    relationshipStatus: string;
    location: {
      country: string;
      city: string;
    };
    onboardingCompleted?: boolean;
  }
}

export {};
