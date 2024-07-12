// Your code here
// Function to create an employee record
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

// Function to create multiple employee records
const createEmployeeRecords = (arrays) => {
    return arrays.map(createEmployeeRecord);
};

// Function to create time in event
const createTimeInEvent = (employeeRecord, dateStamp) => {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
};

// Function to create time out event
const createTimeOutEvent = (employeeRecord, dateStamp) => {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
};

// Function to calculate hours worked on a given date
const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100; // Convert hour to decimal
};

// Function to calculate wages earned on a given date
const wagesEarnedOnDate = (employeeRecord, date) => {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
};

// Function to calculate all wages for an employee
const allWagesFor = (employeeRecord) => {
    const dates = employeeRecord.timeInEvents.map(e => e.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
};

// Function to calculate total payroll for all employees
const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
};

