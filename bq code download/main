
function updateAllViewInformationTable() {
  let resp = {
    project: projectId,
    dataset: []
  }

  let datasetList = BigQuery.Datasets.list(projectId,{maxResults:500}).datasets
  datasetList.forEach( dataset => {
    let tableList = BigQuery.Tables.list(dataset.datasetReference.projectId,dataset.datasetReference.datasetId,{maxResults:1500}).tables
    if(tableList) {
        let uploadTableData = []
        let viewList = tableList.filter(t => t.type == 'VIEW')
      //resp.dataset.push({name:dataset.Id,tableList:tableList})
      viewList.forEach(table => {
        uploadTableData.push(BigQuery.Tables.get(table.tableReference.projectId,table.tableReference.datasetId,table.tableReference.tableId))
      })
      resp.dataset.push(
        {
          datasetId: dataset.id,
          tables: uploadTableData
        }
      )
    }
   
  }
    
  )

let uploadData = Utilities.newBlob(JSON.stringify(resp)) 

const loadConfig = BigQuery.newJobConfigurationLoad()
  .setDestinationTable({
      projectId: projectId,
      datasetId: datasetId,
      tableId: 'all_view_information'
    })
  .setSourceFormat('NEWLINE_DELIMITED_JSON')
  .setAutodetect(true)
  .setWriteDisposition('WRITE_TRUNCATE')
  .setCreateDisposition('CREATE_IF_NEEDED')


const jobConfig = BigQuery.newJobConfiguration().setLoad(loadConfig)   //.newJob().setConfiguration() //.setConfiguration(loadConfig)  

const job = BigQuery.Jobs.insert(BigQuery.newJob().setConfiguration(jobConfig), projectId, uploadData);

Logger.log(job)

}

function updateAllRoutineInformationTable() {
  let resp = {
    project: projectId,
    dataset: []
  }
let counterD = 0
let counterR = 0
  let datasetList = BigQuery.Datasets.list(projectId,{maxResults:500}).datasets
      datasetList.forEach( dataset => {
        
          let routinesList = BigQuery.Routines.list(dataset.datasetReference.projectId,dataset.datasetReference.datasetId,{maxResults:500}).routines
            if(routinesList) {
              let uploadRoutinesData = []
                routinesList.forEach(routine => {
                  counterR++
                  uploadRoutinesData.push(BigQuery.Routines.get(routine.routineReference.projectId,routine.routineReference.datasetId,routine.routineReference.routineId))
                })
                resp.dataset.push(
                  {
                    datasetId: dataset.Id,
                    routines: uploadRoutinesData
                  }
                )
            }       
        counterD++
        }  
      )

let uploadData = Utilities.newBlob(JSON.stringify(resp)) 

const loadConfig = BigQuery.newJobConfigurationLoad()
  .setDestinationTable({
      projectId: projectId,
      datasetId: datasetId,
      tableId: 'all_routine_information'
    })
  .setSourceFormat('NEWLINE_DELIMITED_JSON')
  .setAutodetect(true)
  .setWriteDisposition('WRITE_TRUNCATE')
  .setCreateDisposition('CREATE_IF_NEEDED')


const jobConfig = BigQuery.newJobConfiguration().setLoad(loadConfig)   //.newJob().setConfiguration() //.setConfiguration(loadConfig)  

const job = BigQuery.Jobs.insert(BigQuery.newJob().setConfiguration(jobConfig), projectId, uploadData);

Logger.log(' ' + counterD + ' ' + counterR)

}

function updateAllTableInformationTable() {
  let resp = {
    project: projectId,
    dataset: []
  }

  let datasets = BigQuery.Datasets.list(projectId,{maxResults:500}).datasets
  let datasetList = datasets.filter(ds => ds.id.match(/TRANSFER|CRM|RB_DS/g))
  datasetList.forEach( dataset => {
    let tableList = BigQuery.Tables.list(dataset.datasetReference.projectId,dataset.datasetReference.datasetId,{maxResults:500}).tables
    if(tableList) {
        let uploadTableData = []
        let viewList = tableList.filter(t => t.type == 'TABLE' )
      //resp.dataset.push({name:dataset.Id,tableList:tableList})
      viewList.forEach(table => {
        let tableData = BigQuery.Tables.get(table.tableReference.projectId,table.tableReference.datasetId,table.tableReference.tableId)
        delete tableData.schema
        delete tableData.tableReference
        uploadTableData.push(tableData)
      })
      resp.dataset.push(
        {
          datasetId: dataset.id,
          tables: uploadTableData
        }
      )
    }
   
  }
    
  )

let uploadData = Utilities.newBlob(JSON.stringify(resp)) 

const loadConfig = BigQuery.newJobConfigurationLoad()
  .setDestinationTable({
      projectId: projectId,
      datasetId: datasetId,
      tableId: 'all_table_information'
    })
  .setSourceFormat('NEWLINE_DELIMITED_JSON')
  .setAutodetect(true)
  .setWriteDisposition('WRITE_TRUNCATE')
  .setCreateDisposition('CREATE_IF_NEEDED')


const jobConfig = BigQuery.newJobConfiguration().setLoad(loadConfig)   //.newJob().setConfiguration() //.setConfiguration(loadConfig)  

const job = BigQuery.Jobs.insert(BigQuery.newJob().setConfiguration(jobConfig), projectId, uploadData);

Logger.log(job)

}

function updateTableList() {
  let resp = {
    project: projectId,
    dataset: []
  }

  let datasets = BigQuery.Datasets.list(projectId,{maxResults:500}).datasets
  let datasetList = datasets.filter(ds => ds.id.match(/TRANSFER|CRM|RB_DS/g))
  datasetList.forEach( dataset => {
    let tableList = BigQuery.Tables.list(dataset.datasetReference.projectId,dataset.datasetReference.datasetId,{maxResults:1500}).tables
    if(tableList) {
      resp.dataset.push(
        {
          datasetId: dataset.id,
          tables: tableList
        }
      )
    }
   
  }
    
  )

let uploadData = Utilities.newBlob(JSON.stringify(resp)) 

const loadConfig = BigQuery.newJobConfigurationLoad()
  .setDestinationTable({
      projectId: projectId,
      datasetId: datasetId,
      tableId: 'all_table_list_information'
    })
  .setSourceFormat('NEWLINE_DELIMITED_JSON')
  .setAutodetect(true)
  .setWriteDisposition('WRITE_TRUNCATE')
  .setCreateDisposition('CREATE_IF_NEEDED')


const jobConfig = BigQuery.newJobConfiguration().setLoad(loadConfig)   //.newJob().setConfiguration() //.setConfiguration(loadConfig)  

const job = BigQuery.Jobs.insert(BigQuery.newJob().setConfiguration(jobConfig), projectId, uploadData);

Logger.log(job)

}
