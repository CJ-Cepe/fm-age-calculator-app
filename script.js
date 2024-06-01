const elem = {
    btn: document.querySelector('button'),

    form: document.querySelector('#myForm'),

    dayInput: document.querySelector('#day'),
    monthInput: document.querySelector('#month'),
    yearInput: document.querySelector('#year'),

    dayVldMsg: document.querySelector('#day + .vld-msg'),
    monthVldMsg: document.querySelector('#month + .vld-msg'),
    yearVldMsg: document.querySelector('#year + .vld-msg'),

    daySpan: document.querySelector('.days > span'),
    monthSpan: document.querySelector('.months > span'),
    yearSpan: document.querySelector('.years > span'),
}

const currentDate = new Date();
currentDate.setHours(0,0,0,0);

elem.btn.addEventListener('click', (e)=>{
    e.preventDefault();

    const {day, month, year} = extractInputs()
    let isValidated = validateInputs(day, month, year);

    if(isValidated) {
        const age = calculateAge(day, month, year);
        displayAge(age);
    }
});

// =============== Extract =============== 
function extractInputs(){
    const day = parseInt(elem.dayInput.value);
    const month = parseInt(elem.monthInput.value);
    const year = parseInt(elem.yearInput.value);

    return { day, month, year}
}

// =============== Validation =============== 

function validateInputs(day, month, year){
    //validate Date
    let a = isValidDay(day, month, year);
    let b = isValidMonth(month); 
    let c = isValidYear(day, month, year);
    
    return a && b && c;
}

function isValidDay(day, month, year){
    if(day === "") {
        elem.dayVldMsg.textContent = "This field is required"
        return false;
    } 
    
    if(day < 1 || day > 31) {
        elem.dayVldMsg.textContent = "Must be a valid day"
        return false;
    } 
   
    let date = new Date(year, month - 1, day);
    if(!(date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day)) {
        elem.dayVldMsg.textContent = "Must be a valid date"
        return false;
    }

    elem.dayVldMsg.textContent = "" 
    return true;
}

function isValidMonth(month){
    if(month === "") {
        elem.monthVldMsg.textContent = "This field is required"
        return false;
    } 
    
    if (month < 1 || month > 12) {
        elem.monthVldMsg.textContent = "Must be a valid month"
        return false;
    }
    
    elem.monthVldMsg.textContent = ""
    return true;
}


function isValidYear(day, month, year){

    if(year === "") {
        elem.monthVldMsg.textContent ="This field is required"
        return false;
    } 
    
    if (year < 1800) {
        elem.yearVldMsg.textContent ="Must be greater than 1800";
        return false;
    }

    if (year > 2024) {
        elem.yearVldMsg.textContent ="Must be in the past";
        return false;
    }

    let inputDate = new Date(year, month - 1, day);
    inputDate.setHours(0,0,0,0);
    if (inputDate > currentDate) {
        elem.dayVldMsg.textContent = "Date cannot be in the future";
        elem.monthVldMsg.textContent = "Date cannot be in the future";
        elem.yearVldMsg.textContent = "Date cannot be in the future";
        return false;
    }

    elem.yearVldMsg.textContent = ""
    return true;
}

// =============== Calculate Age =============== 

function calculateAge(inputDay, inputMonth, inputYear){

    const pastDate = new Date(inputYear, inputMonth - 1 ,inputDay);

    //compute day, month, year
    let ageYear = currentDate.getFullYear() - pastDate.getFullYear();
    let ageMonth = currentDate.getMonth() - pastDate.getMonth();
    let ageDay = currentDate.getDate() - pastDate.getDate();

    //adjust day, month, age
    if (ageDay < 0) {
        ageMonth--;
        ageDay += new Date(inputYear, inputMonth, 0).getDate();
    }

    if (ageMonth < 0) {
        ageYear--;
        ageMonth += 12;
    }

    //return results
    return {
        year: ageYear, 
        month: ageMonth, 
        day: ageDay
    }
}

// ===============Display =============== 

function displayAge(present){
    const past = {
        day: parseInt(elem.daySpan.textContent),
        month: parseInt(elem.monthSpan.textContent),
        year: parseInt(elem.yearSpan.textContent)
    }

    animateCount(past.day, present.day, elem.daySpan);
    animateCount(past.month, present.month, elem.monthSpan);
    animateCount(past.year, present.year, elem.yearSpan);
}

