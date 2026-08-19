import { NextResponse } from "next/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const income = Number(data.monthlyIncome);
  const loan = Number(data.loanAmount);

  let score = 650;

  // Income effect
  if (income >= 100000) score += 120;
  else if (income >= 70000) score += 90;
  else if (income >= 50000) score += 60;
  else if (income >= 30000) score += 30;

  // Loan effect
  if (loan > income * 20) score -= 120;
  else if (loan > income * 10) score -= 70;
  else if (loan > income * 5) score -= 30;

  // Employment effect
  if (data.employmentType === "Business Owner") score += 20;
  if (data.employmentType === "Self Employed") score += 10;
  if (data.employmentType === "Freelancer") score -= 10;

  // Clamp score
  score = Math.max(300, Math.min(score, 850));

  let risk = "Low Risk";

  if (score < 580) risk = "High Risk";
  else if (score < 670) risk = "Medium Risk";

  const recommendation = Math.round(income * 10);

  return NextResponse.json({
    score,
    risk,
    confidence: 94.8,
    recommendation,
  });
}
