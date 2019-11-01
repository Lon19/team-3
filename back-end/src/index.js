const router = express.Router();

router.get("/getHistory/:username", async (req, res) => {
    var workbook = XLSX.readFile('wpforms-Autistica-8211-Mental-Health.xlsx');
    var csv = XLSX.utils.sheet_to_csv(workbook.sheets[0]);
    var data = $.csv.toObjects(csv);
    var res = [];
    var index = 0;

    for(X in data){
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