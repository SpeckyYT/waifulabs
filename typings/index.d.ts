declare class WaifuLabs {
    constructor();
    generateWaifus():Promise<Waifus>;
    generateWaifus(data: Waifu|Seeds, step: 0|1|2|3):Promise<Waifus>;
    generateBigWaifu(data: Waifu|Seeds):Promise<Waifu>;
    generateProduct(data: Waifu|Seeds, product: "PILLOW" | "POSTER"):Promise<Waifu>;
}
type Seeds = [
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Array<Number>
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
export = WaifuLabs;
