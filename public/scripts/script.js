let selectedOption;



const updateSelectedOption = (name, settings) => {
    const brightnessSection = document.getElementById("brightnessSection");
    const delaySection = document.getElementById("delaySection");
    const colorSection = document.getElementById("colorSection");
    
    selectedOption = name;
    console.log(selectedOption);

    brightnessSection.classList.add("hidden");
    delaySection.classList.add("hidden");
    colorSection.classList.add("hidden");

    if(settings.includes("brightness"))  brightnessSection.classList.remove("hidden");
    if(settings.includes("delay"))  delaySection.classList.remove("hidden");
    if(settings.includes("color"))  colorSection.classList.remove("hidden");

}
const updateSelectedStyle = (name) => {
    let selected = document.querySelector("div.option.selected");
    if(selected) selected.classList.remove("selected");
    document.querySelector(`div.option[data-name="${name}"]`).classList.add("selected");
    document.getElementById("selectedTitle").innerHTML = name;
}

const optionButtonClick = (event) => {
    const name = event.target.dataset.name;
    const settings = event.target.dataset.settings;

    updateSelectedStyle(name);

    updateSelectedOption(name, settings);
}

const optionSelectChange = (event) => {
    const name = event.target.value.split("-")[0];
    const settings = event.target.value.split("-")[1];

    updateSelectedStyle(name);

    updateSelectedOption(name, settings);
}


const render = () => {
    const putData = {
        "name": selectedOption,
        "hex": document.getElementById("colorInput").value,
        "brightness": document.getElementById("brightnessInput").value.split("#")[1],
        "colorType": "hex",
        "delay": document.getElementById("delayInput").value
    };
    fetch("/lights", {
        method: "PUT",
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(putData)
    });
}

const turnOff = () => {
    fetch("/kill", {method: "DELETE"});
}


const addEventListeners = () => {
    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", optionButtonClick);
    });

    document.getElementById("optionSelect").addEventListener("input", optionSelectChange);
    document.getElementById("renderBtn").addEventListener("click", render);
    document.getElementById("offBtn").addEventListener("click", turnOff);
}



addEventListeners();