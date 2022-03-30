
Use cloud function to trigger then scheduled query completed.
scheduled query need to be started with **/* alertingURL<chartType=area&slackChat=chart_name> */**

async function sendChartToSlack(destination_table_name_template, query) {
  let alertingQuery = query.match(/.*alertingURL.*<\s*([a-zA-Z=\&\-\,\_]*)\s*>/)
  let url = CHART_RENDER_URL + '?bqTableName=' + destination_table_name_template + '&' + alertingQuery[1]
  let resp = await fetch(url)
  let respText = await resp.text()
  console.log(respText)
}
