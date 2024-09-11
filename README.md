# EasyCart - E-Commerce Web Application

EasyCart is a full-fledged e-commerce web application built using modern web technologies like **React, Vite, Tailwind CSS, and Firebase** as the database. The platform offers a seamless shopping experience with features like product browsing, add to cart, order management, and an admin panel for managing products, orders, and users. It also integrates **Razorpay** for secure online payments.

## Features
### User Side:
- **Browse Products:** Users can explore products available on the platform.
- **Add to Cart:** Allows users to add products to the cart for checkout.
- **Place Orders:** Users can complete purchases and receive order confirmation.
- **Online Payment:** Integrated with Razorpay to facilitate secure online payments.

### Admin Panel:
- **Manage Products:** Admins can add, update, and delete products.
- **Order Management:** Admins can view and manage customer orders.
- **User Management:** Admins can manage registered users on the platform.

### Tech Stack
- **Frontend:** React (built with Vite)
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Firestore for database)
- **Payment Integration:** Razorpay API

## Installation

Follow these steps to set up Easy Cart locally:

1. Clone the repository:
```
git clone https://github.com/ravi300601/EasyCart.git
```

2. Navigate to the project directory:
```
cd EasyCart
```

3. Install dependencies:
```
pip install -r requirements.txt
```
4. Create a .env file in the root of your project and add your Firebase and Razorpay configuration:

```
VITE_FIREBASE_API_KEY=YOUR-FIREBASE-API-KEY
VITE_APP_ID=YOUR-APP-ID
VITE_SENDER_ID=YOUR-SENDER-ID
VITE_RAZORPAY_KEY=YOUR-RAZORPAY-KEY
VITE_RAZORPAY_SECRET_KEY=YOUR-RAZORPAY-SECRET-KEY
```
5. Start the development server:

```
npm run dev
```
6. Open your browser and go to http://localhost:5173 or given by server to see the application.

## Firebase Setup
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Firestore Database for real-time data storage.
- Enable Firebase Authentication for user login and registration.
- Set up Firebase Cloud Functions for backend processing (if required).

## Razorpay Integration
- Create an account on [Razorpay](https://dashboard.razorpay.com/app/dashboard).
- Generate your Razorpay API Key from the Razorpay dashboard.
- Add your Razorpay key to the .env file as shown above.

## Folder Structure
```
EasyCart/
│
├── public/                # Static files
│
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Application pages (e.g., Home, Cart, Admin)
│   ├── firebase/          # Firebase configuration and helpers
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context for global state
│   ├── App.js             # Main App component
│   └── index.js           # Entry point of the application
│
├── .env                   # Environment variables
├── requirements.txt       # Project dependencies
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
