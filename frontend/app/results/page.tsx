"use client";

import { useEffect, useState } from "react";

interface FeatureImportance {
  feature: string;
  importance: number;
}

interface CreditResult {
  score: number;
  risk: string;
  confidence: number;
  recommendation: number;
  default_probability: number;
  interest_rate: number;
  model_prediction: number;
  feature_importance: FeatureImportance[];
  shap_explanation: {
    feature: string;
    impact: number;
  }[];
}
interface FinancialData {
  message: string;
  bank_statement: {
    filename: string;
    size: number;
  };
  upi_features: {
    transaction_count: number;
    total_transaction_amount: number;
    average_transaction_amount: number;
    total_debit: number;
    total_credit: number;
    credit_debit_ratio: number;
    upi_behaviour_score: number;
  };
}

export default function ResultsPage() {
  const [result, setResult] = useState<CreditResult | null>(null);
  const [financialData, setFinancialData] =
  useState<FinancialData | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("creditResult");
    const savedFinancialData = localStorage.getItem("financialData");
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
    if (savedFinancialData) {
    setFinancialData(JSON.parse(savedFinancialData));
  }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-background text-white flex items-center justify-center">
        <p>Loading credit assessment...</p>
      </main>
    );
  }

  const score = result.score;

  const scoreLabel =
    score >= 740
      ? "Excellent"
      : score >= 670
      ? "Good"
      : score >= 580
      ? "Fair"
      : "Poor";

  

  return (
    <main className="min-h-screen bg-background text-white pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            AI Credit Assessment Report
          </h1>

          <p className="mt-3 text-gray-400">
            Generated using your financial and credit information.
          </p>
        </div>

        {/* Credit Score */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-6">
          <p className="text-gray-400">
            Your Credit Score
          </p>

          <h2 className="text-6xl font-bold mt-3">
            {score}
          </h2>

          <p className="text-xl mt-2">
            {scoreLabel}
          </p>
        </div>

        {/* Risk Assessment */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Risk Assessment
          </h2>

          <p className="text-xl font-semibold">
            {result.risk}
          </p>

          <div className="mt-5 space-y-3 text-gray-300">
            <p>
              Default Probability:{" "}
              <strong>
                {(result.default_probability * 100).toFixed(2)}%
              </strong>
            </p>

            <p>
              Model Prediction:{" "}
              <strong>
                {result.model_prediction === 0
                  ? "No Serious Delinquency Predicted"
                  : "Serious Delinquency Predicted"}
              </strong>
            </p>
          </div>
        </div>

        {financialData && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-5">
              Financial Behaviour
            </h2>

            <p className="text-gray-400 mb-5">
              Insights extracted from your uploaded UPI statement.
            </p>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="rounded-xl bg-white/5 p-5">
                <p className="text-gray-400">
                  UPI Transactions
                </p>
                <p className="text-2xl font-bold mt-2">
          {financialData.upi_features.transaction_count}
        </p>
      </div>
      <div className="rounded-xl bg-white/5 p-5">
        <p className="text-gray-400">
          Credit / Debit Ratio
        </p>
        <p className="text-2xl font-bold mt-2">
          {financialData.upi_features.credit_debit_ratio}
        </p>
      </div>

      <div className="rounded-xl bg-white/5 p-5">
        <p className="text-gray-400">
          UPI Behaviour Score
        </p>
        <p className="text-2xl font-bold mt-2">
          {financialData.upi_features.upi_behaviour_score}/50
        </p>
      </div>

      <div className="rounded-xl bg-white/5 p-5">
        <p className="text-gray-400">
          Total Transaction Amount
        </p>
        <p className="text-2xl font-bold mt-2">
          ₹
          {financialData.upi_features.total_transaction_amount.toLocaleString(
            "en-IN"
          )}
        </p>
      </div>

      <div className="rounded-xl bg-white/5 p-5">
        <p className="text-gray-400">
          Total Credits
        </p>
        <p className="text-2xl font-bold mt-2">
          ₹
          {financialData.upi_features.total_credit.toLocaleString(
            "en-IN"
          )}
        </p>
      </div>

      <div className="rounded-xl bg-white/5 p-5">
        <p className="text-gray-400">
          Total Debits
        </p>
        <p className="text-2xl font-bold mt-2">
          ₹
          {financialData.upi_features.total_debit.toLocaleString(
            "en-IN"
          )}
        </p>
      </div>

      <div className="rounded-xl bg-white/5 p-5 md:col-span-2">
        <p className="text-gray-400">
          Average Transaction
        </p>
        <p className="text-2xl font-bold mt-2">
          ₹
          {financialData.upi_features.average_transaction_amount.toLocaleString(
            "en-IN"
          )}
        </p>
      </div>

    </div>
  </div>
)}

        {/* Loan Recommendation */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Loan Recommendation
          </h2>

          <p className="text-4xl font-bold">
            ₹{result.recommendation.toLocaleString("en-IN")}
          </p>

          <p className="mt-4 text-gray-400">
            Recommended Interest Rate
          </p>

          <p className="text-2xl font-semibold mt-1">
            {result.interest_rate}% p.a.
          </p>

          <p className="mt-3 text-gray-400">
            Recommendation is based on predicted credit risk,
            income and debt-related financial indicators.
          </p>
        </div>



        {/* AI Confidence */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-6">
          <h2 className="text-2xl font-semibold">
            AI Confidence
          </h2>

          <p className="text-4xl font-bold mt-3">
            {result.confidence}%
          </p>

          <div className="w-full h-3 bg-white/10 rounded-full mt-5">
            <div
              className="h-3 rounded-full bg-cyan-500"
              style={{
                width: `${result.confidence}%`,
              }}
            />
          </div>

          <p className="text-gray-400 mt-3">
            Confidence derived from the model's prediction probabilities.
          </p>
        </div>

      {/* Why this Score */}
<div className="rounded-2xl border border-white/10 bg-white/5 p-8">
  <h2 className="text-2xl font-semibold mb-5">
    Why this Score?
  </h2>

  <p className="text-gray-400 mb-6">
    These factors explain how your financial profile influenced
    the AI prediction.
  </p>

  <div className="space-y-4">
    {result.shap_explanation.map((item) => {
      const positive = item.impact > 0;

      return (
        <div
          key={item.feature}
          className="flex items-center justify-between rounded-xl bg-white/5 p-4"
        >
          <div>
            <p className="font-medium">
              {item.feature}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {positive
                ? "Increased predicted default risk"
                : "Reduced predicted default risk"}
            </p>
          </div>

          <div
            className={`font-semibold ${
              positive
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {positive ? "+" : ""}
            {item.impact.toFixed(4)}
          </div>
        </div>
      );
    })}
  </div>
</div>
{/* Overall Model Feature Importance */}
<div className="rounded-2xl border border-white/10 bg-white/5 p-8 mt-6">
  <h2 className="text-2xl font-semibold mb-5">
    Overall Model Feature Importance
  </h2>

  <p className="text-gray-400 mb-6">
    These features have the highest overall influence on the credit scoring model.
  </p>

  <div className="space-y-4">
    {result.feature_importance.map((item) => (
      <div
        key={item.feature}
        className="flex items-center justify-between rounded-xl bg-white/5 p-4"
      >
        <p className="font-medium">
          {item.feature}
        </p>

        <p className="font-semibold text-cyan-400">
          {(item.importance * 100).toFixed(1)}%
        </p>
      </div>
    ))}
  </div>
</div>

      </div>
    </main>
  );
}