type Seeds = [
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, [Number, Number, Number]
];
type Waifu = {
    image: String;
    seeds: Seeds;
};
type Waifus = [
    Waifu, Waifu, Waifu, Waifu,
    Waifu, Waifu, Waifu, Waifu,
    Waifu, Waifu, Waifu, Waifu,
    Waifu, Waifu, Waifu, Waifu
];
export function generateWaifus():Promise<Waifus>;
export function generateWaifus(data: Waifu|Seeds, step: 0|1|2|3):Promise<Waifus>;
export function generateBigWaifu(data: Waifu|Seeds):Promise<Waifu>;
export function generateProduct(data: Waifu|Seeds, product: "PILLOW" | "POSTER"):Promise<Waifu>;
export function isValidSeed(seeds: any):Boolean;
