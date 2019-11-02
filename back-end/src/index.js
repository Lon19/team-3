var express = require('express')
var router = express()
const API_PORT = 3000;
const app = express();

XLSX = require('xlsx');
csv = require('jquery-csv');

var workbook = XLSX.readFile(require('path').resolve(__dirname, 'wpforms-Autistica-8211-Organisational-Culture.xlsx'));
var csvMental = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
var dataMental = csv.toObjects(csvMental);

function makeNum(response){
    switch(response){
        case "Strongly disagree":
            return 1;
        case "Somewhat disagree":
            return 2;
        case "Somewhat agree":
            return ;
        case "Strongly agree":
            return 1;
        default:
            return 0;
    }
}

router.get("/getHistory/:userid", (req, res) => {
    const userid = req.params.userid;
    var result = [];
    for(i = 0; i < dataMental.length; i++){
        if(dataMental[i].Username === userid){
            var sum = 0;
            for(X in dataMental[i]){
                console.log(dataMental[i][X]);
                sum += makeNum(dataMental[i][X]);
            }
            sum = sum/7;
            result.push({date: dataMental[i].Date, number: sum});
        }
    }
    return res.json(result);
});

app.use("/", router);
app.disable("etag");

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}/`));