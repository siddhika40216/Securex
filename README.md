# SecureX — AI-Powered Alternative Credit Intelligence

## Explainable AI for smarter and more inclusive credit assessment.

SecureX is a full-stack AI-powered credit intelligence platform that evaluates borrower creditworthiness by combining traditional credit indicators with alternative financial behaviour.

Instead of relying only on conventional credit information, SecureX incorporates UPI transaction behaviour into the assessment to generate a dynamic credit score, risk classification, default probability, loan recommendation, and explainable AI insights.


## ✨ Why SecureX?

Traditional credit scoring can be limiting for individuals with limited or incomplete credit histories.

SecureX explores an alternative approach by combining:

Traditional credit indicators
Income and debt-related information
Payment delinquency history
Digital payment behaviour through UPI
Explainable machine learning

The goal is to make credit assessment more data-driven, transparent, and inclusive.


## 🚀 Key Features
### 🤖 AI Credit Risk Prediction

The platform uses a trained machine learning classification model to estimate the probability of serious financial delinquency.

The prediction is based on factors such as:

Credit utilization
Debt ratio
Monthly income
Age
Open credit lines
30–59 days past due
60–89 days past due
90 days late
Real estate loans
Dependents


### 📊 Dynamic Credit Score

SecureX converts the model's predicted default probability into a credit score ranging from:

300 – 850

The final score combines the base ML prediction with an additional UPI Behaviour Score, allowing digital financial behaviour to contribute to the assessment.


### 💳 UPI Financial Behaviour Analysis

Users can upload a UPI transaction CSV.

SecureX extracts:

Metric	Description
Transaction Count	Number of successful UPI transactions
Total Transaction Amount	Total value of transactions
Average Transaction	Average transaction value
Total Credits	Total incoming transaction amount
Total Debits	Total outgoing transaction amount
Credit/Debit Ratio	Relationship between credits and debits
UPI Behaviour Score	Behavioural score calculated from transaction patterns

Example:

UPI Transactions       : 9
Total Transactions     : ₹33,849
Total Credits          : ₹10,500
Total Debits           : ₹23,349
Credit/Debit Ratio     : 2.22
UPI Behaviour Score    : 40/50
⚠️ Risk Assessment

The generated credit score is converted into a risk category:

Score	Risk
740–850	Low Risk
670–739	Medium Risk
Below 670	High Risk

The results page also displays:

Default probability
Model prediction
Risk classification
💰 Dynamic Loan Recommendation

SecureX calculates a recommended loan amount using:

Monthly income
Debt ratio
Predicted financial risk

Higher debt ratios result in more conservative recommendations.

📈 Risk-Based Interest Rate

The recommended interest rate is dynamically determined using the predicted default probability.

This creates a more personalized lending recommendation instead of displaying a fixed interest rate.

🧠 Explainable AI

SecureX doesn't only provide a score—it also explains why the model produced that result.

The results page displays feature-level impacts such as:

Credit Utilization       +0.1144
Debt Ratio               +0.0592
30-59 Days Past Due      +0.0492
Age                      -0.0371

Each factor is labelled according to whether it:

Increased predicted default risk
Reduced predicted default risk

This improves transparency and makes the AI assessment easier to understand.

📌 Global Feature Importance

SecureX also displays the overall importance of features in the trained model.

Example:

Credit Utilization
Debt Ratio
Monthly Income
Age
90 Days Late
30-59 Days Past Due
Open Credit Lines
60-89 Days Past Due
Real Estate Loans
Dependents

This provides a broader understanding of what drives the model's decisions.

🎯 AI Confidence

The results page displays the model's prediction confidence along with a visual progress indicator.

Example:

AI Confidence: 88%


