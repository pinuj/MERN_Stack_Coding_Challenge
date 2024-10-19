

const axios = require('axios');
const Transaction = require('../models/transactionModel');

// Seed the database
async function seedDatabase() {
    try {
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const transactions = response.data;
  
      // Clear existing data and insert new data
      await Transaction.deleteMany();  
      await Transaction.insertMany(transactions);  
  
      console.log('Database seeded successfully');
     return {status: true, message:"Database seeded successfully"}
     } catch (error) {
      console.error('Error seeding database:', error.message);
    }
  }


async function getTransactions(search, page, limit, month) {
  const monthIndex = getMonthIndex(month);
  
  const pipeline = [
    {
      $addFields: {
        month: { $month: "$dateOfSale" }
      }
    },
    {
      $match: {
        month: monthIndex + 1,
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ]
      }
    },
    {
      $facet: {
        transactions: [
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ],
        totalCount: [
          { $count: 'count' }
        ]
      }
    }
  ];

  const result = await Transaction.aggregate(pipeline);
  
  return {
    transactions: result[0].transactions,
    totalCount: result[0].totalCount[0]?.count || 0
  };
}

async function getStatistics(month) {
  console.log("month:", month);
  
  const monthIndex = getMonthIndex(month);
  console.log("monthIndex:", monthIndex);

  const pipeline = [
    {
      $addFields: {
        month: { $month: "$dateOfSale" }
      }
    },
    {
      $match: {
        month: monthIndex + 1  // $month returns 1-12, so we add 1 to our 0-based index
      }
    },
    {
      $facet: {
        totalSaleAmount: [
          { $match: { sold: true } },
          { $group: { _id: null, total: { $sum: "$price" } } }
        ],
        totalSoldItems: [
          { $match: { sold: true } },
          { $count: "count" }
        ],
        totalNotSoldItems: [
          { $match: { sold: false } },
          { $count: "count" }
        ]
      }
    }
  ];

  const result = await Transaction.aggregate(pipeline);
  console.log("Aggregation Result:", JSON.stringify(result, null, 2));

  return {
    totalSaleAmount: result[0].totalSaleAmount[0]?.total || 0,
    totalSoldItems: result[0].totalSoldItems[0]?.count || 0,
    totalNotSoldItems: result[0].totalNotSoldItems[0]?.count || 0
  };
}

function getMonthIndex(month) {
  const monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  const monthIndex = monthMap[month.toLowerCase()];

  if (monthIndex === undefined) {
    throw new Error("Invalid month provided");
  }

  return monthIndex;
}


// // Get bar chart data for price ranges
// async function getBarChart(month) {
//   const [startDate, endDate] = getMonthRange(month);

//   const match = { dateOfSale: { $gte: startDate, $lt: endDate } };

//   const priceRanges = await Transaction.aggregate([
//     { $match: match },
//     {
//       $bucket: {
//         groupBy: "$price",
//         boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 10000],
//         default: "901-above",
//         output: {
//           count: { $sum: 1 }
//         }
//       }
//     }
//   ]);

//   return priceRanges;
// }

// // Get pie chart data for categories
// async function getPieChart(month) {
//   const [startDate, endDate] = getMonthRange(month);

//   const match = { dateOfSale: { $gte: startDate, $lt: endDate } };

//   const categoryDistribution = await Transaction.aggregate([
//     { $match: match },
//     { $group: { _id: "$category", count: { $sum: 1 } } }
//   ]);

//   return categoryDistribution;
// }

async function getBarChart(month) {
  console.log("month for bar chart:", month);
  
  const monthIndex = getMonthIndex(month);
  console.log("monthIndex for bar chart:", monthIndex);

  const pipeline = [
    {
      $addFields: {
        month: { $month: "$dateOfSale" }
      }
    },
    {
      $match: {
        month: monthIndex + 1  // $month returns 1-12, so we add 1 to our 0-based index
      }
    },
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
        default: "901-above",
        output: {
          count: { $sum: 1 }
        }
      }
    }
  ];

  const result = await Transaction.aggregate(pipeline);
  console.log("Bar Chart Result:", JSON.stringify(result, null, 2));

  return result;
}

async function getPieChart(month) {
  console.log("month for pie chart:", month);
  
  const monthIndex = getMonthIndex(month);
  console.log("monthIndex for pie chart:", monthIndex);

  const pipeline = [
    {
      $addFields: {
        month: { $month: "$dateOfSale" }
      }
    },
    {
      $match: {
        month: monthIndex + 1  // $month returns 1-12, so we add 1 to our 0-based index
      }
    },
    {
      $group: { 
        _id: "$category", 
        count: { $sum: 1 } 
      }
    }
  ];

  const result = await Transaction.aggregate(pipeline);
  console.log("Pie Chart Result:", JSON.stringify(result, null, 2));

  return result;
}

module.exports = {
  seedDatabase,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart
};
