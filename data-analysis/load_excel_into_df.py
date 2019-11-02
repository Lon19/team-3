import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
        
def load_excel(file_name, sheet_name, convert_to_score):   
    # mental_health = pd.read_excel(r"data\wpforms-Autistica-8211-Mental-Health.xlsx", 'Mental health')
    df = pd.read_excel(file_name, sheet_name)

    tmp_df = pd.DataFrame()
    tmp_df['Date'] = df['Date']

    length = len(df.columns)
    columns = df.columns[3:length-2]
    columns_to_remove = [x for x in df.columns if x not in columns]

    for column in columns_to_remove:
        df = df.drop(column, axis=1)

    for column in columns:
        df[column] = df[column].apply(convert_to_score)
    
    df['Date'] = tmp_df['Date']

    return df
