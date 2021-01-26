const fetch = require('./fetch');

const errorUnex = "Unexpected Error occurred (parameters may be wrong)";
const errorSeeds = "No valid Waifu or Seeds provided";

const WaifuLabs = {
    async generateWaifus (data, step) {
        const object = {
            step: resolveStep(step)
        };
        if(object.step > 0){
            object.currentGirl = resolveWaifu(data);
            if(!this.isValidSeed(object.currentGirl)) throw new TypeError(errorSeeds);
        }

        return fetch('generate', object)
        .then(r => r.newGirls)
        .catch(() => {throw new Error(errorUnex)});
    },

    async generateBigWaifu (data) {
        const seeds = resolveWaifu(data);
        if(!this.isValidSeed(seeds)) throw new TypeError(errorSeeds);

        return fetch('generate_big', {currentGirl:seeds})
        .then(r => ({image:r.girl,seeds:seeds}))
        .catch(() => {throw new Error(errorUnex)});
    },

    async generateProduct (data, product) {
        const seeds = resolveWaifu(data);
        if(!this.isValidSeed(seeds)) throw new TypeError(errorSeeds);

        const _product = resolveProduct(product);

        return fetch('generate_preview', {currentGirl:seeds,product:_product})
        .then(r => ({image:r.girl,seeds:seeds}))
        .catch(() => {throw new Error(errorUnex)});
    },

    isValidSeed (seeds) {
        if(!Array.isArray(seeds)) return false;
        if(seeds.length < 17) return false;
        return seeds.slice(0,16).every(seed => {
            if(isNaN(seed)) return false;
            if(!Number.isInteger(seed)) return false;
            if(seed < 0) return false;
            if(seed >= 2**32) return false;
            return true;
        });
    }
}

function resolveWaifu (waifu) {
    if(!waifu) return;
    if(Array.isArray(waifu)) return waifu;
    if(typeof waifu == 'object') return resolveWaifu(waifu.seeds); 
}

const steps = {
    base: 0,
    color: 1,
    details: 2,
    pose: 3
}
function resolveStep (step) {
    if(typeof step == 'number'){
        if(Object.values(steps).includes(step)) return step;
    }else if(typeof step == 'string'){
        if(typeof steps[step] != 'undefined') return steps[step];
    }
    return 0;
}

const products = [
    'PILLOW',
    'POSTER'
]
function resolveProduct (product) {
    if(typeof product == 'string'){
        const prod = product.toUpperCase();
        if(products.includes(prod)) return prod;
    }
    return products[0];
}

module.exports = WaifuLabs;
