"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AssessmentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    revolvingUtilization: "",
    age: "",
    late30to59: "",
    debtRatio: "",
    monthlyIncome: "",
    openCreditLines: "",
    late90: "",
    realEstateLoans: "",
    late60to89: "",
    dependents: "",
    bankStatement: null as File | null,
    upiFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  
  async function handleAnalyze() {
  try {
    // 1. First upload bank + UPI files
    if (formData.bankStatement && formData.upiFile) {
      const uploadData = new FormData();

      uploadData.append("bankStatement", formData.bankStatement);
      uploadData.append("upiFile", formData.upiFile);

      const uploadResponse = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Financial document upload failed");
      }

      const financialData = await uploadResponse.json();

      // Save uploaded financial data
      localStorage.setItem(
        "financialData",
        JSON.stringify(financialData)
      );
    }
    const savedFinancialData = localStorage.getItem("financialData");

    const upiBehaviourScore = savedFinancialData
  ? JSON.parse(savedFinancialData)?.upi_features?.upi_behaviour_score || 0
  : 0;

    // 2. Send credit information to ML model
    const response = await fetch(
      "http://127.0.0.1:8000/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          revolvingUtilization: Number(
            formData.revolvingUtilization
          ),
          age: Number(formData.age),
          late30to59: Number(formData.late30to59),
          debtRatio: Number(formData.debtRatio),
          monthlyIncome: Number(formData.monthlyIncome),
          openCreditLines: Number(
            formData.openCreditLines
          ),
          late90: Number(formData.late90),
          realEstateLoans: Number(
            formData.realEstateLoans
          ),
          late60to89: Number(
            formData.late60to89
          ),
          dependents: Number(formData.dependents),
          upiBehaviourScore: upiBehaviourScore,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const data = await response.json();

    // 3. Save ML result
    localStorage.setItem(
      "creditResult",
      JSON.stringify(data)
    );

    // 4. Go to results
    router.push("/results");

  } catch (error) {
    console.error(error);
    alert("Assessment failed. Please check the backend.");
  }
}


  return (
    <main className="min-h-screen bg-background text-white pt-24 pb-12 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            AI Credit Assessment
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Enter your financial and credit information to generate
            an AI-powered credit assessment.
          </p>

        </div>


        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold mb-4">
              Financial Information
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block mb-2 text-sm">
                  Age
                </label>

                <input
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  Monthly Income
                </label>

                <input
                  type="number"
                  placeholder="Enter monthly income"
                  value={formData.monthlyIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyIncome: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  Credit Utilization
                </label>

                <input
                  type="number"
                  step="0.01"
                  placeholder="Example: 0.30"
                  value={formData.revolvingUtilization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      revolvingUtilization: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  Debt Ratio
                </label>

                <input
                  type="number"
                  step="0.01"
                  placeholder="Example: 0.30"
                  value={formData.debtRatio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      debtRatio: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  Number of Dependents
                </label>

                <input
                  type="number"
                  placeholder="Enter dependents"
                  value={formData.dependents}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dependents: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold mb-4">
              Credit History
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block mb-2 text-sm">
                  30–59 Days Past Due
                </label>

                <input
                  type="number"
                  placeholder="Enter count"
                  value={formData.late30to59}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late30to59: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  60–89 Days Past Due
                </label>

                <input
                  type="number"
                  placeholder="Enter count"
                  value={formData.late60to89}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late60to89: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  90+ Days Late
                </label>

                <input
                  type="number"
                  placeholder="Enter count"
                  value={formData.late90}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late90: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  Open Credit Lines & Loans
                </label>

                <input
                  type="number"
                  placeholder="Enter number"
                  value={formData.openCreditLines}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openCreditLines: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>


              <div>
                <label className="block mb-2 text-sm">
                  Real Estate Loans / Lines
                </label>

                <input
                  type="number"
                  placeholder="Enter number"
                  value={formData.realEstateLoans}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      realEstateLoans: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
                />
              </div>

            </div>

          </div>

        </div>


        {/* DOCUMENT UPLOAD */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-xl font-semibold mb-4">
            Financial Documents
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 text-sm">
                Bank Statement
              </label>

              <input
                type="file"
                accept=".csv,.pdf"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankStatement:
                      e.target.files?.[0] || null,
                  })
                }
                className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
              />

            </div>


            <div>

              <label className="block mb-2 text-sm">
                UPI Statement
              </label>

              <input
                type="file"
                accept=".csv"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    upiFile:
                      e.target.files?.[0] || null,
                  })
                }
                className="w-full rounded-lg bg-black/20 border border-white/10 p-3"
              />

            </div>

          </div>

        </div>


        {/* ANALYZE */}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full mt-6 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 py-3 font-semibold transition"
        >
          {loading
            ? "Analyzing Financial Data..."
            : "Analyze with AI"}
        </button>


        <div className="mt-8">

          <Link
            href="/dashboard"
            className="text-blue-400 hover:underline"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </div>

    </main>
  );
}