function doPost(e){
  const sheet = SpreadsheetApp.getActive().getSheetByName("Rates");
  const d = JSON.parse(e.postData.contents);
  const now = Utilities.formatDate(new Date(),"Asia/Kolkata","dd MMM yyyy • hh:mm a");

  const last = {
    Gold: sheet.getRange("A2").getValue(),
    Silver: sheet.getRange("B2").getValue(),
    Copper: sheet.getRange("C2").getValue()
  };

  sheet.insertRowBefore(5);
  sheet.getRange("A5").setValue(now);
  sheet.getRange("B5").setValue(last.Gold);
  sheet.getRange("C5").setValue(last.Silver);
  sheet.getRange("D5").setValue(last.Copper);

  sheet.getRange("A2").setValue(d.gold);
  sheet.getRange("B2").setValue(d.silver);
  sheet.getRange("C2").setValue(d.copper);
  sheet.getRange("D2").setValue(now);

  return ContentService.createTextOutput("ok");
}

function doGet(){
  const s = SpreadsheetApp.getActive().getSheetByName("Rates");
  const history = [];

  for(let i=5;i<10;i++){
    history.push({
      date:s.getRange("A"+i).getValue(),
      Gold:{price:s.getRange("B"+i).getValue(),icon:""},
      Silver:{price:s.getRange("C"+i).getValue(),icon:""},
      Copper:{price:s.getRange("D"+i).getValue(),icon:""}
    });
  }

  return ContentService.createTextOutput(JSON.stringify({
    current:{
      Gold:{price:s.getRange("A2").getValue(),change:1},
      Silver:{price:s.getRange("B2").getValue(),change:-1},
      Copper:{price:s.getRange("C2").getValue(),change:0},
      updated:s.getRange("D2").getValue()
    },
    history:history,
    news:"Global bullion markets show mixed movement amid demand fluctuations."
  })).setMimeType(ContentService.MimeType.JSON);
}
