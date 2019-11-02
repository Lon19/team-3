import pandas as pd
from load_excel_into_df import load_excel

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

mental_health = load_excel(r"data\wpforms-Autistica-8211-Mental-Health.xlsx", 'Mental health', convert_to_score)
columns = mental_health.columns
depression_question_indexes = [3, 5, 10, 16, 17, 21]
df = pd.DataFrame()
for i in depression_question_indexes:
    df[columns[i - 1]] = mental_health[columns[i - 1]]

depression_scores = {}

for score in df.sum(axis=1):
    score = score * 2
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

anxiety_question_indexes = [2, 4, 7, 9, 15, 19, 20]
df = pd.DataFrame()
for i in anxiety_question_indexes:
    df[columns[i - 1]] = mental_health[columns[i - 1]]

anxiety_scores = {}

for score in df.sum(axis=1):
    score = score * 2
    if score > 19:
        if 'Extremely' in anxiety_scores:
            anxiety_scores['Extremely'] = anxiety_scores['Extremely'] + 1
        else:
            anxiety_scores['Extremely'] = 0
        continue
    if score > 14:
        if 'Severe' in anxiety_scores:
            anxiety_scores['Severe'] = anxiety_scores['Severe'] + 1
        else:
            anxiety_scores['Severe'] = 0
        continue
    if score > 9:
        if 'Moderate' in anxiety_scores:
            anxiety_scores['Moderate'] = anxiety_scores['Moderate'] + 1
        else:
            anxiety_scores['Moderate'] = 0
        continue
    if score > 7:
        if 'Mild' in anxiety_scores:
            anxiety_scores['Mild'] = anxiety_scores['Mild'] + 1
        else:
            anxiety_scores['Mild'] = 0
        continue

    if 'Normal' in anxiety_scores:
            anxiety_scores['Normal'] = anxiety_scores['Normal'] + 1
    else:
        anxiety_scores['Normal'] = 0

print(anxiety_scores)

stress_question_indexes = [1, 6, 7, 11, 12, 14, 18]
df = pd.DataFrame()
for i in stress_question_indexes:
    df[columns[i - 1]] = mental_health[columns[i - 1]]

stress_scores = {}

for score in df.sum(axis=1):
    score = score * 2
    if score > 33:
        if 'Extremely' in stress_scores:
            stress_scores['Extremely'] = stress_scores['Extremely'] + 1
        else:
            stress_scores['Extremely'] = 0
        continue
    if score > 25:
        if 'Severe' in stress_scores:
            stress_scores['Severe'] = stress_scores['Severe'] + 1
        else:
            stress_scores['Severe'] = 0
        continue
    if score > 18:
        if 'Moderate' in stress_scores:
            stress_scores['Moderate'] = stress_scores['Moderate'] + 1
        else:
            stress_scores['Moderate'] = 0
        continue
    if score > 14:
        if 'Mild' in stress_scores:
            stress_scores['Mild'] = stress_scores['Mild'] + 1
        else:
            stress_scores['Mild'] = 0
        continue

    if 'Normal' in stress_scores:
            stress_scores['Normal'] = stress_scores['Normal'] + 1
    else:
        stress_scores['Normal'] = 0

print(stress_scores)