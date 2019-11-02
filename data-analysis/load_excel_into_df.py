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
        
def load_excel(file_name, sheet_name):   
    # mental_health = pd.read_excel(r"data\wpforms-Autistica-8211-Mental-Health.xlsx", 'Mental health')
    df = pd.read_excel(file_name, sheet_name)

    length = len(df.columns)
    columns = df.columns[3:length-2]
    columns_to_remove = [x for x in df.columns if x not in columns]

    for column in columns_to_remove:
        df = df.drop(column, axis=1)

    for column in columns:
        df[column] = df[column].apply(convert_to_score)
    
    return df
