function doGet(e) {
  let template = HtmlService.createTemplateFromFile("index")
  template.result = "判定結果"
  template.question = "「判定」をクリックすると、結果がここに表示されます。"

  return template.evaluate()

}
function doPost(e) {
  let question = e.parameter.question
  let endPoint = PropertiesService.getScriptProperties().getProperty("ENDPOINT")
  const requestPayload = {
    "question": question

  }
  const requestHeader = {
    "method": "POST",
    "payload": requestPayload,

  }
  let response = UrlFetchApp.fetch(endPoint, requestHeader)
  let template = HtmlService.createTemplateFromFile("index")
  const responseJson = JSON.parse(response)
  template.question = responseJson.text
  template.result = responseJson.category

  return template.evaluate()
}