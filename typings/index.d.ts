type Seeds = [
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, [Number, Number, Number]
];
class Waifu {
    image: String;
    seeds: Seeds;
};
type Waifus = [
    Waifu, Waifu, Waifu, Waifu,
    Waifu, Waifu, Waifu, Waifu,
    Waifu, Waifu, Waifu, Waifu,
    Waifu, Waifu, Waifu, Waifu
];
type Steps = 0 | 1 | 2 | 3 | 'base' | 'color' | 'details' | 'pose';
export function generateWaifus():Promise<Waifus>;
export function generateWaifus(data: Waifu|Seeds, step: Steps):Promise<Waifus>;
export function generateBigWaifu(data: Waifu|Seeds):Promise<Waifu>;
export function generateProduct(data: Waifu|Seeds, product: "PILLOW" | "POSTER"):Promise<Waifu>;
export function isValidSeed(seeds: any):Boolean;
export function randomSeed():Seeds;
export const Waifu:Waifu;
