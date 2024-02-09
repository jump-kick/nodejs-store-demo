const products = require('../data/products');
const deals = require('../data/deals');

/**\
 * In lieu of a database, we are just using a simple, transient array as a 
 * data store for the application. This is for demo purposes only.
 */
module.exports = class DataService {

    //For demo purposes only...in the real world, this is a database
    static #productList = [...products.load()];
    static #availableDealsList = [...deals.dealsArray];

    static getProducts() {

        return this.#productList;
    }

    /**
     * Add the product to the datastore; with an auto-generated id
     * @param {*} product 
     * @returns the product back with a positive id if successful, id: -1 if unsuccessful
     */
    static addProduct(product) {

        if (this.#productIsValid(product)) {
            product.id = this.#assignId(this.#productList);
            this.#productList.push(product);
        }else{//for invalid products, assigned ID is -1
            product.id = -1;
        }
        return product;
    }

    static deleteProduct(product) {

        if (this.#productIsValid(product)) {

            const index = this.#findProductIndex(product);

            if (index > -1) {
                this.#productList.splice(index, 1);
            }else{
                product.id = -1;
            }
        }
        return product;
    }

    /**
     * Any fields other than id are editable.
     * @param {*} product 
     */
    static editProduct(product){

        let returnObject = {
            status: 404
        };

        if (this.#productIsValid(product)) {

            const index = this.#findProductIndex(product);

            if(index > -1){

                this.#productList[index] = product;
                returnObject = product;
            }
        }else{
            returnObject = {
                status: 400
            };
        }

        return returnObject;
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
     * This function traverses the productList array looking for the given product's id.
     * It returns either the index if found, or -1 if not found.
     * @param {*} product 
     */
    static #findProductIndex(product){
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
        return index;
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

    /**
     * Returns all the available deals as an array
     */
    static getAvailableDeals(){
        return this.#availableDealsList;
    }

    /**
     * Finds a product by ID.  Returns the product or null if not found
     */
    static findProductById(id){

        let p = null;

        for(let i = 0; i < this.#productList.length; i++){
            if(this.#productList[i].id == id){
                p = this.#productList[i];
                break;
            }
        }

        return p;
    }

    /**
     * Reload the datastore from the file - nullifying any edits
     */
    static reload(){
        this.#productList = [...products.load()];
    }
}