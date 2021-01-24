# WaifuLabs

Unofficial wrapper for WaifuLabs.

## Installation

```
npm i --save waifulabs
```

## Methods
| Property         | Parameters                | Returns                   |
|------------------|---------------------------|---------------------------|
| generateWaifus   | [Waifu or Seeds, step]    | Promise[Array[16 Waifus]] |
| generateBigWaifu | Waifu or Seeds            | Promise[Waifu]            |
| generateProduct  | Waifu or Seeds[, product] | Promise[Waifu]            |
| isValidSeed      | any                       | Boolean                   |

## Waifu Object
| Property | Description                       |
|----------|-----------------------------------|
| image    | The Waifu Image encoded in Base64 |
| seeds    | The Seeds for that specific Waifu |

## Examples

```js
(async function(){
    // Setup the module
    const waifulabs = require('waifulabs');

    // Get some pretty waifus
    const waifus = await waifulabs.generateWaifus();

    // Extract one waifu
    const waifu = waifus[0];

    // Extract the image of the waifu
    const imageData = waifu.image;

    // Turn the Base64 image into a Buffer
    const image = Buffer.from(imageData, 'base64');

    // Use FS module and write the image to a file
    const fs = require('fs');
    fs.writeFile('waifu.png', image, console.error);

    /* Done! */
})()
```

```js
(async function(){
    // Setup the module
    const waifulabs = require('waifulabs');

    // Get some pretty waifus
    const waifus = await waifulabs.generateWaifus();

    // Extract one waifu
    const waifu = waifus[0];

    // Get the other waifu images
    const big = await waifulabs.generateBigWaifu(waifu);
    const pillow = await waifulabs.generateProduct(waifu, "PILLOW");
    const poster = await waifulabs.generateProduct(waifu, "POSTER");

    function save(waifu,name){
        // Extract the image of the waifu
        const imageData = waifu.image;

        // Turn the Base64 image into a Buffer
        const image = Buffer.from(imageData, 'base64');

        // Use FS module and write the image to a file
        const fs = require('fs');
        fs.writeFileSync(`${name}.png`, image);
    }
    
    save(big,'big');
    save(pillow,'pillow');
    save(poster,'poster');

    /* Done! */
})()
```
