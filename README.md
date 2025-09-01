# Little Lemon Restaurant Booking Website

A modern, accessible React web application for table reservations at Little Lemon Mediterranean Restaurant in Chicago.

## 🌟 Features

### Core Functionality
- **Table Reservation System**: Complete booking form with date, time, guest count, and contact details
- **Form Validation**: Client-side validation for all required fields with real-time feedback
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and semantic HTML

### UX/UI Implementation
- **Brand-consistent Design**: Little Lemon color scheme (Green #495E57, Yellow #F4CE14)
- **Intuitive Navigation**: Clear call-to-action buttons and smooth user flow
- **Visual Feedback**: Loading states, error messages, and success notifications
- **Professional Layout**: Clean, modern design with proper typography

## 🎯 Project Requirements Compliance

### ✅ UX/UI Implementation
- Follows design guidelines with consistent branding
- Form and layout match expected user experience standards
- Intuitive navigation and clear visual hierarchy

### ✅ Accessibility
- Applied appropriate accessibility tags (`aria-label`, `role`, etc.)
- Semantic HTML elements (`<form>`, `<label>`, `<button>`, `<header>`, `<footer>`, `<main>`)
- Screen reader compatible with proper form associations
- Keyboard navigation support
- High contrast mode support
- Focus management and indicators

### ✅ Unit Testing
- Comprehensive test suite using Jest + React Testing Library
- Tests for booking form validation and functionality
- Component integration tests
- Accessibility testing
- User interaction testing

### ✅ Booking Form Functionality & Validation
- **Date Selection**: Future dates only with date picker
- **Time Selection**: Available time slots dropdown
- **Guest Count**: Number input with min/max validation (1-10 guests)
- **Contact Details**: Name, email, and phone with format validation
- **Special Requests**: Optional textarea for dietary restrictions/preferences
- **Form Validation**: Required fields, email format, phone format, date validation

### ✅ Responsiveness & Semantics
- Mobile-first responsive design
- Tablet and desktop optimizations
- Proper semantic HTML structure
- Screen reader accessible landmarks

### ✅ Code Quality
- Well-organized React components
- Clean, maintainable code structure
- Comprehensive comments and documentation
- Separation of concerns (components, styles, tests)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.js              # Navigation header with logo
│   ├── Header.css
│   ├── Hero.js                # Hero section with CTA
│   ├── Hero.css
│   ├── BookingForm.js         # Main reservation form
│   ├── BookingForm.css
│   ├── Footer.js              # Footer with contact info
│   └── Footer.css
├── tests/
│   ├── App.test.js            # Integration tests
│   ├── BookingForm.test.js    # Form validation tests
│   ├── Header.test.js         # Header component tests
│   ├── Hero.test.js           # Hero component tests
│   └── Footer.test.js         # Footer component tests
├── assets/
│   └── [image files]          # Restaurant images and logo
├── App.js                     # Main application component
├── App.css                    # Global styles and utilities
└── index.js                   # Application entry point
```

## 🧪 Testing

The application includes comprehensive unit tests covering:

### Form Validation Tests
- Required field validation
- Email format validation
- Phone number format validation
- Date validation (future dates only)
- Guest count range validation (1-10)
- Form submission with valid data

### Component Tests
- Header navigation and accessibility
- Hero section content and CTA functionality
- Footer contact information and links
- Form field rendering and interaction

### Integration Tests
- Complete user journey from form fill to submission
- Component interaction and data flow
- Accessibility compliance across the application

### Running Tests
```bash
npm test                    # Run all tests
npm test -- --coverage     # Run tests with coverage report
npm test -- --watch        # Run tests in watch mode
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd name-of-the-app

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## 🎨 Design System

### Colors
- **Primary Green**: #495E57 (Headers, navigation)
- **Primary Yellow**: #F4CE14 (Accents, buttons, highlights)
- **Secondary Orange**: #EE9972 (Future use)
- **Secondary Beige**: #FBDABB (Future use)
- **Light Gray**: #EDEFEE (Text, backgrounds)
- **Dark Gray**: #333333 (Body text)

### Typography
- **Headings**: Georgia, serif (Brand consistency)
- **Body Text**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Weights**: 400 (normal), 500 (medium), 600 (semi-bold), bold

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of landmarks and heading hierarchy
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Error Handling**: Clear error messages with proper associations
- **Form Accessibility**: Proper labeling and validation feedback

## 🔧 Form Validation Rules

### Required Fields
- Date (must be today or future)
- Time (from available slots)
- Number of guests (1-10)
- Full name (minimum 2 characters)
- Email address (valid email format)
- Phone number (valid phone format)

### Optional Fields
- Occasion (dropdown selection)
- Special requests (free text)

---

**Little Lemon Restaurant** - Authentic Mediterranean cuisine in the heart of Chicago.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
