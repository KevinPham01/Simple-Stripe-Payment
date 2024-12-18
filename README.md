# Stripe Checkout API with Angular.js

This project integrates Stripe Checkout with an Angular.js frontend and a Node.js backend, allowing users to securely complete purchases via Stripe. It includes functionality for displaying product details, initiating checkout, and handling success or cancellation scenarios.

## Features

- Stripe Checkout integration using Stripe API.
- Frontend built with Angular.js for interactive user experience.
- Backend implemented with Node.js and Express.
- Secure use of environment variables to manage sensitive keys.
- Success and cancellation handling with dedicated routes.
- Webhook support to listen for Stripe events.

## Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later recommended)
- [NPM](https://www.npmjs.com/) (Node Package Manager)
- A Stripe account for API keys

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the required packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and include the following variables:

```env
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET_KEY=your-stripe-webhook-secret-key
BASE_URL=http://localhost:3000
```

Replace the placeholders with your actual Stripe keys and base URL.

### 4. Start the Application

Start the server with live reload using Nodemon:

```bash
npx nodemon
```

Alternatively, you can use:

```bash
npm start
```

### 5. Access the Application

Navigate to the application in your web browser:

```
http://localhost:3000
```

## Project Structure

- **Frontend**:
  - `Stripe.ejs`: Angular.js-powered frontend for displaying products and initiating the checkout process.
  - `success.ejs`: Angular.js-powered success page displaying a confirmation message after payment.
- **Backend**:
  - `server.js`: Node.js server handling routes, checkout sessions, and webhooks.
  - Webhook route for handling Stripe events.
- **Assets**:
  - Static files served under the `/assets` path.
- **Templates**:
  - Success and cancel pages rendered with EJS.

## Key Functionalities

### 1. Checkout Flow

- The `Stripe.ejs` file presents a product card with a price and a checkout button.
- Clicking the checkout button triggers the `checkout()` function, which redirects to the backend route `/commission` to initiate the Stripe Checkout session.

### 2. Stripe Checkout Session

- The `/commission` route creates a checkout session using the Stripe API.
- On successful creation, the user is redirected to Stripe's hosted checkout page.

### 3. Success and Cancellation Handling

- On success, users are redirected to the `/success` route, where they can view a confirmation message rendered by `success.ejs`.
- If the checkout is canceled, users are redirected back to the homepage.

### 4. Webhooks

- Stripe webhooks are handled via the `/webhook` route to listen for payment events, such as `payment_intent.succeeded` or `checkout.session.completed`.
- Events are logged for verification and debugging.

## Scripts

- `npm install`: Installs project dependencies.
- `npx nodemon`: Starts the server with live reload.
- `npm start`: Starts the server normally.

## Built With

- [Angular.js](https://angularjs.org/) - Frontend framework.
- [Stripe API](https://stripe.com/docs/api) - Payment processing API.
- [Node.js](https://nodejs.org/) - Backend runtime.
- [Express.js](https://expressjs.com/) - Web framework.
- [Nodemon](https://nodemon.io/) - Development utility for auto-reloading the server.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Stripe Documentation](https://stripe.com/docs) for their excellent API guides.
- [Angular.js Documentation](https://docs.angularjs.org/) for frontend support.
