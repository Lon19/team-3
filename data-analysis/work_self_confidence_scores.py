import pandas as pd
from load_excel_into_df import load_excel

def convert_to_score(string):
    if string.lower() == "not at all confident":
        return 1
    if string.lower() == "a little":
        return 2
    if string.lower() == "moderate":
        return 3
    if string.lower() == "a lot":
        return 4
    if string.lower() == "completely confident":
        return 5
    return string

self_confidence = load_excel(r"data\wpforms-Autistica-8211-Work-Self-Confidence.xlsx", "\"How rate your confidence...\"", convert_to_score)
columns = self_confidence.columns

def get_scores(indexes):
    df = pd.DataFrame()
    for i in indexes:
        df[columns[i - 1]] = self_confidence[columns[i - 1]]

    scores = []

    for score in df.sum(axis=1):
        scores.append(score / len(indexes))

    return scores


learning_question_indexes = [5, 13, 23, 26]
problem_solving_indexes = [10, 15, 16, 17, 22, 24]
pressure_indexes = [6, 11, 20, 28]
role_expectations_indexes = [1, 3, 9, 21]
teamwork_indexes = [2, 8, 14, 25]
sensitivity_indexes = [18, 27, 29, 30]
work_politcs_indexes = [4, 7, 12, 19]

print(get_scores(learning_question_indexes))
print(get_scores(problem_solving_indexes))
print(get_scores(pressure_indexes))
print(get_scores(role_expectations_indexes))
print(get_scores(teamwork_indexes))
print(get_scores(sensitivity_indexes))
print(get_scores(work_politcs_indexes))
