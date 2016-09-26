/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 */
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 */
function onInstall(e) {
  onOpen(e);
}


/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('SOW')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(ui);
  file();
}
/**
* Replaces {{client}} {{date}} {{project}} {{integration}} {{location}}
*/

function main(client_actual,integration_actual,location_actual){
  var client_lv = "\{\{client\}\}";
  var date_lv = "\{\{date\}\}";
  var project_lv = "\{\{project\}\}";
  var integration_lv = "\{\{integration\}\}";
  var location_lv = "\{\{location\}\}";

  
  var body = DocumentApp.getActiveDocument().getBody();
  var heading = DocumentApp.getActiveDocument().getHeader();
  
  var project_num = DocumentApp.getActiveDocument().getName().split(' ')[0];
  var today = Utilities.formatDate(new Date(), "PST", "M/dd/yyyy");

  //checks the heading of the document
  if (heading !== null){
      if (heading.findText(date_lv)!== null){heading.replaceText(date_lv, today);}
      if (heading.findText(project_lv)!== null){heading.replaceText(project_lv, project_num);}
      if (heading.findText(client_lv)!== null){heading.replaceText(client_lv, client_actual);}
      //if (heading.findText(integration_lv)!== null){heading.replaceText(integration_lv, integration_actual);}
      //if (heading.findText(location_lv)!== null){heading.replaceText(location_lv, location_actual);}
  }
  
  //chcks the body of the document
  if (body !== null){
    if (body.findText(date_lv)!== null){body.replaceText(date_lv, today);}
    if (body.findText(project_lv)!== null){body.replaceText(project_lv, project_num);}
    if (body.findText(client_lv)!== null){body.replaceText(client_lv, client_actual);}
    if (body.findText(integration_lv)!== null){body.replaceText(integration_lv, integration_actual);}
    if (body.findText(location_lv)!== null){body.replaceText(location_lv, location_actual);}
  } 
  
}


//adds file to the Completed SOWs folder
//removes file from the templates folder
function file(){
  
 var file = DriveApp.getFileById(DocumentApp.getActiveDocument().getId());
 var completed = DriveApp.getFolderById("0B1T9Y1DTvgk9a0xONlQ5WEFFcU0");
 var templates = DriveApp.getFolderById("0B1T9Y1DTvgk9d0ZyeU5NZkNzSkU");
 completed.addFile(file);
 templates.removeFile(file);   

}

