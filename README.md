````markdown
# 🏫 School Employee Management System (CRUD)

This is a **frontend-only React CRUD web application** developed as part of my internship project at **FlexiSAF**. It simulates an internal employee management platform where:

- Admins/HR Managers can **manage employees and leave requests**
- Employees can **apply for leave**
- All data is handled and persisted using **`localStorage`**

> ✅ Fully implemented with React + MUI  
> 🔐 Role-based authentication using Context API  
> 🚀 Deployed on GitHub Pages

---

## 🌐 Live Demo

👉 [Click here to view the live application](https://brilliant-smart.github.io/FIP-T12025-Final-Hands-on-Project)

---

## 📸 Screenshots

> 📂 All screenshots are available in the `/Screenshots` folder inside the repository.

| Dashboard View                            | Employee List                             | Leave Request Form                          |
| ----------------------------------------- | ----------------------------------------- | ------------------------------------------- |
| ![Dashboard](./Screenshots/dashboard.png) | ![Employees](./Screenshots/employees.png) | ![Leave Form](./Screenshots/leave-form.png) |

---

## 🧠 Features

### ✅ Authentication

- Login with mock credentials (Admin / HR Manager / Employee)
- Role-based access (e.g. only employees can apply for leave)

### 👥 Employee Management (Admin/HR Only)

- Add, edit, delete employees
- Auto-generate `employeeID`
- Form validation and toast notifications
- Search + Pagination

### 📝 Leave Management

- Employee submits leave application
- Admin/HR sees list of leave requests
- Approve/Reject leave requests
- Employee sees leave history + status

### 💾 Persistent Data

- All operations persist via `localStorage`

### 🌙 UI / UX

- Built with [Material UI (MUI)](https://mui.com/)
- Responsive and accessible design
- Clean Sidebar + Navbar layout

---

## 🔑 Roles & Access Control

| Role           | Access                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| **Admin**      | Dashboard, Manage Employees, View & Approve Leave Requests             |
| **HR Manager** | Dashboard, Manage Employees, View & Approve Leave Requests             |
| **Employee**   | Dashboard, Apply for Leave, View Leave History (Read-only access only) |

---

## 🔐 Login Credentials (Mock)

Use these to test different roles:

| Role       | Email                | Password    |
| ---------- | -------------------- | ----------- |
| Admin      | admin@example.com    | admin123    |
| HR Manager | hr@example.com       | hr123       |
| Employee   | employee@example.com | employee123 |

---

## 🛠 Tech Stack

| Tech             | Usage                         |
| ---------------- | ----------------------------- |
| **React**        | Frontend Framework            |
| **MUI**          | UI Components & Styling       |
| **Context API**  | Authentication & User Roles   |
| **localStorage** | Data Persistence (No Backend) |
| **Vite**         | Development Build Tool        |
| **Day.js**       | Formatting Timestamps         |

---

---

## 🚀 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/brilliant-smart/FIP-T12025-Final-Hands-on-Project

# 2. Navigate to the project
cd your-repo-name

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```
````

---

## 🌍 Deployment

This project is deployed using **GitHub Pages** via `vite.config.js`.

To deploy:

```bash
npm run build
npm run deploy
```

---

## 📄 Project Presentation (PDF)

> 🎯 The final presentation slide explaining this project is included in `/Screenshots/Project_Presentation.pdf`

---

## 🤝 Acknowledgements

Thanks to **FlexiSAF Edusoft Ltd.** for the internship opportunity and inspiration for building this project based on real-world school software scenarios.

---

## 📫 Contact

**Developer**: [Your Name]  
📧 Email: brilliant_smart@live.com  
🔗 GitHub: [@your-username](https://github.com/brilliant-smart)

---
