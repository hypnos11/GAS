function highlight() {
  clearColumnS();
  boldMyWords()
}

// Borrowed from https://stackoverflow.com/questions/74380820/google-apps-script-automatic-specific-text-highlighter
function clearColumnS(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange("A3:A");
  // var background = '#99FF99';
  range.clear();
  // https://stackoverflow.com/questions/17560263/change-cell-background-color-onedit-based-on-value
  // range.setBackground(background);
}

function boldMyWords() {
  const red = SpreadsheetApp.newTextStyle().setForegroundColor('red').setBold(true).build();
  const bold = SpreadsheetApp.newTextStyle().setBold(true).build();
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getActiveSheet();
  const dsr = 3;
  const rg = sh.getRange(3, 1, sh.getLastRow() - dsr + 1, sh.getLastColumn());
  rg.clearFormat().setWrap(true);
  let vs = rg.getDisplayValues();
  let r = SpreadsheetApp.getUi().prompt('Enter words to search for separated by commas', SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);
  // let r = SpreadsheetApp.getActive().getRange("Sheet1!A1");
  // var r = SpreadsheetApp.getActive().getActiveRange().getA1Notation();
  if (r.getSelectedButton() == SpreadsheetApp.getUi().Button.OK) {
    let wordA = r.getResponseText().split(',');
    vs.forEach((r, i) => {
      r.forEach((c, j) => {
        let idxObj = { pA: [] };
        wordA.forEach(w => {
          let re = new RegExp('(\\W|^)' + w.trim().toLowerCase() + '(\\W|$)', 'g');
          let found = [...c.toLowerCase().matchAll(re)];
          found.forEach(f => {
            if (!idxObj.hasOwnProperty(w)) {
              idxObj[w] = [];
              idxObj[w].push((f.index > 0) ? f.index + 1 : f.index);
              idxObj.pA.push(w);
            } else {
              idxObj[w].push((f.index));
            }
          })
        });
        if (idxObj.pA.length > 0) {
          let cell = sh.getRange(i + dsr, j + 1);
          let val = SpreadsheetApp.newRichTextValue().setText(c);
          idxObj.pA.forEach((p, k) => {
            idxObj[p].forEach(idx => {
              val.setTextStyle(idx, idx + p.length, red);
              val.setTextStyle(idx, idx + p.length, bold);
            });
          });
          cell.setRichTextValue(val.build());
        }
      });
    });
  }
  ss.toast('Highlighting done!')
}
