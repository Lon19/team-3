import pandas as pd
from load_excel_into_df import load_excel

def convert_to_score(string):
    if string.lower() == "strongly disagree":
        return 1
    if string.lower() == "somewhat disagree":
        return 2
    if string.lower() == "somewhat agree":
        return 3
    if string.lower() == "strongly agree":
        return 4
    return string

organisational_answers = load_excel(r"data\wpforms-Autistica-8211-Organisational-Culture.xlsx", 'Organisational culture', convert_to_score)
length = len(organisational_answers.columns)
columns = organisational_answers.columns[3:length-1]
df = pd.DataFrame()
for column in columns:
    df[column] = organisational_answers[column]

scores = []

for score in df.sum(axis=1):
    scores.append(score / length)

print(scores)