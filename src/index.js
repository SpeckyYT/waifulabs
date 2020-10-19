const fetch = require('./fetch');
const isSeed = require('./isValidSeed');
const errorUnex = "Unexpected Error occurred (parameters may be wrong)";
const errorSeeds = "No valid Waifu or Seeds provided";

const WaifuLabs = {
    generateWaifus: async (data, step) => {
        let object = {};
        object.step = Math.max(0, Math.min(3, step)) || 0;
        if(object.step > 0) object.currentGirl = data.seeds || data;
        return fetch('generate', object)
        .then(r => r.newGirls)
        .catch(() => new Error(errorUnex));
    },
    generateBigWaifu: async (data) => {
        const seeds = data.seeds || data;
        if(!isSeed(seeds)) throw new Error(errorSeeds);
        return fetch('generate_big', {currentGirl:seeds})
        .then(r => Object({image:r.girl,seeds:seeds}))
        .catch(() => new Error(errorUnex));
    },
    generateProduct: async (data, product) => {
        const seeds = data.seeds || data;
        if(!isSeed(seeds)) throw new Error(errorSeeds);
        let _product = (typeof product == 'string' ? product : '').toUpperCase();
        if(!['PILLOW','POSTER'].includes(_product)) _product = 'PILLOW';
        return fetch('generate_preview', {currentGirl:seeds,product:_product})
        .then(r => Object({image:r.girl,seeds:seeds}))
        .catch(() => new Error(errorUnex));
    }
}

module.exports = WaifuLabs;
