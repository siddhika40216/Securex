export const mockUserData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  creditScore: 785,
  scoreRange: 300,
  scoreMax: 850,
  riskLevel: 'Low',
  accountAge: '5 years',
  applicationsPending: 2,
  approvalRate: 94,
}

export const mockTransactions = [
  { id: 1, description: 'Monthly Rent Payment', amount: -1500, date: '2024-07-10', category: 'Housing', status: 'Completed' },
  { id: 2, description: 'Salary Deposit', amount: 5500, date: '2024-07-08', category: 'Income', status: 'Completed' },
  { id: 3, description: 'Credit Card Payment', amount: -800, date: '2024-07-05', category: 'Payments', status: 'Completed' },
  { id: 4, description: 'Utility Bill', amount: -150, date: '2024-07-03', category: 'Bills', status: 'Completed' },
  { id: 5, description: 'Restaurant', amount: -45.50, date: '2024-07-02', category: 'Dining', status: 'Completed' },
  { id: 6, description: 'Gas Station', amount: -50, date: '2024-07-01', category: 'Transport', status: 'Completed' },
]

export const mockCreditFactors = [
  { label: 'Payment History', value: 95, weight: 35, impact: 'Excellent' },
  { label: 'Credit Utilization', value: 28, weight: 30, impact: 'Good' },
  { label: 'Account Age', value: 85, weight: 15, impact: 'Strong' },
  { label: 'Credit Mix', value: 80, weight: 10, impact: 'Diverse' },
  { label: 'Inquiries', value: 90, weight: 10, impact: 'Few Recent' },
]

export const mockMonthlyData = [
  { month: 'Jan', score: 720, average: 725 },
  { month: 'Feb', score: 735, average: 727 },
  { month: 'Mar', score: 745, average: 730 },
  { month: 'Apr', score: 755, average: 735 },
  { month: 'May', score: 770, average: 742 },
  { month: 'Jun', score: 780, average: 750 },
  { month: 'Jul', score: 785, average: 755 },
]

export const mockLoanRecommendations = [
  {
    id: 1,
    type: 'Personal Loan',
    rate: '4.5%',
    amount: '$50,000',
    term: '60 months',
    monthlyPayment: '$919',
    likelihood: 'Very High',
  },
  {
    id: 2,
    type: 'Home Mortgage',
    rate: '5.2%',
    amount: '$350,000',
    term: '360 months',
    monthlyPayment: '$1,876',
    likelihood: 'High',
  },
  {
    id: 3,
    type: 'Auto Loan',
    rate: '4.8%',
    amount: '$40,000',
    term: '72 months',
    monthlyPayment: '$619',
    likelihood: 'Very High',
  },
]

export const mockFraudAlerts = [
  { id: 1, type: 'Unusual Location', description: 'Login from Singapore detected', severity: 'Info', timestamp: '2 hours ago' },
  { id: 2, type: 'Large Transaction', description: 'Transaction of $5,000+ from new merchant', severity: 'Warning', timestamp: '1 day ago' },
]

export const mockApplications = [
  { id: 1, type: 'Credit Card', status: 'Under Review', appliedDate: '2024-07-08', decision: 'Pending' },
  { id: 2, type: 'Personal Loan', status: 'Approved', appliedDate: '2024-06-15', decision: 'Approved' },
  { id: 3, type: 'Auto Loan', status: 'In Progress', appliedDate: '2024-07-10', decision: 'Pending' },
]
