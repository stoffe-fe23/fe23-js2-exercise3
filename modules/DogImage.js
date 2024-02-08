
export default class DogImage {
    #breed;
    #image;

    constructor(dogBreed, dogImageUrl = '') {
        this.#breed = dogBreed;
        this.#image = dogImageUrl;
    }

    async fetchImage() {
        const apiUrl = new URL(`https://dog.ceo/api/breed/${this.#breed}/images/random/1`);

        const response = await fetch(apiUrl);

        if (!response.ok)
            throw new Error(`${response.status} - ${response.statusText}`);


        const result = await response.json();

        this.#image = result.message[0];
        return this.#image;
    }

    get breed() {
        return this.#breed;
    }

    get image() {
        return this.#image;
    }
}