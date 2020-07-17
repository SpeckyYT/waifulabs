const WaifuLabs = require('.');
const waifulabs = new WaifuLabs();

async function draw(data){
    const img = Buffer.from(data, 'base64');
    console.log(await require('terminal-image').buffer(img));
}

(async function(){
    console.log("\nNORMAL WAIFU\n");
    const waifuNormalData = (await waifulabs.generateWaifus())[0];
    await draw(waifuNormalData.image);

    console.log("\nBIG WAIFU\n");
    const waifuBigData = await waifulabs.generateBigWaifu(waifuNormalData.seeds);
    await draw(waifuBigData.image);

    console.log("\nPRODUCT WAIFU\n");
    const waifuProductData = await waifulabs.generateProduct(waifuNormalData.seeds, "PILLOW");
    await draw(waifuProductData.image);
})()
