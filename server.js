// ========================================
// IMPORTS
// ========================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ========================================
// DATABASE CONNECTIONS
// ========================================

require("./config/postgres");
require("./config/firestore");

// ========================================
// ROUTES
// ========================================

const authRoutes = require("./modules/auth/auth.routes");
const broilerRoutes = require("./modules/broiler/broiler.routes");
const poultryRoutes = require("./modules/layers/layers.routes");
const feedmillRoutes = require("./modules/feedmill/feed.routes");
const financeRoutes = require("./modules/finance/finance.routes");
const analyticsRoutes = require("./modules/analytics/analytics.routes");
const inventoryRoutes = require("./modules/inventory/inventory.routes");
const subscriptionRoutes = require("./modules/subscription/subscription.routes");
const paymentRoutes = require("./modules/payment/payment.routes");
const webhookRoutes = require("./modules/payment/webhook.routes");
const errorHandler = require("./shared/middleware/errorHandler");



// ========================================
// APP
// ========================================

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());
app.use(errorHandler);


// ========================================
// API ROUTES
// ========================================

app.use("/api/auth", authRoutes);
app.use("/api/layers", layersRoutes);
app.use("/api/feedmill", feedRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/broiler", broilerRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/uploads", express.static("uploads"));
// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});