function getTableChart(rowBqData){
  let countHeaders = 1
  let countRows = 1
  let sampleData = Charts.newDataTable()

  rowBqData.headers.forEach(column => {
    sampleData.addColumn(Charts.ColumnType.STRING, column)
    countHeaders++
    })
  rowBqData.rows.forEach(row =>  {
    sampleData.addRow(row)
    countRows++
  })
  
  let chartBuilder = Charts.newTableChart()
      .setDimensions( 300 + countHeaders * 50, 200 + countRows * 15)
      .setDataTable(sampleData.build());

  let chart = chartBuilder.build();
  return chart
}

/**
 * Column
 */
function getColumnChart(rowBqData){

  let countHeaders = 1
  let countRows = 1
  let sampleData = Charts.newDataTable()

  rowBqData.headers.forEach(column => {
    if (countHeaders === 1) {
      sampleData.addColumn(Charts.ColumnType.STRING, column)
    } else {
      sampleData.addColumn(Charts.ColumnType.NUMBER, column)
    }
    
    countHeaders++
  })

  rowBqData.rows.forEach(row =>  {
    sampleData.addRow(row)
    countRows++
  })

  let chart = Charts.newColumnChart()
      .setXAxisTitle(rowBqData.headers[0])
      .setDimensions(600 + countRows * 30,300 + countHeaders * 50)
      .setDataTable(sampleData)
      .build();
  return chart
}

/**
 * Area
 */
function getAreaChart(rowBqData){
    let countHeaders = 1
    let countRows = 1
    let sampleData = Charts.newDataTable()

    rowBqData.headers.forEach(column => {
      if (countHeaders === 1) {
        sampleData.addColumn(Charts.ColumnType.STRING, column)
      } else {
        sampleData.addColumn(Charts.ColumnType.NUMBER, column)
      }
      
      countHeaders++
    })

    rowBqData.rows.forEach(row =>  {
      sampleData.addRow(row)
      countRows++
    })

  var chart = Charts.newAreaChart()
      .setXAxisTitle(rowBqData.headers[0])
      .setDimensions(600 + countRows * 20,300 + countHeaders * 50 )
      .setDataTable(sampleData)
      .build();

      return chart
}

/**
 * Bar
 */
function getBarChart(rowBqData){
    let countHeaders = 1
    let countRows = 1
    let sampleData = Charts.newDataTable()

    rowBqData.headers.forEach(column => {
      if (countHeaders === 1) {
        sampleData.addColumn(Charts.ColumnType.STRING, column)
      } else {
        sampleData.addColumn(Charts.ColumnType.NUMBER, column)
      }
      
      countHeaders++
    })

    rowBqData.rows.forEach(row =>  {
      sampleData.addRow(row)
      countRows++
    })


 var chartBuilder = Charts.newBarChart()
     .setYAxisTitle(rowBqData.headers[0])
     .setDimensions(300 + countHeaders * 50,600 + countRows * 30)
     .setLegendPosition(Charts.Position.BOTTOM)
     .setDataTable(sampleData);

 var chart = chartBuilder.build();
 return chart
}

/**
 * Line
 */
function getLineChart(rowBqData){
    let countHeaders = 1
    let countRows = 1
    let sampleData = Charts.newDataTable()

    rowBqData.headers.forEach(column => {
      if (countHeaders === 1) {
        sampleData.addColumn(Charts.ColumnType.STRING, column)
      } else {
        sampleData.addColumn(Charts.ColumnType.NUMBER, column)
      }
      
      countHeaders++
    })

    rowBqData.rows.forEach(row =>  {
      sampleData.addRow(row)
      countRows++
    })

  var chartBuilder = Charts.newLineChart()
      .setXAxisTitle(rowBqData.headers[0])
      .setDimensions(600 + countRows * 20,300 + countHeaders * 50 )
      .setCurveStyle(Charts.CurveStyle.SMOOTH)
      .setPointStyle(Charts.PointStyle.MEDIUM)
      .setDataTable(sampleData);

  var chart = chartBuilder.build();
  return chart
}

/**
 * Pie
 */
function getPieChart(rowBqData){
    let countHeaders = 1
    let countRows = 1
    let sampleData = Charts.newDataTable()

    rowBqData.headers.forEach(column => {
      if (countHeaders === 1) {
        sampleData.addColumn(Charts.ColumnType.STRING, column)
      } else {
        sampleData.addColumn(Charts.ColumnType.NUMBER, column)
      }
      
      countHeaders++
    })

    rowBqData.rows.forEach(row =>  {
      sampleData.addRow(row)
      countRows++
    })

  var chartBuilder = Charts.newPieChart()
      .setTitle(rowBqData.headers[1])
      .setDimensions(600, 500)
      .set3D()
      .setDataTable(sampleData);

  var chart = chartBuilder.build();
  return chart
}

/**
 * Scatter
 */
function getScatterChart(rowBqData){
    let countHeaders = 1
    let countRows = 1
    let sampleData = Charts.newDataTable()

    rowBqData.headers.forEach(column => {
      if (countHeaders === 1) {
        sampleData.addColumn(Charts.ColumnType.NUMBER, column)
      } else {
        sampleData.addColumn(Charts.ColumnType.NUMBER, column)
      }
      
      countHeaders++
    })

    rowBqData.rows.forEach(row =>  {
      sampleData.addRow(row)
      countRows++
    })

var chartBuilder = Charts.newScatterChart()
    .setXAxisTitle( rowBqData.headers[0])
    .setYAxisTitle(rowBqData.headers[1])
    .setDimensions(600 + countRows * 10,300 + countHeaders * 50)
    .setLegendPosition(Charts.Position.NONE)
    .setDataTable(sampleData);

var chart = chartBuilder.build();
return chart
}

