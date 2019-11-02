import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile

mental_health = pd.read_excel(r"data\wpforms-Autistica-8211-Mental-Health.xlsx", 'Mental health')

print(mental_health.head())

depression_scores = []

def convert_to_score(string):
    if string.lower() == "did not apply to me at all":
        return 0
    if string.lower() == "applied to me to some degree":
        return 1
    if string.lower() == "applied to me to a considerable degree":
        return 2
    if string.lower() == "applied to me very much":
        return 3
    return string
        
columns = mental_health.columns[3:-1]

for column in columns:
    mental_health[column] = mental_health[column].apply(convert_to_score)

print(mental_health.head())