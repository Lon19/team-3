var express = require('express')
var router = express()

XLSX = require('xlsx');
csv = require('jquery-csv');

var workbook = XLSX.readFile(require('path').resolve(__dirname, 'wpforms-Autistica-8211-Mental-Health.xlsx'));
var csvMental = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
var dataMental = csv.toObjects(csvMental);

router.get("/getHistory/:username", (req, res) => {
    var res = [];
    for(X in dataMental){
        if(X.Username == username){
            var sum = 0; 
            for(Y in X){
                switch(Y){
                    case "strongly disagree":
                        sum += 1;
                        break;
                    case "somewhat disagree":
                        sum += 2;
                        break;
                    case "somewhat agree":
                        sum += 3;
                        break;
                    case "strongly agree":
                        sum += 4;
                        break;
                    default:
                        break;
                }
            }
            res.push = {date: X.Date, number: sum};
        }
    }
    return res;
});