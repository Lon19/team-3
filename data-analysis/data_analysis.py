import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile

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
        
        
mental_health = pd.read_excel(r"data\wpforms-Autistica-8211-Mental-Health.xlsx", 'Mental health')

length = len(mental_health.columns)
columns = mental_health.columns[3:length-2]
columns_to_remove = [x for x in mental_health.columns if x not in columns]

for column in columns_to_remove:
    mental_health = mental_health.drop(column, axis=1)

for column in columns:
    mental_health[column] = mental_health[column].apply(convert_to_score)

depression_question_indexes = [3, 5, 10, 16, 17, 21]
df = pd.DataFrame()
for i in depression_question_indexes:
    df[columns[i - 1]] = mental_health[columns[i - 1]]

depression_scores = {}

for i, score in enumerate(df.sum(axis=1)):
    if score > 27:
        if 'Extremely' in depression_scores:
            depression_scores['Extremely'] = depression_scores['Extremely'] + 1
        else:
            depression_scores['Extremely'] = 0
        continue
    if score > 20:
        if 'Severe' in depression_scores:
            depression_scores['Severe'] = depression_scores['Severe'] + 1
        else:
            depression_scores['Severe'] = 0
        continue
    if score > 13:
        if 'Moderate' in depression_scores:
            depression_scores['Moderate'] = depression_scores['Moderate'] + 1
        else:
            depression_scores['Moderate'] = 0
        continue
    if score > 9:
        if 'Mild' in depression_scores:
            depression_scores['Mild'] = depression_scores['Mild'] + 1
        else:
            depression_scores['Mild'] = 0
        continue

    if 'Normal' in depression_scores:
            depression_scores['Normal'] = depression_scores['Normal'] + 1
    else:
        depression_scores['Normal'] = 0

print(depression_scores)