const SHEET_NAME = "Production Data";

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok:true, message:"Packing Production API"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) sh = ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(["Timestamp","Date","Supervisor","Line","Shift","Operation",
                    "9:00-10:00","10:00-11:00","11:00-12:15","12:15-1:45",
                    "1:45-2:45","2:45-3:45","3:45-5:00","5:00-6:00",
                    "Total Qty","Target/Hour","Average/Hour","Remarks"]);
    }
    const q = (data.quantities || []).map(x => Number(x.qty)||0);
    const total = q.reduce((a,b)=>a+b,0);
    const active = q.filter(x=>x>0).length;
    const avg = active ? total/active : 0;
    sh.appendRow([new Date(),data.date||"",data.supervisor||"",data.line||"",data.shift||"",
                  data.operation||"",...q,total,Number(data.target)||0,avg,data.remarks||""]);
    return ContentService.createTextOutput(JSON.stringify({ok:true,total}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}