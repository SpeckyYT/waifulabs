const fetch = require('./fetch');
const {
    resolveSeeds,
    handleSeeds,
    resolveStep,
    resolveProduct,
    isValidSeed,
    randomSeed
} = require('./util');

class Waifu {
    constructor(waifu = {}){
        this.seeds = waifu.seeds || Array(17).fill(0);
        this.image = waifu.image || waifu.girl || '';
    }
}

const WaifuLabs = {
    async generateWaifus (data, step) {
        const resolvedStep = resolveStep(step);
        return fetch('generate',
            {
                step: resolvedStep,
                currentGirl: resolvedStep > 0 && handleSeeds(data),
            }
        ).then(r => r.newGirls.map(w => new Waifu(w)));
    },
    async generateBigWaifu (data) {
        return fetch('generate_big',
            {
                currentGirl: handleSeeds(data),
            }
        ).then(r => new Waifu(r));
    },
    async generateProduct (data, product) {
        return fetch('generate_preview',
            {
                currentGirl: handleSeeds(data),
                product: resolveProduct(product),
            }
        ).then(r => new Waifu(r));
    },
    Waifu: Waifu,
    isValidSeed,
    randomSeed,
}

module.exports = WaifuLabs;
