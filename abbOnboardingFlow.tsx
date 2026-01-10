// abbOnboardingFlow.tsx
// Adaptive onboarding logic for the coloring experience with Abb (Abbstract/Abb/Abby) as your playful guide.
// Plug into any React/TypeScript app. All steps are conversational and positive, with fallback to default colors and playful age handling.

// -------------------------------
// Types
// -------------------------------

export type AbbState = {
  childName?: string;
  age?: number;
  favoriteColors?: string[];
  questionStep: number;
  ageAttempts: number;
  hasAcknowledgedCreativity: boolean;
};

const DEFAULT_COLORS = ['blue', 'green', 'yellow', 'pink', 'purple', 'orange'];

// -------------------------------
// Utility Functions
// -------------------------------

// Parse age intelligently from string (accept numbers, limits 1-120)
function parseAge(input: string): number | undefined {
  const match = input.match(/(\d{1,3})/);
  const parsed = match ? parseInt(match[1]) : undefined;
  if (parsed && parsed > 0 && parsed < 120) return parsed;
  return undefined;
}

// Naive color parsing: split by commas/ands, keep non-empty color words.
function parseColors(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/and/g, ',')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

// -------------------------------
// Main Conversation Function
// -------------------------------

/**
 * Main onboarding conversational handler.
 * @param userInput - User's latest reply
 * @param state - Current state object
 * @returns { abbMessage, nextState, onboardingDone, appliedColors }
 */
export function handleAbbOnboarding(
  userInput: string,
  state: AbbState
): {
  abbMessage: string;
  nextState: AbbState;
  onboardingDone: boolean;
  appliedColors: string[];
} {
  let { childName, age, favoriteColors, questionStep, ageAttempts, hasAcknowledgedCreativity } = state;
  let nextState = { ...state };
  let abbMessage = "";
  let onboardingDone = false;
  let appliedColors = (favoriteColors && favoriteColors.length) ? favoriteColors : [];

  switch (questionStep) {
    // 0. Name
    case 0: {
      const name = userInput && userInput.trim();
      if (name) {
        nextState.childName = name;
        abbMessage = `That's a great name, ${name}!`;
        nextState.questionStep = 1;
      } else {
        abbMessage = "Hello CREATIVE kid and fellow adventurer! I’m Abbstract, but you can call me Abb or Abby if you prefer. What should I call you?";
      }
      break;
    }
    // 1. Abb’s age joke
    case 1:
      abbMessage = "You know, I think I might be 100 years old... Do I look 100 years old to you?";
      nextState.questionStep = 2;
      break;
    // 2. Age
    case 2: {
      const asNum = parseAge(userInput);
      if (asNum) {
        nextState.age = asNum;
        abbMessage = `Wow, you're pretty creative for a ${asNum} year old!`;
        nextState.hasAcknowledgedCreativity = true;
        nextState.questionStep = 3;
      } else if ((userInput && userInput.toLowerCase().includes("no")) || !/\d/.test(userInput)) {
        nextState.ageAttempts = (ageAttempts ?? 0) + 1;
        if (nextState.ageAttempts < 2) {
          abbMessage = "Of course, you're not! Wait, how old are you?";
        } else {
          abbMessage = "Whatever your age, you seem super creative!";
          nextState.hasAcknowledgedCreativity = true;
          nextState.questionStep = 3;
        }
      } else {
        abbMessage = "How old are you?";
        nextState.ageAttempts = (ageAttempts ?? 0) + 1;
      }
      break;
    }
    // 3. Colors
    case 3: {
      const colors = parseColors(userInput);
      if (colors.length) {
        nextState.favoriteColors = colors;
        appliedColors = colors;
        abbMessage = `Ooo, ${colors.join(", ")}! I love those colors! Let me use them right now.`;
        nextState.questionStep = 4;
      } else if (ageAttempts === 0) {
        abbMessage = "Do you have any favorite colors?";
      } else {
        appliedColors = DEFAULT_COLORS;
        abbMessage = `I have some favorite colors too: ${DEFAULT_COLORS.join(', ')}! Let me show you how they look.`;
        nextState.favoriteColors = DEFAULT_COLORS;
        nextState.questionStep = 4;
      }
      break;
    }
    // 4. Done! Start creative session
    case 4:
    default: {
      abbMessage = [
        `${childName ? childName + ',' : ''} Abb is ready to be your creative guide!`,
        `Let's start coloring. If you need me, just say "Abb!" and I'll swoop in to help.`
      ].join(" ");
      onboardingDone = true;
      break;
    }
  }

  return { abbMessage, nextState, onboardingDone, appliedColors };
}

// -------------------------------
// Example: usage
// -------------------------------
//
// let state: AbbState = {questionStep: 0, ageAttempts: 0, hasAcknowledgedCreativity: false};
// const { abbMessage, nextState, onboardingDone, appliedColors } = handleAbbOnboarding(userInput, state);
// Show abbMessage to user, update state to nextState, transition to main creative app if onboardingDone.
//
