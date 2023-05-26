const temprateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const form = document.querySelector("form");
const searchField = document.querySelector(".searchField");


let target = "delhi";

const fetchData = async (target) => {

    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=95f631aa6a9c4858b89160345232505&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();

        const { current: { temp_c, condition: { text, icon } },
            location: { name, localtime } } = data;

        updateDom(temp_c, name, localtime, icon, text)
    } catch (error) {
        alert("location not found");
    }
}

function updateDom(temperate, name, time, icon, text) {

    temprateField.innerText = temperate;
    cityField.innerText = name;
    emojiField.src = icon;


    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();

    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`;

    weatherField.innerText = text;
}

function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't know";
    }
}



fetchData(target);


const search = (e) => {
    e.preventDefault();
    target = searchField.value;
    console.log(target);
    fetchData(target);

}

form.addEventListener("submit", search)