## 🏗️ System Architecture
                    ┌──────────────────────┐
                    │      User Input      │
                    │ Credit + UPI Data    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Next.js Frontend   │
                    │ React + TypeScript    │
                    │    Tailwind CSS       │
                    └──────────┬───────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    │      Python          │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
      ┌──────────────────┐          ┌──────────────────┐
      │ Credit ML Model  │          │  UPI Processing  │
      │   Prediction     │          │     Pandas       │
      └────────┬─────────┘          └────────┬─────────┘
               │                             │
               └──────────────┬──────────────┘
                              ▼
                    ┌──────────────────────┐
                    │ Combined Assessment  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        Credit Score       Risk Level      Loan Amount
              │
              ▼
       ┌─────────────────┐
       │ Explainable AI  │
       │ SHAP + Feature  │
       │   Importance    │
       └─────────────────┘


## 🛠️ Technology Stack
### Frontend
Next.js
React
TypeScript
Tailwind CSS

Next.js is a React framework, and the project uses React functional components and hooks such as useState and useEffect.

### Backend
Python
FastAPI
Uvicorn

### Machine Learning
Scikit-learn
Random Forest
SHAP
Joblib
Data Processing
Pandas
NumPy
CSV processing
Communication
REST APIs
JSON
Browser LocalStorage


## 📁 Project Structure
Securex/
│
├── backend/
│   ├── app.py
│   ├── utils.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   └── predict/
│   │   │       └── route.ts
│   │   │
│   │   ├── assessmment/
│   │   │   └── page.tsx
│   │   │
│   │   └── results/
│   │       └── page.tsx
│   │
│   └── components/
│       └── assessment/
│           └── UploadCard.tsx
│
├── assets/
├── database/
├── docs/
├── ml/
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

The trained model file is intentionally excluded from GitHub because it exceeds GitHub's standard file-size limit.


## 🔌 API Endpoints
POST /predict

Receives credit and financial behaviour features and generates the AI credit assessment.

Example Request
{
  "revolvingUtilization": 0.25,
  "age": 30,
  "late30to59": 0,
  "debtRatio": 0.35,
  "monthlyIncome": 50000,
  "openCreditLines": 8,
  "late90": 0,
  "realEstateLoans": 1,
  "late60to89": 0,
  "dependents": 2,
  "upiBehaviourScore": 40
}
Response Includes
Credit Score
Risk Classification
Default Probability
Model Prediction
Loan Recommendation
Interest Rate
AI Confidence
SHAP Explanation
Feature Importance
POST /upload

Accepts uploaded financial documents and processes the UPI transaction CSV.

UPI Output
{
  "transaction_count": 9,
  "total_transaction_amount": 33849,
  "average_transaction_amount": 3761,
  "total_debit": 23349,
  "total_credit": 10500,
  "credit_debit_ratio": 2.22,
  "upi_behaviour_score": 40
}


## ▶️ Running the Project Locally
1. Clone the Repository
git clone https://github.com/siddhika40216/Securex.git
cd Securex
2. Backend Setup
cd backend

Create a virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the FastAPI server:

uvicorn app:app --reload

The backend will run at:

http://127.0.0.1:8000

Swagger API documentation:

http://127.0.0.1:8000/docs
3. Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Open:

http://localhost:3000


## 🔐 Model File

The trained machine learning model is stored separately from the Git repository because the model file is larger than GitHub's standard 100 MB file limit.

For deployment, the model should be stored using an appropriate model-storage solution or Git LFS.


## 🌱 Future Scope

SecureX can be extended with:

Utility bill payment history
Detailed savings-pattern analysis
More alternative financial data sources
Bank account transaction categorization
Automated income consistency analysis
Personalized financial improvement recommendations
Real-time model monitoring
Secure cloud-based model storage
Fairness and bias monitoring
Model retraining pipelines
Mobile application support


## 🎯 Project Objective

Traditional credit scoring can limit access to financial services for individuals with limited or incomplete credit histories.

SecureX explores an alternative approach by combining conventional credit indicators with digital financial behaviour.

The objective is to support more inclusive, explainable, and data-driven lending decisions.


## ⚠️ Disclaimer

SecureX is an academic and prototype project intended for demonstrating machine learning, financial data analysis, explainable AI, and full-stack application development.

The predictions and recommendations generated by the system should not be considered professional financial or lending advice.


## 👩‍💻 Author

Siddhika Srivastava

B.Tech Computer Science
Banasthali Vidyapith


⭐ If you find this project interesting, consider giving the repository a star.