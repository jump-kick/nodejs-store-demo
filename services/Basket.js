const DataService = require('./DataService');
const HttpError = require('../model/HttpError');

module.exports = class Basket {
    static #basket = new Map();

    static addToBasket(basketRequest) {

        this.#validateId(basketRequest.id);

        let count = this.#basket.get(basketRequest.id)

        if (count === undefined) {
            count = 0;
        }

        this.#basket.set(basketRequest.id, count + basketRequest.quantity);
        return this.getBasket();
    }

    static updateBasket(basketRequest){
        
        this.#validateId(basketRequest.id);
        this.#basket.set(basketRequest.id, basketRequest.quantity);
        return this.getBasket();

    }

    static getTotal() {
        let total = 0.0;

        for (const {id, quantity} of this.getBasket()) {
            const price = DataService.findProductById(id).price;
            total += (price * quantity);
        }

        return total;
    }

    /**
     * Gets the current basket as an array
     * @returns An array of tuples, where element 0 is the product id and element 1 is the quantity
     */
    static getBasket() {
        let basketArray = [];
        this.#basket.forEach((v, k) => {
            basketArray.push({ id: k, quantity: v });
        })
        return basketArray;
    }

    /**
     * Empties the basket
     */
    static empty(){
        this.#basket.clear();
    }

    static #validateId(id){
        if(!DataService.findProductById(id)){

            throw new HttpError("Cannot add invalid product to basket.", 400);
        }
    }
}