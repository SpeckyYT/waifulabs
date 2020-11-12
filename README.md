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

## Waifu Object
| Property | Description                       |
|----------|-----------------------------------|
| image    | The Waifu Image encoded in Base64 |
| seeds    | The Seeds for that specific Waifu |

## Examples

### Async/Await

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

### Promises

```js
// Setup the module
const waifulabs = require('waifulabs');

// Get some pretty waifus
waifulabs.generateWaifus()
.then(function(waifus){
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
})
```

### Get Big and Product Waifu Image

```js
const waifulabs = require('waifulabs');

const fs = require('fs');

waifulabs.generateWaifus()
.then(function(waifus){
    const waifu = waifus[0];

    const image = Buffer.from(waifu.image, 'base64');
    fs.writeFile('waifu.png', image, console.error);

    return waifulabs.generateBigWaifu(waifu);
})
.then(function(waifu){
    const image = Buffer.from(waifu.image, 'base64');
    fs.writeFile('waifuBig.png', image, console.error);

    return waifulabs.generateProduct(waifu, "PILLOW");
})
.then(function(waifu){
    const image = Buffer.from(waifu.image, 'base64');
    fs.writeFile('waifuProductPillow.png', image, console.error);

    return waifulabs.generateProduct(waifu, "POSTER");
})
.then(function(waifu){
    const image = Buffer.from(waifu.image, 'base64');
    fs.writeFile('waifuProductPoster.png', image, console.error);
})
```
