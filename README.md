# CCEE Quiz Website

A premium, local quiz application designed to help you master your syllabus. Built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Features

-   **Subject Dashboard**: View all your courses with progress tracking.
-   **Interactive Quizzes**: Chapter-wise quizzes with timer and immediate feedback.
-   **Smart Feedback**: Explanations provided for every question to help you learn.
-   **Premium UI**: "Cosmic Glass" aesthetic with smooth animations.
-   **Local Progress**: Your scores and completion status are saved automatically to your browser.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

## 🏃‍♂️ How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

## 📂 Project Structure

-   `app/`: Main application routes (Subjects, Quiz pages).
-   `components/ui/`: Reusable UI components (Card, Button).
-   `lib/`: Utility functions and static data.
-   `public/data/`: JSON files containing the quiz questions.

## 📝 Adding New Quizzes

To add more questions, create a JSON file in `public/data/[subject_id]/[chapter_id]/questions.json`.
The structure should be:
```json
[
  {
    "id": "q1",
    "text": "Your Question Here?",
    "options": [
      { "id": "a", "text": "Option 1" },
      { "id": "b", "text": "Option 2" }
    ],
    "correctOptionId": "b",
    "hint": "A helpful hint",
    "explanation": "Why this answer is correct."
  }
]
```
