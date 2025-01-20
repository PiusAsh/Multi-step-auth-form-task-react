# SbscMultiStepAuthFormTask (React)

A multi-step authentication form built with React. This project provides a user-friendly form with validation, responsive design, and smooth animations.

## Setup & Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps to Setup Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/PiusAsh/Multi-step-auth-form-task-react.git


## Approach and Structure
Single Component Approach: The entire multi-step authentication form is handled within a single functional component to simplify navigation and state management.

State Management: React's useState and useEffect hooks are used to manage form data and validate each step dynamically.

Form Validation: Each step includes validation logic using React's built-in form validation and dynamic error messages.

Styling and Responsiveness: The project uses Bootstrap for layout and responsive design, along with custom CSS for smooth transitions and animations.

Navigation: The form progresses through steps using buttons for user interaction. State is updated based on user progress, and data is shared across steps using useState and props.