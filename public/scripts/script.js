let selectedOption;



const updateSelectedOption = (name, settings) => {
    const brightnessSection = document.getElementById("brightnessSection");
    const delaySection = document.getElementById("delaySection");
    const colorSection = document.getElementById("colorSection");
    
    selectedOption = name;

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
}

const optionButtonClick = (event) => {
    const name = event.target.dataset.name;
    const settings = event.target.dataset.settings;
    console.log(event.target.dataset);

    updateSelectedStyle(name);

    updateSelectedOption(name, settings);
}

const render = () => {

}

const addEventListeners = () => {
    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", optionButtonClick);
    });

}



addEventListeners();