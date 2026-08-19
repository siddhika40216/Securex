import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score


# 1. Load dataset
df = pd.read_csv("cs-training.csv")

# 2. Remove unnecessary ID column
if "Unnamed: 0" in df.columns:
    df = df.drop("Unnamed: 0", axis=1)

# 3. Target
target = "SeriousDlqin2yrs"

X = df.drop(target, axis=1)
y = df[target]

# 4. Replace invalid infinite values
X = X.replace([float("inf"), float("-inf")], pd.NA)

# 5. Handle missing values
imputer = SimpleImputer(strategy="median")
X = imputer.fit_transform(X)

# 6. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 7. Train model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)

model.fit(X_train, y_train)

# 8. Predictions
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

# 9. Evaluation
accuracy = accuracy_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_prob)

print("Model Training Completed!")
print("Accuracy:", accuracy)
print("ROC-AUC:", auc)
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# 10. Save model + preprocessing
joblib.dump(model, "credit_model.pkl")
joblib.dump(imputer, "imputer.pkl")

print("\nSaved:")
print("credit_model.pkl")
print("imputer.pkl")