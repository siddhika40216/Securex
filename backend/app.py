# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# class CreditRequest(BaseModel):
#     monthlyIncome: float
#     employmentType: str
#     loanAmount: float


# @app.get("/")
# def home():
#     return {"message": "Credit Scoring API is running"}


# @app.post("/predict")
# def predict(data: CreditRequest):

#     score = 650

#     if data.monthlyIncome >= 100000:
#         score += 100
#     elif data.monthlyIncome >= 70000:
#         score += 70
#     elif data.monthlyIncome >= 50000:
#         score += 50
#     elif data.monthlyIncome < 30000:
#         score -= 50

#     if data.loanAmount > data.monthlyIncome * 10:
#         score -= 80
#     elif data.loanAmount > data.monthlyIncome * 5:
#         score -= 40

#     if data.employmentType == "Business Owner":
#         score += 20
#     elif data.employmentType == "Self Employed":
#         score += 10
#     elif data.employmentType == "Freelancer":
#         score -= 10

#     score = max(300, min(score, 850))

#     if score >= 740:
#         risk = "Low Risk"
#     elif score >= 670:
#         risk = "Medium Risk"
#     else:
#         risk = "High Risk"

#     recommendation = int(data.monthlyIncome * 10)

#     return {
#         "score": score,
#         "risk": risk,
#         "confidence": 94.8,
#         "recommendation": recommendation
#     }




from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import shap


app = FastAPI()

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load trained model
# --------------------------------------------------

model = joblib.load("credit_model.pkl")
imputer = joblib.load("imputer.pkl")

explainer = shap.TreeExplainer(model)


# --------------------------------------------------
# Request model
# --------------------------------------------------

class CreditRequest(BaseModel):
    revolvingUtilization: float
    age: float
    late30to59: int
    debtRatio: float
    monthlyIncome: float
    openCreditLines: int
    late90: int
    realEstateLoans: int
    late60to89: int
    dependents: float
    upiBehaviourScore: float = 0


# --------------------------------------------------
# Home
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Credit Scoring API is running"
    }


# --------------------------------------------------
# Upload Financial Documents
# --------------------------------------------------

@app.post("/upload")
async def upload_files(
    bankStatement: UploadFile = File(...),
    upiFile: UploadFile = File(...)
):

    bank_content = await bankStatement.read()
    upi_content = await upiFile.read()

# -------------------------
# UPI CSV
# -------------------------

    upi_df = pd.read_csv(
        pd.io.common.BytesIO(upi_content),
        sep=",",
        engine="python"
    )

# If CSV was read as only one column,
# manually split the header and rows
    if len(upi_df.columns) == 1 and "," in str(upi_df.columns[0]):

        raw_text = upi_content.decode("utf-8-sig")

        lines = [
            line.strip()
            for line in raw_text.splitlines()
            if line.strip()
        ]

        header = [x.strip() for x in lines[0].split(",")]

        rows = []

        for line in lines[1:]:
            values = [x.strip() for x in line.split(",")]

            if len(values) == len(header):
                rows.append(values)

        upi_df = pd.DataFrame(rows, columns=header)


# Clean column names
    upi_df.columns = (
    upi_df.columns
    .astype(str)
    .str.strip()
)

    print("FINAL COLUMNS:", upi_df.columns.tolist())


    # Remove failed transactions
    if "Status" in upi_df.columns:
        upi_df = upi_df[
            upi_df["Status"]
            .astype(str)
            .str.strip()
            .str.lower()
            == "success"
        ]

 
    amount_column = None

    for col in upi_df.columns:
        if "amount" in col.lower():
            amount_column = col
            break

    if amount_column is None:
        return {
            "message": "Amount column not found",
            "columns_found": upi_df.columns.tolist()
        }


    # Convert amount to numbers
    upi_df[amount_column] = pd.to_numeric(
        upi_df[amount_column],
        errors="coerce"
    ).fillna(0)


# Find Type column
    type_column = None

    for col in upi_df.columns:
        if col.lower() == "type":
            type_column = col
            break


    transaction_count = len(upi_df)

    total_upi_amount = float(
        upi_df[amount_column].sum()
    )

    average_upi_amount = (
        total_upi_amount / transaction_count
        if transaction_count > 0
        else 0
    )


    total_upi_debit = 0
    total_upi_credit = 0

    if type_column:

        total_upi_debit = float(
            upi_df.loc[
                upi_df[type_column]
                .astype(str)
                .str.strip()
                .str.lower()
                == "debit",
                amount_column
            ].sum()
        )

        total_upi_credit = float(
        upi_df.loc[
            upi_df[type_column]
            .astype(str)
            .str.strip()
            .str.lower()
            == "credit",
            amount_column
        ].sum()
    )

    # --------------------------------------------------
    # UPI Financial Behaviour Score
    # --------------------------------------------------

    credit_amount = total_upi_credit
    debit_amount = total_upi_debit

    if credit_amount > 0:
        credit_debit_ratio = debit_amount / credit_amount
    else:
        credit_debit_ratio = 0

    transaction_score = min(transaction_count * 5, 25)

    if credit_debit_ratio <= 1:
        balance_score = 25
    elif credit_debit_ratio <= 2:
        balance_score = 20
    elif credit_debit_ratio <= 3:
        balance_score = 15
    else:
        balance_score = 10

    upi_behaviour_score = transaction_score + balance_score
        
    # Return result
    return {
        "message": "Financial data extracted successfully",

        "bank_statement":{
            "filename": bankStatement.filename,
            "size": len(bank_content),

        },

        "upi_features": {
            "transaction_count": transaction_count,
            "total_transaction_amount": round(
                total_upi_amount, 2
            ),
            "average_transaction_amount": round(
                average_upi_amount, 2
            ),
            "total_debit": round(
                total_upi_debit, 2
            ),
            "total_credit": round(
                total_upi_credit, 2
            ),
            "credit_debit_ratio": round(credit_debit_ratio, 2),
            "upi_behaviour_score": upi_behaviour_score
        }
    }
