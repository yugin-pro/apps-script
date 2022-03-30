
function main() {
  //const response = getHitsResponse()
  const response = getVisitsResponse()
// создать или перезаписать таблицу в бк
  const table =  rewriteTableBq(response)

  response.log_request.parts.forEach(part => {
    // получить данные в данной части
    // добавлять к этой таблице полученные значения частей
    // какая то проверка
    appendTableBq(getRequestPartData(part.part_number,response.log_request.request_id), table)
    Logger.log(`Part no ${part.part_number} loaded`)

  })
}

function rewriteTableBq(response) {
  let tableId = response.log_request.source + '_' + response.log_request.date1.replaceAll('-','')
  let fields = response.log_request.fields.map(field => {
    return {name: field.replaceAll(':','_'), type: 'STRING'}
  })
  try {
    BigQuery.Tables.remove(projectId,datasetId, tableId)
  } catch (err){
    Logger.log(err)
  }
  let table = {
    tableReference: {
      projectId: projectId,
      datasetId: datasetId,
      tableId: tableId
    },
    schema: {
      fields: fields
    }
  };
  return BigQuery.Tables.insert(table,projectId,datasetId)
}

function appendTableBq(data, table) {

const loadConfig = BigQuery.newJobConfigurationLoad()
  .setDestinationTable(table.tableReference)
  .setSourceFormat('CSV')
  .setAutodetect(false)
  .setWriteDisposition('WRITE_APPEND')
  .setCreateDisposition('CREATE_IF_NEEDED')
  .setFieldDelimiter('\t')


const jobConfig = BigQuery.newJobConfiguration().setLoad(loadConfig)   //.newJob().setConfiguration() //.setConfiguration(loadConfig)  

const job = BigQuery.Jobs.insert(BigQuery.newJob().setConfiguration(jobConfig), 'raiffeisen-owox', data);
  
}

function getRequestPartData(part, request_id) {
  const options = {
    'headers':{
      'Authorization' : 'OAuth ' + token
    }
};
return UrlFetchApp.fetch(`https://api-metrika.yandex.net/management/v1/counter/4392985/logrequest/${request_id}/part/${part}/download`, options);

}
