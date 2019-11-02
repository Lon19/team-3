import mental_health_scores
import json

depression_scores = mental_health_scores.get_depression()

with open('depression_score_moderate.json', 'w') as f:
    if 'Normal' in depression_scores:
        json.dump(depression_scores['Normal'], f)

with open('depression_score_moderate.json', 'w') as f:
    if 'Mild' in depression_scores:
        json.dump(depression_scores['Mild'], f)

with open('depression_score_moderate.json', 'w') as f:
    if 'Moderate' in depression_scores:
        json.dump(depression_scores['Moderate'], f)

with open('depression_score_moderate.json', 'w') as f:
    if 'Severe' in depression_scores:
        json.dump(depression_scores['Severe'], f)

with open('depression_score_moderate.json', 'w') as f:
    if 'Extremely' in depression_scores:
        json.dump(depression_scores['Extremely'], f)