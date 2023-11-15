const products = require('../data/products');

/**\
 * In lieu of a database, we are just using a simple, transient array as a 
 * data store for the application. This is for demo purposes only.
 */
class DataService {

    //For demo purposes only...in the real world, this is a database
    static #productList = [...products.productsArray];

    static getProducts() {

        return this.#productList;
    }

    static addProduct(product) {

        if (this.#productIsValid(product)) {
            product.id = this.#assignId(this.#productList);
            this.#productList.push(product);
        }
        return product;
    }

    static deleteProduct(product) {

        if (this.#productIsValid(product)) {
            let index = -1;
            let i = 0;

            while (i < this.#productList.length) {
                if (this.#productList[i].id === product.id) {
                    index = i;
                    break;
                } else {
                    i++;
                }
            }

            if (index > -1) {
                this.#productList.splice(index, 1);
            }
        }
        return product;
    }

    static #productIsValid(product) {
        const intRegex = /^\d+$/;
        if ((product.id == null || intRegex.test(product.id))
            && product.description != null
            && product.name != null
            && product.price != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Assigns a unique ID in sequence with the other IDs in the given array
     * @param {*} arr 
     */
    static #assignId(arr){

        let maxId = 0;

        arr.forEach(p => {
            if(p.id >= maxId){
                maxId = p.id + 1;
            }
        });

        return maxId;
    }
}

module.exports = DataService