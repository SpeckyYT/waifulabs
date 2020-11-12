module.exports = (seeds) => {
    if(!Array.isArray(seeds)) return false;

    if(seeds.length < 17) return false;

    if(seeds.slice(0,16).every(seed => !isNaN(seed))) return true;

    return false;
}
