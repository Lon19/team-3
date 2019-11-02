var express = require('express');
const cors = require('cors');
var router = express()
const API_PORT = 8080;
const app = express();

app.use(cors());
XLSX = require('xlsx');
csv = require('jquery-csv');

var OrganWorkbook = XLSX.readFile(require('path').resolve(__dirname, 'wpforms-Autistica-8211-Organisational-Culture.xlsx'));
var csvOrgan = XLSX.utils.sheet_to_csv(OrganWorkbook.Sheets[OrganWorkbook.SheetNames[0]]);
var dataOrgan = csv.toObjects(csvOrgan);

function makeNum(response) {
    switch (response) {
        case "Strongly disagree":
            return 1;
        case "Somewhat disagree":
            return 2;
        case "Somewhat agree":
            return 3;
        case "Strongly agree":
            return 4;
        default:
            return 0;
    }
}

router.get("/getOrganHistoryScore/:userid", (req, res) => {
    const userid = req.params.userid;
    var result = [];
    for (i = 0; i < dataOrgan.length; i++) {
        if (dataOrgan[i].Username === userid) {
            var sum = 0;
            for (X in dataOrgan[i]) {
                sum += makeNum(dataOrgan[i][X]);
            }
            sum = sum / 7;
            result.push({ date: dataOrgan[i].Date, number: sum });
        }
    }
    return res.json(result);
});

var ConfWorkbook = XLSX.readFile(require('path').resolve(__dirname, 'wpforms-Autistica-8211-Work-Self-Confidence.xlsx'));
var csvConf = XLSX.utils.sheet_to_csv(ConfWorkbook.Sheets[ConfWorkbook.SheetNames[0]]);
var dataConf = csv.toObjects(csvConf);

function makeValue(response) {
    switch (response) {
        case "Not at all confident":
            return 1;
        case "A little":
            return 2;
        case "Moderate":
            return 3;
        case "A lot":
            return 4;
        case "Completely confident":
            return 5;
        default:
            return 0;
    }
}

router.get("/getConfidenceHistoryScore/:userid", (req, res) => {
    const userid = req.params.userid;
    var result = [];
    for (i = 0; i < dataConf.length; i++) {
        if (dataConf[i].Username === userid) {
            var Learning = 0;
            var ProblemSolving = 0;
            var Pressure = 0;
            var RoleExpectations = 0;
            var Teamwork = 0;
            var Sensitivity = 0;
            var WorkPolitics = 0;
            var ind = 0;
            for (X in dataConf[i]) {
                var numb = makeValue(dataConf[i][X]);
                if (ind === 7 || ind === 15 || ind === 25 || ind === 28) {
                    Learning += numb;
                }
                else if (ind === 12 || ind === 17 || ind === 18 || ind === 19 || ind === 24 || ind === 26) {
                    ProblemSolving += numb;
                }
                else if (ind === 6 || ind === 13 || ind === 22 || ind === 30) {
                    Pressure += numb;
                }
                else if (ind === 3 || ind === 5 || ind === 11 || ind === 23) {
                    RoleExpectations += numb;
                }
                else if (ind === 4 || ind === 10 || ind === 16 || ind === 27) {
                    Teamwork += numb;
                }
                else if (ind === 20 || ind === 29 || ind === 31 || ind === 32) {
                    Sensitivity += numb;
                }
                else if (ind === 6 || ind === 9 || ind === 14 || ind === 21) {
                    WorkPolitics += numb;
                }
                ind++;
            }

            result.push({
                date: dataConf[i].Date, sections: {
                    Learning: Learning / 4,
                    ProblemSolving: ProblemSolving / 6,
                    Pressure: Pressure / 4,
                    RoleExpectations: RoleExpectations / 4,
                    Teamwork: Teamwork / 4,
                    Sensitivity: Sensitivity / 4,
                    WorkPolitics: WorkPolitics / 4
                }
            });
        }
    }
    return res.json(result);
});

