import DogImageComponent from "./modules/DogImageComponent.js";
// const apiUrl = new URL(`https://dog.ceo/api/breed/${inputBreed}/images/random/${inputCount}`);


fetchJSON("https://dog.ceo/api/breeds/list/all", buildDogBreedsMenu);


////////////////////////////////////////////////////////////////////////////////////////
// Submit-handler för filter-formuläret för hundar
document.querySelector("#dog-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const outputBox = document.querySelector("#dog-output");
    const inputBreed = document.querySelector("#dog-breed").value;

    if (inputBreed.length > 0) {
        // const apiUrl = new URL(`https://dog.ceo/api/breed/${inputBreed}/images/random/${inputCount}`);
        // fetchJSON(apiUrl, showDogs);
        const doggo = new DogImageComponent(outputBox, inputBreed.trim());
        doggo.createUI();
    }
});



////////////////////////////////////////////////////////////////////////////////////////
// Hämta och returnera data från API
async function fetchJSON(fetchURL, callbackFunc) {

    const response = await fetch(fetchURL);
    if (!response.ok)
        throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
    const result = await response.json();
    callbackFunc(result);

}

////////////////////////////////////////////////////////////////////////////////////////
// Skapa giltiga värden i dog breed select-menyn
function buildDogBreedsMenu(response) {
    const dogBreedSelect = document.querySelector("#dog-breed");
    const dogBreeds = response.message;

    if (response.status == "error") {
        throw new Error(response.message);
    }

    for (const dogBreed in dogBreeds) {
        const breedOption = document.createElement("option");
        breedOption.value = dogBreed;
        breedOption.innerText = dogBreed;
        dogBreedSelect.appendChild(breedOption);

        if (dogBreeds[dogBreed].length > 0) {
            for (const subBreed of dogBreeds[dogBreed]) {
                const subOption = document.createElement("option");
                subOption.value = `${dogBreed}/${subBreed}`;
                subOption.innerText = `${subBreed} ${dogBreed}`;
                dogBreedSelect.appendChild(subOption);
            }
        }
    }
}