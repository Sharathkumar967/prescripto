# Prescripto 🏥

A comprehensive and modern Doctor Appointment Booking System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). 

This platform seamlessly connects patients with healthcare professionals, offering dedicated portals for Patients, Doctors, and Administrators.

## 🌟 Key Features

### 👤 Patient Portal
- Browse doctors by specialty and availability.
- Book, manage, and cancel appointments.
- Secure payment integration via Razorpay.
- User authentication and profile management.
- Provide reviews for doctors.

### 👨‍⚕️ Doctor Portal
- Manage availability and working hours.
- View upcoming appointments and patient details.
- Update consultation status (e.g., Completed, Cancelled).
- Track earnings and reviews.

### 🛡️ Admin Portal
- Comprehensive dashboard for platform overview.
- Manage doctors (add, verify, update, or remove).
- Oversee all appointments and user activity.
- Platform analytics and reporting.

## 🛠️ Tech Stack

- **Frontend & Admin:** React.js, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Media Storage:** Cloudinary
- **Payment Gateway:** Razorpay

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd prescripto
   ```

2. **Install dependencies:**
   This project uses npm workspaces. Run the following command in the root directory to install dependencies for all workspaces (frontend, backend, and admin):
   ```bash
   npm install
   ```

### Environment Variables

You will need to set up environment variables for the frontend, backend, and admin portals. Create `.env` files in their respective directories based on the following templates.

**1. `backend/.env`**
```env
MONGODB_URI="your_mongodb_connection_string"
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"
ADMIN_EMAIL="admin@prescripto.com"
ADMIN_PASSWORD="qwerty123"
JWT_SECRET="your_jwt_secret"
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
CURRENCY="INR"
```

**2. `frontend/.env`**
```env
VITE_BACKEND_URL='http://localhost:4000'
VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"
```

**3. `admin/.env`**
```env
VITE_BACKEND_URL='http://localhost:4000'
```

### Running the Application Locally

Start the entire application (frontend, backend, and admin) concurrently with a single command from the root directory:

```bash
npm run dev
```

Alternatively, you can run them individually:
- **Frontend:** `npm run dev:frontend`
- **Admin:** `npm run dev:admin`
- **Backend:** `npm run dev:backend`

---

## 🔑 Default Credentials (for Reviewers)

If you are running this locally for testing or review, you can use the default administrator credentials defined in your backend `.env` file to log into the Admin portal:
- **Email:** `admin@prescripto.com`
- **Password:** `qwerty123`

---

*This project was developed to showcase full-stack development skills using modern web technologies.*
