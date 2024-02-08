import DogImage from "./DogImage.js";

export default class DogImageComponent extends DogImage {
    #parentContainer;

    constructor(parentContainer, dogBreed, dogImageUrl = '') {
        super(dogBreed, dogImageUrl);
        this.#parentContainer = parentContainer;
    }

    createUI() {
        this.fetchImage().then(() => {
            this.#parentContainer.innerHTML = '';
            this.createRandomizeButton();
            this.createHTMLBox();
        });
    }

    createHTMLBox() {
        const dogBox = document.createElement("figure");
        const dogImage = document.createElement("img")
        dogImage.src = this.image;
        dogBox.classList.add("dogbox");
        dogBox.appendChild(dogImage);
        this.#parentContainer.appendChild(dogBox);
    }

    createRandomizeButton() {
        const randomButton = document.createElement("button");
        randomButton.innerText = `Random ${this.breed} image!`;
        randomButton.addEventListener("click", (event) => {
            this.createUI();
        });
        this.#parentContainer.appendChild(randomButton);
    }
}