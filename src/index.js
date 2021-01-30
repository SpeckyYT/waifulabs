const fetch = require('./fetch');
const {
    resolveSeeds,
    handleSeeds,
    resolveStep,
    resolveProduct,
    isValidSeed,
} = require('./util');

const errorUnex = "Unexpected Error occurred (parameters may be wrong)";

const WaifuLabs = {
    async generateWaifus (data, step) {
        const object = {
            step: resolveStep(step)
        };
        if(object.step > 0) object.currentGirl = handleSeeds(data);
        return fetch('generate', object)
        .then(r => r.newGirls.map(w => new this.Waifu(w)))
        .catch(() => {throw new Error(errorUnex)});
    },
    async generateBigWaifu (data) {
        const seeds = handleSeeds(data);
        return fetch('generate_big', { currentGirl:seeds })
        .then(r => new this.Waifu(r))
        .catch(() => {throw new Error(errorUnex)});
    },
    async generateProduct (data, product) {
        const seeds = handleSeeds(data);
        return fetch('generate_preview', { currentGirl:seeds, product:resolveProduct(product) })
        .then(r => new this.Waifu(r))
        .catch(() => {throw new Error(errorUnex)});
    },
    Waifu: class Waifu {
        constructor(waifu = {}){
            this.seeds = waifu.seeds || Array(17).fill(0);
            this.image = waifu.image || waifu.girl || '';
        }
    },
    isValidSeed,
}

module.exports = WaifuLabs;
