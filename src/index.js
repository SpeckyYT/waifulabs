const fetch = require('./fetch');

const errorUnex = "Unexpected Error occurred (parameters may be wrong)";
const errorSeeds = "No valid Waifu or Seeds provided";

const WaifuLabs = {
    async generateWaifus (data, step) {

        const object = {};

        object.step = Math.max(0, Math.min(3, step)) || 0;

        if(object.step > 0){
            object.currentGirl = data.seeds || data
            if(!this.isValidSeed(object.currentGirl)) throw new TypeError(errorSeeds);
        }

        return fetch('generate', object)
        .then(r => r.newGirls)
        .catch(() => {throw new Error(errorUnex)});

    },

    async generateBigWaifu (data) {

        const seeds = data.seeds || data;
        if(!this.isValidSeed(seeds)) throw new TypeError(errorSeeds);

        return fetch('generate_big', {currentGirl:seeds})
        .then(r => Object({image:r.girl,seeds:seeds}))
        .catch(() => {throw new Error(errorUnex)});

    },

    async generateProduct (data, product) {

        const seeds = data.seeds || data;
        if(!this.isValidSeed(seeds)) throw new TypeError(errorSeeds);

        let _product = (typeof product == 'string' ? product : '').toUpperCase();

        if(!['PILLOW','POSTER'].includes(_product)) _product = 'PILLOW';

        return fetch('generate_preview', {currentGirl:seeds,product:_product})
        .then(r => Object({image:r.girl,seeds:seeds}))
        .catch(() => {throw new Error(errorUnex)});
        
    },

    isValidSeed (seeds) {
        if(!Array.isArray(seeds)) return false;
        if(seeds.length < 17) return false;
        if(!seeds.slice(0,16).some(seed => isNaN(seed) || seed < 0 || !Number.isInteger(seed))) return true;
        return false;
    }
    
}

module.exports = WaifuLabs;
