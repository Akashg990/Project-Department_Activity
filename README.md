# Department Activity Tracker

A full-stack web application developed to streamline the management of departmental activities, faculty approvals, student engagement, and report generation within an academic institution.

The system enables administrators and faculty members to manage events efficiently while providing students with access to upcoming, ongoing, and completed activities through an intuitive dashboard.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Role-Based Access Control (RBAC)
* Admin, Faculty, and Student roles
* JWT Authentication
* Faculty Approval Workflow
* Email OTP Verification
* Forgot Password & Reset Password functionality
* Protected Routes

---

### 📅 Activity Management

* Create Activities
* Edit Activities
* Delete Activities
* View Activity Details
* Upload Multiple Activity Images
* Cloudinary Image Storage
* Google Drive Integration for Activity Resources
* Category-Based Activities
* Academic Year Filtering

---

### 🖼️ Image Management

* Upload up to 4 images per activity
* Preview uploaded images before submission
* Add new images while editing activities
* Remove existing images
* Automatic Cloudinary image deletion when removed from platform
* Activity Gallery View

---

### 📊 Dashboard Analytics

#### Admin & Faculty Dashboard

* Total Activities
* Total Participants
* Total Categories
* Recent Activities Overview
* Academic Year Filtering

#### Student Dashboard

* Upcoming Activities
* Ongoing Activities
* Completed Activities
* Activity Status Tracking

---

### 📈 Reports & Analytics

* Activity Statistics
* Category-wise Activity Distribution
* Monthly Activity Trends
* PDF Report Generation
* Excel Report Export
* Academic Year-wise Reports
* Dynamic Charts & Analytics

---

### 👨‍🏫 Faculty Management

* Faculty Registration Requests
* Faculty Approval by Admin
* Faculty Removal by Admin
* User Management Dashboard
* Search & Filter Users

---

### 🔑 Password Recovery

* OTP-based Password Reset
* Email Verification
* Secure Password Update Workflow

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast
* Chart.js
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Nodemailer

### Cloud Services

* Cloudinary
* MongoDB Atlas

### Reporting

* jsPDF
* jsPDF AutoTable
* XLSX

---

## 📂 Project Structure

```bash
Department-Activity-Tracker
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── context
│   │   ├── services
│   │   └── utils
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   └── utils
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Akashg990/Project-Department_Activity.git
cd Department-Activity-tracker
```

---

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

---

### 4. Run Backend

```bash
cd server
npm run dev
```

---

### 5. Run Frontend

```bash
cd client
npm run dev
```

---

## 👥 User Roles

### Admin

* Approve Faculty Accounts
* Remove Faculty Accounts
* Manage Activities
* Generate Reports
* View Analytics

### Faculty

* Create Activities
* Edit Activities
* Delete Activities
* Upload Activity Images
* Generate Reports



---

## 📄 Reports

The platform supports:

* PDF Export
* Excel Export
* Activity Statistics
* Category Distribution Charts
* Monthly Activity Analysis

---

## 🔒 Security Features

* JWT Authentication
* Protected API Routes
* Password Hashing
* OTP Verification
* Faculty Approval Workflow
* Role-Based Authorization
* Environment Variable Protection

---

## 🎯 Future Enhancements

* Event Registration System
* Attendance Tracking
* Certificate Generation
* Event Notifications
* Mobile Application
* Advanced Analytics Dashboard
* Department-wise Segregation
* Real-Time Activity Updates

---

## 📸 Screenshots

Add screenshots of:
![Home Page](./client/public/Screenshot%202026-06-04%20163345.png)
![Dashboard Page](./client/public/Screenshot%202026-06-04%20163405.png)

* Login Page
* Dashboard
* Activities Page
* Reports Page
* User Management
* Activity Details
* Analytics Dashboard

---

## 👨‍💻 Developed By

**Akash Gond**
**Altaf Shaikh**

B.Tech Computer Engineering
GH Raisoni University

---

## 📜 License

This project is developed for academic and departmental activity management purposes.
