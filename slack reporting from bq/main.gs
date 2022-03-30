function doGet(e) {
 
  addChartTypeMap('table',getTableChart)
  addChartTypeMap('column',getColumnChart)
  addChartTypeMap('area',getAreaChart)
  addChartTypeMap('bar',getBarChart)
  addChartTypeMap('line',getLineChart)
  addChartTypeMap('pie',getPieChart)
  addChartTypeMap('scatter',getScatterChart)
  Logger.log(chartTypeMap)

  const validateResult = validateURL(e)

  if(validateResult.error === undefined ) {
    
    let {bqTableName, chartType, slackChat, table} = validateResult
    let rowData = getBqData( datasetQuery + bqTableName + "\` LIMIT 100")    
    let chart = getChart(rowData, chartType.trim().toLowerCase())
    let chartFile = getChartImage(chart)
    let imgUrl = getChartImageUrl(chartFile)
    if (slackChat) {
      let res = []
      slackChat.forEach(chat => {
        res.push(sendChart( imgUrl, chat.trim().toLowerCase(), table.description))
      })
      return ContentService.createTextOutput(JSON.stringify(res))
    }
    return HtmlService.createHtmlOutput('<h3>' + table.description + '</h3><img src="' + imgUrl + '">')

  } else {
    return ContentService.createTextOutput(JSON.stringify(validateResult.error))
  }

}


function validateURL(e) {

  if (e.parameter.chartType === undefined || e.parameter.bqTableName  === undefined) {
    throw new Error('Please specify chartType and bqTableName on your request')
  }
  if (!chartTypeMap.hasOwnProperty(e.parameter.chartType.trim().toLowerCase())) {
    throw new Error(`Not exist ${e.parameter.chartType} type of chart rendering`)
  }  
  if (e.parameter.bqTableName ) {
    e.parameter.table = BigQuery.Tables.get(projectId, reportingDataset, e.parameters.bqTableName)
  } else {
    throw new Error('Please specify your table name')
  }
  if (e.parameter.table.numRows < 1 || e.parameter.table.numRows > 100 ) {
    throw new Error('Cant render ,the count of rows shoud be between 1 and 100')
  }
  if (e.parameter.slackChat && e.parameter.slackChat.length <=  4 ) {
    throw new Error('Please specify your slackChat parameter request')
  } else if (e.parameter.slackChat) {

    let chats = e.parameter.slackChat.split(',')
    e.parameter.slackChat = []
    chats.forEach(chat => {
      if (chat in slackChatList) {
        e.parameter.slackChat.push(chat)
      }
    })
    if(e.parameter.slackChat.length == 0) {
      throw new Error('Please specify your slackChat parameter request')
    } 
  }

  return e.parameter
}


function addChartTypeMap(chartType,callback){

  chartTypeMap[chartType] = callback
}


function getChart(dataTable, chartType) {

  return chartTypeMap[chartType](dataTable)
}

function getChartImage(chart) {

    let chartImg = chart.getAs('image/png')
    let date = Utilities.formatDate(new Date(), "GMT+3", "yyyy-MM-dd")
    chartImg.setName(date + '_chart_timestamp_' + Date.now())
    return  DriveApp.getFolderById(driveFolderId).createFile(chartImg)
}

function getChartImageUrl(file) {

    return "https://drive.google.com/uc?export=view&id=" + file.getId()
}

function sendChart(chartUrl, chat, titleText = undefined){

    const slackPayload = {
                                  blocks: [
                                    {
                                      type: "image",
                                      image_url: chartUrl,
                                      alt_text: "inspiration"
                                    }
                                  ]
                                }

    if (titleText) {

      slackPayload.blocks[0].title = {
				type: "plain_text",
				text: titleText,
				emoji: true
			}
    }


    let options = {
      method : 'post',
      contentType : 'application/x-www-form-urlencoded',
      payload : JSON.stringify(slackPayload)
    }
  let response = UrlFetchApp.fetch(slackChatList[chat], options)
  return response.getResponseCode() 

}


function getBqData(queryText) {
   // Cloud Platform project.

  let request = {
    query: queryText,
    useLegacySql: false
  };
  let queryResults = BigQuery.Jobs.query(request, projectId);
  let jobId = queryResults.jobReference.jobId;

  // Check on status of the Query Job.
  let sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  let resp = {}

  resp.headers = queryResults.schema.fields.map(function(field) {
      return field.name;
    });

  // Get all the rows of results.
  let rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }
  resp.rows = rows.map(row => {
    return row.f.map(f => f.v)
  })
  
  return resp

}
