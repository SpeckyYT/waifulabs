const fetch = require('node-fetch');

const baseURL = "https://api.waifulabs.com/";

async function fetchWaifuLabs(endpoint, data){
    return await (await fetch(baseURL + endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    })).json();
}

class WaifuLabs {
    constructor(){
        this.generateWaifus = async (data, step = 0) => {
            let object = {}
            object.step = isNaN(step) && Math.max(0, Math.min(3, step)) == step ? 0 : step;
            if(object.step > 0){
                object.currentGirl = data.seeds || data
            }
            return (await fetchWaifuLabs('generate', object)).newGirls;
        };

        this.generateBigWaifu = async (data) => {
            const seeds = data.seeds || data;

            const image = (await fetchWaifuLabs('generate_big', {currentGirl: seeds})).girl;

            return {image: image, seeds: seeds} 
        };

        this.generateProduct = async (data, product) => {
            const seeds = data.seeds || data;

            let _product = (typeof product == 'string' ? product : '').toUpperCase();
            if(!['PILLOW','POSTER'].includes(_product)) _product = 'POSTER';

            const image = (await fetchWaifuLabs('generate_preview', {currentGirl: seeds, product: _product})).girl;

            return {image: image, seeds: seeds} 
        };
    }
}

module.exports = WaifuLabs;
