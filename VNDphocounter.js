// Get the input field element
const inputField = document.getElementById("from_amount");

// Add an event listener to detect changes in the input
inputField.addEventListener("input", checkInputValue);

function checkInputValue() {
    // Get the current value of the input field
    const inputValue = inputField.value;
    // get the image container
    const phoImage = document.getElementById("pho-counter");

    // clear any exsiting images
    phoImage.innerHTML = '';

    // Check if the value is greater or equal to 10
    if (inputValue >= 1 && inputValue <= 5) {
        for (let i = 0; i < inputValue; i++) {
        // create a new image element
        const img = document.createElement("img");
        img.src = "https://static.vecteezy.com/system/resources/previews/012/596/986/original/pho-food-illustration-from-vietnam-vector.jpg";
        img. width = 50;
        img.style.margin = "5px";
        // add the image to the container
        phoImage.appendChild(img);
    }} else if (inputValue == 0) {
        phoImage.textContent = ""
    } else {
        // create a new image element
        phoImage.textContent = "unlimited pho"
    }
}