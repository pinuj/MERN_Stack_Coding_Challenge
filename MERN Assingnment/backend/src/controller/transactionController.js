
const transactionService = require('../services/transactionService');

// Seed the database
exports.seedDatabase = async (req, res) => {
  try {
    const result = await transactionService.seedDatabase();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  const { search = '', page = 1, perPage = 10, month } = req.query;

  try {
    if (!month) {
      return res.status(400).json({ error: "Month parameter is required" });
    }

    const pageNumber = parseInt(page);
    const perPageNumber = parseInt(perPage);

    if (isNaN(pageNumber) || isNaN(perPageNumber) || pageNumber < 1 || perPageNumber < 1) {
      return res.status(400).json({ error: "Invalid page or perPage parameter" });
    }

    const data = await transactionService.getTransactions(search, pageNumber, perPageNumber, month);
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    
    res.status(500).json({ error: error.message });
  }
};
// Get statistics for a selected month
exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    try {
      const stats = await transactionService.getStatistics(month);
      res.status(200).json(stats);
    } catch (error) {
      console.error('Error in getStatistics:', error);
      res.status(500).json({ error: error.message });
    }
  };
// Get bar chart data for a selected month
exports.getBarChart = async (req, res) => {
  const { month } = req.query;

  try {
    const barChartData = await transactionService.getBarChart(month);
    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pie chart data for a selected month
exports.getPieChart = async (req, res) => {
  const { month } = req.query;

  try {
    const pieChartData = await transactionService.getPieChart(month);
    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCombinedData = async (req, res) => {
  const { month, search = '', page = 1, limit = 10 } = req.query;

  try {
    const [transactions, stats, barChartData, pieChartData] = await Promise.all([
      transactionService.getTransactions(search, parseInt(page), parseInt(limit), month),
      transactionService.getStatistics(month),
      transactionService.getBarChart(month),
      transactionService.getPieChart(month)
    ]);

    const combinedData = {
      transactions: transactions.transactions,
      totalCount: transactions.totalCount,
      statistics: stats,
      barChart: barChartData,
      pieChart: pieChartData,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};