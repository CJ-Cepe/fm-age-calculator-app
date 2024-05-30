
const btn = document.querySelector('button')
const monthInput = document.querySelector('#month');

monthInput.addEventListener('change', ()=>{
    monthInput.value = monthInput.value;
})

/* const dayInput = document.querySelector('.day');
const monthInput = document.querySelector('.month');
const yearInput = document.querySelector('.year'); */

/* const years = document.querySelector('.years > span');
const months = document.querySelector('.months > span');
const days = document.querySelector('.days > span'); */


console.log("yup")

btn.addEventListener('click', (e)=> {
    e.preventDefault();
    //get input
        //validate
         // check input if not empty
    //compute
    //set change

    const input = getInput();
    const age = calculateAge(input.day, input.month, input.year);
    displayAge(age.day, age.month, age.year);
})

function displayAge(day="--", month="--", year="--"){
    const yearSpan = document.querySelector('.years > span');
    const monthSpan = document.querySelector('.months > span');
    const daySpan = document.querySelector('.days > span');
    
    yearSpan.textContent = day;
    monthSpan.textContent = month;
    yearSpan.textContent = year;
}

function getInput(){
    const dayInput = document.querySelector('#day');
    const monthInput = document.querySelector('#month');
    const yearInput = document.querySelector('#year');

    /* let convertedMonth = convertMonth(monthInput) */
    
    return {
        day: dayInput.value,
        month: monthInput.value,
        year: yearInput.value
    }
}

function convertMonth(month = ""){
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 
    'august', 'september', 'october', 'november', 'december'];

    const index = months.indexOf(month.toLowerCase());

    return index + 1;
}

function calculateAge(inputDay = 0, inputMonth = 0, inputYear = 0){

    const past = new Date(inputYear, inputMonth - 1 ,inputDay);
    const today = new Date();

    //compute day, month, year
    let ageYear = today.getFullYear() - past.getFullYear();
    let ageMonth = today.getMonth() - past.getMonth();
    let ageDay = today.getDate() - past.getDate();

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

    //handle negative valvs
}


//function calculate day




   /*  const pastDay = past.getDate();
    const pastMonth = past.getMonth();
    const pastYear = past.getFullYear();

   
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    //calculate year
    let ageYear = todayYear - pastYear;
    if (todayMonth < pastMonth || (todayMonth === pastMonth && todayDay < pastDay)) {
        ageYear--;
    }

    //calculate month
    let ageMonth = todayMonth - pastMonth;
    if (ageMonth < 0) {
        ageMonth += 12;
        ageYear--;
    }
    //calculate day
    let ageDay = todayDay - pastDay;
    if (ageDay < 0) {
      ageDay += 30;
      ageMonth--;
    }
 */