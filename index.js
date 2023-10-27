// Your code here
function createEmployeeRecord(array){
    const employeeRecord = {}
    employeeRecord.firstName = array[0]
    employeeRecord.familyName = array[1]
    employeeRecord.title = array[2]
    employeeRecord.payPerHour = array[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

function createEmployeeRecords(array){
    const records = []
    for(const element of array){
        records.push(createEmployeeRecord(element))
    }
    return records
}

function createTimeInEvent(employeeRecord, string){
    const timeEvent = {}
    timeEvent.type = "TimeIn"
    timeEvent.hour = parseInt(string.slice(11))
    timeEvent.date = string.slice(0, 10)
    employeeRecord.timeInEvents.push(timeEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, string){
    const timeEvent = {}
    timeEvent.type = "TimeOut"
    timeEvent.hour = parseInt(string.slice(11))
    timeEvent.date = string.slice(0, 10)
    employeeRecord.timeOutEvents.push(timeEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let num1 = 0
    let num2 = 0
    employeeRecord.timeInEvents.forEach(element => {
        if(element.date === date){
             num1 = element.hour/100
        }
    });
    /*for(const item of employeeRecord.timeInEvents){
        if(item.date === date) {
            num1 = item.hour/100
        } else {num1 = 0}
    }*/
    employeeRecord.timeOutEvents.forEach(element => {
        if(element.date === date){
             num2 = element.hour/100
        }
    });
    /*for(const item of employeeRecord.timeOutEvents){
        if(item.date === date) {
            num2 = item.hour/100
        } else {num2 = 0}
    }*/
    return num2 - num1
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const hrsPerDay = []
    for(const item of employeeRecord.timeInEvents){
        const date = item.date
        hrsPerDay.push(wagesEarnedOnDate(employeeRecord, date))
    }
    return hrsPerDay.reduce((accumulator, currentValue) => accumulator + currentValue)
}

function calculatePayroll(array){
    let allPay = []
    array.forEach(element => allPay.push(allWagesFor(element)))
    return allPay.reduce((accumulator, currentValue) => accumulator + currentValue)
}