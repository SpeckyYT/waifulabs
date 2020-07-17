declare class WaifuLabs {
    constructor():WaifuLabs;
    generateWaifus():Promise<WaifuLabs.Waifus>;
    generateBigWaifu(data:WaifuLabs.Waifu|WaifuLabs.Seeds):Promise<WaifuLabs.Waifu>
    generateProduct(data:WaifuLabs.Waifu|WaifuLabs.Seeds, product:"PILLOW"|"POSTER"):Promise<WaifuLabs.Waifu>
}

declare namespace WaifuLabs {
    export interface Seeds {
        [
            seed:Number, seed:Number, seed:Number, seed:Number,
            seed:Number, seed:Number, seed:Number, seed:Number,
            seed:Number, seed:Number, seed:Number, seed:Number,
            seed:Number, seed:Number, seed:Number, seed:Number,
            seed:Number, color:Array<Number>
        ]
    }
    export interface Waifu {
        image: String;
        seeds: Array<Number|Array<Number>>;
    }
    export interface Waifus {
        [
            WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu,
            WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu,
            WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu,
            WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu, WaifuLabs:Waifu
        ]
    }
}

export = WaifuLabs
