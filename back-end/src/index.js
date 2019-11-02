var express = require('express')
var router = express()
const API_PORT = 3000;
const app = express();

XLSX = require('xlsx');
csv = require('jquery-csv');

var workbook = XLSX.readFile(require('path').resolve(__dirname, 'wpforms-Autistica-8211-Organisational-Culture.xlsx'));
var csvOrgan = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
var dataOrgan = csv.toObjects(csvOrgan);

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
    for(i = 0; i < dataOrgan.length; i++){
        if(dataOrgan[i].Username === userid){
            var sum = 0;
            for(X in dataOrgan[i]){
                console.log(dataOrgan[i][X]);
                sum += makeNum(dataOrgan[i][X]);
            }
            sum = sum/7;
            result.push({date: dataOrgan[i].Date, number: sum});
        }
    }
    return res.json(result);
});

app.use("/", router);
app.disable("etag");

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}/`));