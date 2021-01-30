const errorSeeds = "No valid Waifu or Seeds provided";

function resolveSeeds (waifu) {
    if(!waifu) return;
    if(isValidSeed(waifu)) return waifu;
    if(typeof waifu == 'object')
        for(const value of Object.values(waifu))
            if(resolveSeeds(value)) return value; 
    return null;
};

function handleSeeds (waifu) {
    const resolved = resolveSeeds(waifu);
    if(!resolved) throw new TypeError(errorSeeds);
    else return resolved;
}

const steps = {
    base: 0,
    color: 1,
    details: 2,
    pose: 3
};

function resolveStep (step) {
    if(typeof step == 'number'){
        if(Object.values(steps).includes(step)) return step;
    }else if(typeof step == 'string'){
        if(typeof steps[step] != 'undefined') return steps[step];
    }
    return 0;
};

const products = [
    'PILLOW',
    'POSTER'
];

function resolveProduct (product) {
    if(typeof product == 'string'){
        const prod = product.toUpperCase();
        if(products.includes(prod)) return prod;
    }
    return products[0];
};

function isValidSeed (seeds) {
    if(!Array.isArray(seeds)) return false;
    if(seeds.length < 17) return false;
    return seeds.slice(0,16).every(seed => {
        if(isNaN(seed)) return false;
        if(!Number.isInteger(seed)) return false;
        if(seed < 0) return false;
        if(seed >= 2**32) return false;
        return true;
    });
};

module.exports = {
    resolveSeeds,
    handleSeeds,
    steps,
    resolveStep,
    products,
    resolveProduct,
    isValidSeed,
}
