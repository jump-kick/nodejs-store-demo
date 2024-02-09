//import DataService from "./DataService";

class Basket {
    static #basket = new Map();

    static addToBasket(basketRequest) {
        let count = this.#basket.get(basketRequest.id)

        if (count === undefined) {
            count = 0;
        }

        this.#basket.set(basketRequest.id, count + basketRequest.quantity);
        return this.getBasket();
    }

    // static getTotal() {
    //     let total = 0.0;

    //     for (const [product, quantity] of this.#basket) {
    //         total += (product.price * quantity)
    //     }

    //     return total;
    // }

    /**
     * Gets the current basket as an array
     * @returns An array of tuples, where element 0 is the product id and element 1 is the quantity
     */
    static getBasket() {
        const basketArray = [];
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
}

module.exports = Basket