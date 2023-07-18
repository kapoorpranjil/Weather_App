const temperatureField = document.querySelector(".weather1")
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 img")
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".searchField")
const form = document.querySelector("form")

let target = "lucknow"

const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=1c15740017bb4bc2bc8140418232701&q=${target}`


        const response = await fetch(url)
        const data = await response.json()

        const {
            current: { temp_c,
                condition: { text, icon }
            },
            location: { name, localtime },
        } = data

        updateDom(temp_c, name, localtime, icon, text)
    } catch (error) {
        alert("Location Not Found")
    }

}

function updateDom(temperature, city, time, emoji, text) {
    temperatureField.innerText = `${temperature}°`
    cityField.innerText = city
    const exactTime = time.split(" ")[1]
    const exactDate = time.split(" ")[0]
    const exactDay = new Date(exactDate).getDay()
    dateField.innerText = `${exactTime}-${getDayFullName(exactDay)} ${exactDate}`

    emojiField.src = emoji
    weatherField.innerText = text
}

fetchData(target)

function getDayFullName(num) {

    switch (num) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"

        default:
            return "Dont Know"
    }

}

const search = (e) => {
    e.preventDefault()
    target = searchField.value
    fetchData(target)
}

form.addEventListener("submit", search)