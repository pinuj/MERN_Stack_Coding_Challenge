const express = require('express');
const transactionController = require('../controller/transactionController');
const router = express.Router();

router.get('/seed', transactionController.seedDatabase);
router.get('/transactions', transactionController.getTransactions);
router.get('/statistics', transactionController.getStatistics);
router.get('/barChart', transactionController.getBarChart);
router.get('/pieChart', transactionController.getPieChart);
router.get('/combinedData', transactionController.getCombinedData);

module.exports = router;
