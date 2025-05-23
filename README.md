# WorkHub

WorkHub is a modern freelance marketplace web application inspired by platforms like Fiverr. It enables users to register as buyers or sellers, create and manage gigs, place orders, exchange messages, and collaborate efficiently.
It has a timed deadline counter that is used to show how much time is left for a seller to deliver an order. The counter typically updates in real-time (counting down seconds, minutes, hours, or days) and helps both buyers and sellers track progress and meet deadlines efficiently.
---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Key Pages & Components](#key-pages--components)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Register and login as buyer or seller.
- **Gig Management:** Sellers can create, edit, and delete gigs with images, features, and pricing.
- **Order System:** Buyers can order gigs and track their orders.
- **Messaging:** Real-time messaging between buyers and sellers.
- **Reviews:** Buyers can leave reviews for completed gigs.
- **Responsive Design:** Fully responsive UI for desktop and mobile.
- **Category Browsing:** Explore gigs by categories like Design, Web, Animation, Music, etc.
- **Profile Management:** Users can update their profile and seller details.

---

## Screenshots

_Add screenshots here to showcase the UI and main features._

---

## Tech Stack

- **Frontend:** React, React Router, @tanstack/react-query, SCSS, Context API
- **Backend:** Node.js, Express.js, MongoDB (not included in this repo)
- **Other:** Axios, Cloudinary (for image uploads), Moment.js

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/           # Main app pages (Home, Gigs, Orders, etc.)
│   ├── reducers/        # Reducers for complex state (e.g., gigReducer)
│   ├── utils/           # Utility functions (API requests, uploads)
│   ├── App.jsx          # Main app and routing
│   └── main.jsx         # Entry point
├── package.json
└── ...
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Iamfavur/WorkHub.git
   cd WorkHub/client
   ```

2. **Install frontend dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the `client` directory (see [Environment Variables](#environment-variables)).

4. **Start the frontend:**
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

5. **Start the backend:**  
   _Backend code is not included in this repo. Set up the server separately and ensure the API URL matches your `.env`._

---

## Environment Variables

Create a `.env` file in the `client` directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Available Scripts

In the `client` directory, you can run:

- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the app for production.
- `npm test` — Runs tests (if available).

---

## Key Pages & Components

### Pages

- **Home:** Landing page with featured categories and gig highlights.  
  _File: `src/pages/home/Home.jsx`_

- **Register:** User registration form for buyers and sellers, including profile image upload.  
  _File: `src/pages/register/Register.jsx`_

- **Add:** Sellers can create new gigs with images, features, and pricing.  
  _File: `src/pages/add/Add.jsx`_

- **Gig:** Gig details, purchase, and review section.  
  _File: `src/pages/gig/Gig.jsx`_

- **Messages:** List of conversations for the logged-in user.  
  _File: `src/pages/messages/Messages.jsx`_

- **Message:** Chat interface for a specific conversation.  
  _File: `src/pages/message/Message.jsx`_

- **Orders:** View and manage orders.  
  _File: `src/pages/orders/Orders.jsx`_

- **MyGigs:** Sellers can view and manage their gigs.  
  _File: `src/pages/myGigs/MyGigs.jsx`_

- **Pay & Success:** Payment and order confirmation flows.  
  _Files: `src/pages/pay/Pay.jsx`, `src/pages/success/Success.jsx`_

### Components

- **Navbar:** Top navigation bar.  
  _File: `src/components/navbar/Navbar.jsx`_

- **Footer:** Displays categories, about, and support links.  
  _File: `src/components/footer/Footer.jsx`_

- **Reviews:** Gig reviews section.  
  _File: `src/components/reviews/Reviews.jsx`_

---

## Example Usage

- **Register:** Create an account as a buyer or seller.
- **Create Gig:** Sellers can add new gigs with images, features, and pricing.
- **Order:** Buyers can browse gigs and place orders.
- **Message:** Communicate with other users about orders.
- **Review:** Leave feedback after order completion.

---

## Contributing

Contributions are welcome!  
To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

**Inspired by Lama Dev Season 3.**