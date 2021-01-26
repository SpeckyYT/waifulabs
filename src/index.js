const fetch = require('./fetch');
const {
    resolveSeeds,
    resolveStep,
    resolveProduct,
    isValidSeed,
} = require('./util');

const errorUnex = "Unexpected Error occurred (parameters may be wrong)";
const errorSeeds = "No valid Waifu or Seeds provided";

const WaifuLabs = {
    async generateWaifus (data, step) {
        const object = {
            step: resolveStep(step)
        };
        if(object.step > 0){
            object.currentGirl = resolveSeeds(data);
            if(!isValidSeed(object.currentGirl)) throw new TypeError(errorSeeds);
        }

        return fetch(
            'generate',
            object
        )
        .then(r => r.newGirls)
        .catch(() => {throw new Error(errorUnex)});
    },

    async generateBigWaifu (data) {
        const seeds = resolveSeeds(data);
        if(!isValidSeed(seeds)) throw new TypeError(errorSeeds);

        return fetch(
            'generate_big',
            {
                currentGirl:seeds,
            }
        )
        .then(r => ({image:r.girl,seeds:seeds}))
        .catch(() => {throw new Error(errorUnex)});
    },

    async generateProduct (data, product) {
        const seeds = resolveSeeds(data);
        if(!isValidSeed(seeds)) throw new TypeError(errorSeeds);

        const _product = resolveProduct(product);

        return fetch(
            'generate_preview',
            {
                currentGirl:seeds,
                product:_product,
            }
        )
        .then(r => ({image:r.girl,seeds:seeds}))
        .catch(() => {throw new Error(errorUnex)});
    },

    isValidSeed
}

module.exports = WaifuLabs;