var MentalWorkbook = XLSX.readFile(require('path').resolve(__dirname, 'wpforms-Autistica-8211-Mental-Health.xlsx'));
var csvMental = XLSX.utils.sheet_to_csv(MentalWorkbook.Sheets[MentalWorkbook.SheetNames[0]]);
var dataMental = csv.toObjects(csvMental);

function makeRate(response) {
    switch (response) {
        case "Applied to me to some degree":
            return 1;
        case "Applied to me to a considerable degree":
            return 2;
        case "Applied to me very much":
            return 3;
        default:
            return 0;
    }
}

router.get("/getMentalHistoryScore/:userid", (req, res) => {
    const userid = req.params.userid;
    var result = [];
    for (i = 0; i < dataMental.length; i++) {
        if (dataMental[i].Username === userid) {
            var Depression = 0;
            var DepSev = "Normal";
            var Anxiety = 0;
            var AnxSev = "Normal";
            var Stress = 0;
            var StrSev = "Normal";
            var ind = 0;
            for (X in dataMental[i]) {
                var numb = makeRate(dataMental[i][X]);
                if (ind === 5 || ind === 7 || ind === 12 || ind === 18 || ind === 19 || ind === 23) {
                    Depression += numb;
                }
                else if (ind === 4 || ind === 6 || ind === 9 || ind === 11 || ind === 17 || ind === 21 || ind === 22) {
                    Anxiety += numb;
                }
                else if (ind === 3 || ind === 8 || ind === 10 || ind === 13 || ind === 14 || ind === 16 || ind === 20) {
                    Stress += numb;
                }
                ind++;
            }

            Depression *= 2;
            if (Depression > 28) {
                DepSev = "Extreme";
            }
            else if (Depression > 21) {
                DepSev = "Severe";
            }
            else if (Depression > 14) {
                DepSev = "Moderate";
            }
            else if (Depression > 10) {
                DepSev = "Mild";
            }

            Anxiety *= 2;
            if (Anxiety > 20) {
                AnxSev = "Extreme";
            }
            else if (Anxiety > 15) {
                AnxSev = "Severe";
            }
            else if (Anxiety > 10) {
                AnxSev = "Moderate";
            }
            else if (Anxiety > 8) {
                AnxSev = "Mild";
            }

            Stress *= 2;
            if (Stress > 20) {
                StrSev = "Extreme";
            }
            else if (Stress > 15) {
                StrSev = "Severe";
            }
            else if (Stress > 10) {
                StrSev = "Moderate";
            }
            else if (Stress > 8) {
                StrSev = "Mild";
            }

            result.push({
                date: dataMental[i].Date, sections: {
                    Depression: {
                        Score: Depression,
                        Severity: DepSev
                    },
                    Anxiety: {
                        Score: Anxiety,
                        Severity: AnxSev
                    },
                    Stress: {
                        Score: Stress,
                        Severity: StrSev
                    }
                }
            });
        }
    }
    return res.json(result);
});

var AdjWorkbook = XLSX.readFile(require('path').resolve(__dirname, 'wpforms-Autistica-8211-Adjustments.xlsx'));
var csvAdj = XLSX.utils.sheet_to_csv(AdjWorkbook.Sheets[AdjWorkbook.SheetNames[0]]);
var dataAdj = csv.toObjects(csvAdj);

router.get("/getAdjusmentsHistory/:userid", (req, res) => {
    const userid = req.params.userid;
    var result = [];
    for (i = 0; i < dataAdj.length; i++) {
        if (dataAdj[i].Username === userid) {
            var data = dataAdj[i];
            delete data.FormName;
            delete data.FormFreq;
            delete data.Username;
            delete data.ID;
            result.push({ GenInfo: data });
        }
    }
    return res.json(result);
});

app.use("/", router);
app.disable("etag");

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}/`));