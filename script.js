import {intervalToDuration} from 'date-fns';

const elem = {
    btn: document.querySelector('button'),

    form: document.querySelector('#myForm'),
    dayLabel: document.querySelector('label[for="day"]'),
    monthLabel: document.querySelector('label[for="month"]'),
    yearLabel: document.querySelector('label[for="year"]'),

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
   /*  e.preventDefault(); */
    const {day, month, year} = extractInputs()
    let isValidated = validateInputs(day, month, year);

    if(isValidated) {
        const age = calculateAge(day, month, year);
        displayAge(age);
    }
});

elem.form.addEventListener('submit', (e) => {
    e.preventDefault();
})

// =============== Extract =============== 
function extractInputs(){
    let day = elem.dayInput.value !== "" ? parseInt(elem.dayInput.value) : "";
    let month = elem.monthInput.value !== "" ? parseInt(elem.monthInput.value) : "";
    let year = elem.yearInput.value !== "" ? parseInt(elem.yearInput.value) : "";

    console.log(elem.dayInput.value, elem.monthInput.value, elem.yearInput.value);

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
    elem.dayLabel.classList.add("error");

    if(day === "") {
        elem.dayVldMsg.textContent = "This field is required"
        return false;
    } 
    
    if(isNaN(day)){
        elem.dayVldMsg.textContent = "Must be a valid day"
        return false;
    }

    if(day < 1 || day > 31) {
        elem.dayVldMsg.textContent = "Must be a valid day"
        return false;
    } 
   
    let date = new Date(year, month - 1, day);
    if(!(date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day)) {
        if(month && year) {
            elem.dayVldMsg.textContent = "Must be a valid date"
            return false;
        }
    }

    elem.dayVldMsg.textContent = "" 
    elem.dayLabel.classList.remove("error");
    return true;
}

function isValidMonth(month){
    elem.monthLabel.classList.add("error");

    if(month === "") {
        elem.monthVldMsg.textContent = "This field is required"
        return false;
    } 

    if(isNaN(month)){
        elem.monthVldMsg.textContent = "Must be a valid month"
        return false;
    }
    
    if (month < 1 || month > 12) {
        elem.monthVldMsg.textContent = "Must be a valid month"
        return false;
    }
    
    elem.monthVldMsg.textContent = ""
    elem.monthLabel.classList.remove("error");
    return true;
}


function isValidYear(day, month, year){
    elem.yearLabel.classList.add("error");

    if(year === "") {
        elem.yearVldMsg.textContent ="This field is required"
        return false;
    } 

    if(isNaN(year)){
        elem.yearVldMsg.textContent = "Must be a valid year"
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
    elem.yearLabel.classList.remove("error");
    return true;
}

// =============== Calculate Age =============== 

function calculateAge(inputDay, inputMonth, inputYear){

    const pastDate = new Date(inputYear, inputMonth - 1 ,inputDay);
 /*    pastDate.setHours(0, 0, 0, 0);

    // Calculate difference in milliseconds
    const ageDiffInMilliseconds = currentDate.getTime() - pastDate.getTime();


     // Calculate whole years (consider average year length with leap years)
  const years = Math.floor(ageDiffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

   // Calculate remaining milliseconds after years are removed
   const remainingTime = ageDiffInMilliseconds % (1000 * 60 * 60 * 24 * 365.25);

   // Calculate whole months (consider 30 days per month on average)
   const months = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 30));
 
   // Calculate remaining milliseconds after months are removed
   const remainingDays = remainingTime % (1000 * 60 * 60 * 24 * 30);
 
   // Calculate whole days
   const days = Math.floor(remainingDays / (1000 * 60 * 60 * 24)); */



    /*

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
    
    */

    /* const ageYear = differenceInYears(currentDate, pastDate);
    const ageMonth = differenceInMonths(currentDate, pastDate);
    const ageDay = differenceInDays(currentDate, pastDate); */

    console.log(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate())
    const currentDate = new Date()
    console.log(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const { years = 0, months = 0, days = 0 } = intervalToDuration({ start: pastDate, end: new Date()});
    console.log(years, months, days)

/*     years = years ? years : 0;
    months = months ? months : 0;
    days = days ? days : 0 */



    //return results
    return { 
        year: years, 
        month: months, 
        day: days 
    } 
}

// ===============Display =============== 
const counter = {
    day: null,
    month: null,
    year: null
}

function displayAge(present){
    const past = getSpanContent();

    animateCount(past.day, present.day, elem.daySpan, "day");
    animateCount(past.month, present.month, elem.monthSpan, "month");
    animateCount(past.year, present.year, elem.yearSpan, "year");
}

function animateCount(from, to, span, key){
    let step = to > from ? 1 : -1;
    let interval = 10;

    console.log(counter[key])

    if(counter[key]) {
        clearInterval(counter[key]);
    }
    
    if (from === to) {
        span.textContent = from
        return;
    }

    counter[key] = setInterval(() => {
        from += step;
        span.textContent = from

        if(from === to){
            clearInterval(counter[key]);
        }
    }, interval)
}

function getSpanContent(){
    let day = isNaN(parseInt(elem.daySpan.textContent)) ? 0 : parseInt(elem.daySpan.textContent);
    let month = isNaN(parseInt(elem.monthSpan.textContent)) ? 0 : parseInt(elem.monthSpan.textContent);
    let year = isNaN(parseInt(elem.yearSpan.textContent)) ? 0 : parseInt(elem.yearSpan.textContent);
    
    return {day, month, year}
}