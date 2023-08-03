const input = document.getElementById("input")
const plusButton = document.getElementById("plusButton")

input.addEventListener("submit",submitForm)
plusButton.addEventListener("click",submitForm)

function submitForm(e){
    e.preventDefault()
    console.log("kabullendi")
}