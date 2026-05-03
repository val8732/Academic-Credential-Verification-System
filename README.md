# 🎓 Academic Credential Verification System

---

## 🚀 Features
- Issue academic credentials
- Store credential hash on blockchain
- Prevent duplicate credential IDs
- Upload supporting documents
- Generate QR codes for verification
- Store credential data in MySQL database
- Edit existing credentials

---

## 🛠️ Technologies Used

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Blockchain
- Solidity
- Hardhat
- Ethers.js

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

#### Frontend:
bash
cd credential-frontend
npm install
Backend:
cd blockchain-backend
npm install

2️⃣ Start MySQL
Open XAMPP

Start Apache and MySQL

3️⃣ Setup Database

Open phpMyAdmin → http://localhost/phpmyadmin

Create database:

academic_credentials
Import credentials.sql (found in backend folder)

4️⃣ Start Blockchain (Hardhat)
Open terminal:

npx hardhat node
Open another terminal:

npx hardhat run scripts/deploy.js --network localhost
⚠️ After deploying, update your contract address in frontend if needed.

5️⃣ Start Backend
cd blockchain-backend
node server.js

6️⃣ Start Frontend
cd credential-frontend
npm start

