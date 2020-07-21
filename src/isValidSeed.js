module.exports = (seeds) => {
    if(!Array.isArray(seeds)) return false;
    if(seeds.length !== 18) return false;

    function checkType(array, ...types){
        return types.every((t,i) => typeof (array)[i] == t);
    }
    
    if(checkType(seeds, ...Array(17).fill("number"), "object")){
        if(Array.isArray(seeds[17])){
            if(seeds[17].length !== 3) return false;
            return checkType(seeds[17], ...Array(3).fill("number"));
        }else{
            return false;
        }
    }
}
