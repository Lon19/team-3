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

def count_severities(scores, dates, bounds):
    mental_health_scores = {}
    for i, score in enumerate(scores):
        score = score * 2
        if score > bounds[0]:
            if 'Extremely' in mental_health_scores:
                if dates[i] in mental_health_scores['Extremely']:
                    mental_health_scores['Extremely'][dates[i]] = mental_health_scores['Extremely'][dates[i]] + 1
                else:
                    mental_health_scores['Extremely'][dates[i]] = 0
            else:
                mental_health_scores['Extremely'] = {}
                mental_health_scores['Extremely'][dates[i]] = 0
            continue
        if score > bounds[1]:
            if 'Severe' in mental_health_scores:
                if dates[i] in mental_health_scores['Severe']:
                    mental_health_scores['Severe'][dates[i]] = mental_health_scores['Severe'][dates[i]] + 1
                else:
                    mental_health_scores['Severe'][dates[i]] = 0
            else:
                mental_health_scores['Severe'] = {}
                mental_health_scores['Severe'][dates[i]] = 0
            continue
        if score > bounds[2]:
            if 'Moderate' in mental_health_scores:
                if dates[i] in mental_health_scores['Moderate']:
                    mental_health_scores['Moderate'][dates[i]] = mental_health_scores['Moderate'][dates[i]] + 1
                else:
                    mental_health_scores['Moderate'][dates[i]] = 0
            else:
                mental_health_scores['Moderate'] = {}
                mental_health_scores['Moderate'][dates[i]] = 0
            continue
        if score > bounds[3]:
            if 'Mild' in mental_health_scores:
                if dates[i] in mental_health_scores['Mild']:
                    mental_health_scores['Mild'][dates[i]] = mental_health_scores['Mild'][dates[i]] + 1
                else:
                    mental_health_scores['Mild'][dates[i]] = 0
            else:
                mental_health_scores['Mild'] = {}
                mental_health_scores['Mild'][dates[i]] = 0
            continue

        if 'Normal' in mental_health_scores:
            if dates[i] in mental_health_scores['Normal']:
                mental_health_scores['Normal'][dates[i]] = mental_health_scores['Normal'][dates[i]] + 1
            else:
                mental_health_scores['Normal'][dates[i]] = 0
        else:
            mental_health_scores['Normal'] = {}
            mental_health_scores['Normal'][dates[i]] = 0

    return mental_health_scores


mental_health = load_excel(r"data\wpforms-Autistica-8211-Mental-Health.xlsx", 'Mental health', convert_to_score)
columns = mental_health.columns
dates = mental_health['Date'].values.tolist()

def get_depression():
    depression_question_indexes = [3, 5, 10, 16, 17, 21]
    df = pd.DataFrame()
    for i in depression_question_indexes:
        df[columns[i - 1]] = mental_health[columns[i - 1]]

    return count_severities(df.sum(axis=1), dates, [27, 20, 13, 9])

def get_anxiety():
    anxiety_question_indexes = [2, 4, 7, 9, 15, 19, 20]
    df = pd.DataFrame()
    for i in anxiety_question_indexes:
        df[columns[i - 1]] = mental_health[columns[i - 1]]

    return count_severities(df.sum(axis=1), dates, [19, 14, 9, 7])

def get_stress():
    stress_question_indexes = [1, 6, 7, 11, 12, 14, 18]
    df = pd.DataFrame()
    for i in stress_question_indexes:
        df[columns[i - 1]] = mental_health[columns[i - 1]]

    return count_severities(df.sum(axis=1), dates, [33, 25, 18, 14])