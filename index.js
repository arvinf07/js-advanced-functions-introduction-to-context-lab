// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]){
  const empObj = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
  return empObj
}

function createEmployeeRecords(empRecords){
  return empRecords.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employeeRecord, dateStamp){
  let [date, hour] = dateStamp.split(' ')
  let newEvent = {
    type: 'TimeIn',
    hour: parseInt(hour),
    date
  }
  employeeRecord.timeInEvents.push(newEvent)
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
  let [date, hour] = dateStamp.split(' ')
  let newEvent = {
    type: 'TimeOut',
    hour: parseInt(hour),
    date
  }
  employeeRecord.timeOutEvents.push(newEvent)
  return employeeRecord
}

//Think about how to refactor
function hoursWorkedOnDate(empRecord, date){
  let timeIn = empRecord.timeInEvents.find(timeIn => {
    console.log(timeIn)
    return timeIn.date === date
  })
  let timeOut = empRecord.timeOutEvents.find(timeOut => {
    return timeOut.date === date
  })

  // timeIn = (timeIn.hour).toString()
  // timeOut = (timeOut.hour).toString()

  // timeIn = timeIn[1] != 0 ? timeIn.slice(0,2) : timeIn[0]
  // timeOut = timeOut[1] != 0 ? timeOut.slice(0,2) : timeOut[0]

  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(empRecord, date){
  return empRecord.payPerHour * hoursWorkedOnDate(empRecord, date)
}

function allWagesFor(empRecord){
  const payArr = empRecord.timeInEvents.map(event => {
    return wagesEarnedOnDate(empRecord, event.date)
  })
  return payArr.reduce(
    ( accumulator, currentValue ) => accumulator + currentValue,
    0
  )
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(srcArray){
  const payArr = srcArray.map(empObj => allWagesFor(empObj))
  return payArr.reduce(
    ( accumulator, currentValue ) => accumulator + currentValue,
    0
  )
}