const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const users = [
    { id: 1, email: "admin@example.com", password: bcrypt.hashSync("admin123", 10), role: "Admin" },
    { id: 2, email: "hr@example.com", password: bcrypt.hashSync("hr123", 10), role: "HR Manager" },
    { id: 3, email: "employee@example.com", password: bcrypt.hashSync("employee123", 10), role: "Employee" },
];

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "your-secret-key", { expiresIn: "1h" });

    res.json({ user, token });
});

module.exports = router;
