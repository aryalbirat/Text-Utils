# TextUtils

A modern full-stack web application for transforming and storing text with secure user authentication.

<div align="center">
  <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  </div>
</div>

## ✨ Features

- **🔒 User Authentication**
  - Secure registration & login system
  - Password hashing with bcrypt
  - JWT-protected routes

- **📝 Text Transformation**
  - Convert to uppercase/lowercase
  - Select all text with one click
  - Copy to clipboard
  - Character and word count

- **💾 Text Management**
  - Save transformed texts to your account
  - View all your saved texts
  - Update existing texts
  - Delete unwanted texts

- **🛡️ Security**
  - JWT authentication
  - Password hashing
  - API rate limiting
  - HTTP headers hardened with Helmet

- **🎨 Modern UI**
  - Responsive design with Tailwind CSS
  - Gradient styling and animations
  - Clean, intuitive interface

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Express-validator
- Security: Helmet, bcrypt, rate limiting

### Frontend
- React 18 + Vite
- Tailwind CSS for styling
- Fetch API for data handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/text-utils.git
   cd text-utils
   ```

2. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```
   JWT_SECRET=your_super_secret_key_here
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/TextUtils
   ```

3. **Install dependencies**
   ```bash
   # Backend setup
   cd backend
   npm install
   
   # Frontend setup
   cd ../frontend
   npm install
   ```

4. **Run the application**
   ```bash
   # Start backend (from backend directory)
   npm run dev
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## 📡 API Documentation

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/api/register` | POST | Register new user | Public |
| `/api/login` | POST | Login and get JWT | Public |
| `/api/texts` | GET | Retrieve all user texts | Protected |
| `/api/texts` | POST | Create new text | Protected |
| `/api/texts/:id` | PUT | Update existing text | Protected |
| `/api/texts/:id` | DELETE | Delete a text | Protected |

## 📁 Project Structure

```
text-utils/
├── backend/                # Node.js server
│   ├── middleware/         # Auth middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   └── server.js           # Express app entry
│
└── frontend/               # React application
    ├── src/
    │   ├── api/            # API service functions
    │   ├── components/     # React components
    │   └── App.jsx         # Main component
    ├── index.html          # HTML entry
    └── tailwind.config.js  # Tailwind configuration
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication for protected routes
- API rate limiting to prevent brute force attacks
- HTTP headers hardened with Helmet
- Input validation with Express-validator

## 💡 Usage Examples

### Text Transformation
1. Enter text in the main text area
2. Use the buttons to transform text (uppercase, lowercase, etc.)
3. View character and word count metrics in real-time

### Saving and Managing Texts
1. Login to your account or register a new one
2. Transform your text as needed
3. Click "Save" to store it to your account
4. Access your saved texts from the dashboard
5. Edit or delete saved texts as needed


## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Birat Aryal** - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgements

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
  
