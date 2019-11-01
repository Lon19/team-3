const router = express.Router();

router.get("/getHistroy/:username", async (req, res) => {
    var workbook = XLSX.readFile('file://C:/Users/Donal/Downloads/wpforms-Autistica-8211-Adjustments-10-29-2019.xlsx');
    var csv = XLSX.utils.sheet_to_csv(workbook.sheets[0]);
    var data = $.csv.toObjects(csv);
    return data;
});