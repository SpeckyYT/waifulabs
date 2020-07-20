const WaifuLabs = require('.');
const waifulabs = new WaifuLabs();

async function draw(data){
    console.log(await require('terminal-image').buffer(Buffer.from(data, 'base64')));
}

console.log("\nNORMAL WAIFU\n");
waifulabs.generateWaifus()
.then(async ([normalWaifu]) => {
    Promise.all([
        waifulabs.generateBigWaifu(normalWaifu),
        waifulabs.generateProduct(normalWaifu, "PILLOW"),
        draw(normalWaifu.image)
    ]).then(async ([bigWaifu, productWaifu]) => {
        console.log("\nBIG WAIFU\n")
        await draw(bigWaifu.image);
        console.log("\nPRODUCT WAIFU\n");
        await draw(productWaifu.image);
    })
})