# --------------------------------------------------
# Credit Prediction
# --------------------------------------------------

@app.post("/predict")
def predict(data: CreditRequest):

    # --------------------------------------------------
    # Prepare model features
    # --------------------------------------------------

    features = {

        "RevolvingUtilizationOfUnsecuredLines":
            data.revolvingUtilization,

        "age":
            data.age,

        "NumberOfTime30-59DaysPastDueNotWorse":
            data.late30to59,

        "DebtRatio":
            data.debtRatio,

        "MonthlyIncome":
            data.monthlyIncome,

        "NumberOfOpenCreditLinesAndLoans":
            data.openCreditLines,

        "NumberOfTimes90DaysLate":
            data.late90,

        "NumberRealEstateLoansOrLines":
            data.realEstateLoans,

        "NumberOfTime60-89DaysPastDueNotWorse":
            data.late60to89,

        "NumberOfDependents":
            data.dependents
    }

    # --------------------------------------------------
    # Feature names for UI
    # --------------------------------------------------

    feature_names = [

        "Credit Utilization",

        "Age",

        "30-59 Days Past Due",

        "Debt Ratio",

        "Monthly Income",

        "Open Credit Lines",

        "90 Days Late",

        "Real Estate Loans",

        "60-89 Days Past Due",

        "Dependents"
    ]

    # --------------------------------------------------
    # DataFrame
    # --------------------------------------------------

    input_df = pd.DataFrame([features])

    # Apply same imputer used during training
    input_data = imputer.transform(input_df)

    # --------------------------------------------------
    # Model prediction
    # --------------------------------------------------

    prediction = model.predict(input_data)[0]

    probabilities = model.predict_proba(input_data)[0]

    default_probability = float(
        probabilities[1]
    )

    confidence = float(
        max(probabilities) * 100
    )

    # --------------------------------------------------
    # Credit score
    # --------------------------------------------------

    # Base ML credit score
    base_score = int(850 - (default_probability * 550))
    base_score = max(300, min(base_score, 850))

    # UPI behaviour adjustment
    upi_adjustment = (data.upiBehaviourScore - 25) * 2

    # Final combined score
    score = int(base_score + upi_adjustment)
    score = max(300, min(score, 850))

    # --------------------------------------------------
    # Risk
    # --------------------------------------------------

    if score >= 740:

        risk = "Low Risk"

    elif score >= 670:

        risk = "Medium Risk"

    else:

        risk = "High Risk"

    # --------------------------------------------------
    # Dynamic loan recommendation
    # --------------------------------------------------

    monthly_income = data.monthlyIncome
    debt_ratio = data.debtRatio

    if debt_ratio < 0.3:

        recommendation = monthly_income * 12

    elif debt_ratio < 0.5:

        recommendation = monthly_income * 8

    else:

        recommendation = monthly_income * 5

    # --------------------------------------------------
    # Dynamic interest rate
    # --------------------------------------------------

    if default_probability < 0.10:

        interest_rate = 9.5

    elif default_probability < 0.20:

        interest_rate = 11.5

    elif default_probability < 0.35:

        interest_rate = 14.0

    else:

        interest_rate = 17.0

    # --------------------------------------------------
    # Global feature importance
    # --------------------------------------------------

    importances = model.feature_importances_

    feature_importance = []

    for name, importance in zip(
        feature_names,
        importances
    ):

        feature_importance.append({

            "feature": name,

            "importance":
                round(float(importance), 4)
        })

    feature_importance.sort(
        key=lambda x: x["importance"],
        reverse=True
    )

    # --------------------------------------------------
    # SHAP explanation
    # --------------------------------------------------

    shap_values = explainer.shap_values(
        input_data
    )

    if isinstance(shap_values, list):

        user_shap = shap_values[1][0]

    else:

        user_shap = shap_values[0]

    shap_explanation = []

    for name, value in zip(feature_names, user_shap):

    # Handle numpy scalar / array safely
        if hasattr(value, "reshape"):
            value = float(value.reshape(-1)[0])
        else:
            value = float(value)

        shap_explanation.append({
            "feature": name,
            "impact": round(value, 4)
        })

    

    shap_explanation.sort(
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    # --------------------------------------------------
    # Final response
    # --------------------------------------------------

    return {

        "score":
            score,

        "risk":
            risk,

        "confidence":
            round(confidence, 2),

        "recommendation":
            int(recommendation),

        "interest_rate":
            interest_rate,

        "default_probability":
            round(default_probability, 4),

        "model_prediction":
            int(prediction),

        "feature_importance":
            feature_importance,

        "shap_explanation":
            shap_explanation
    }