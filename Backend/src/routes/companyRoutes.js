const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const { createCompany, updateCompany } = require('../controllers/companyController');

// Admin-only route for creating a company.
router.post("/", authMiddleware, authorizeRole("admin"), createCompany);
router.put("/:id", authMiddleware, authorizeRole("admin"), updateCompany);

module.exports = router;