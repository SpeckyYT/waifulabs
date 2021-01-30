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


### generateWaifus([waifu, step]) [async]

This method will request the WaifuLabs API to generate 16 waifus inspired by the original one.
The resolution of images of the waifus obtained by this method will be 200x200.
The "step" parameter, is a number from 0 to 3 or a string which defines what you want to change of a specific waifu.
```
0 / base
1 / color
2 / details
3 / pose
```
Note: Step 0 ignores the input waifu.
Note: This method doesn't obtain anything directly related to the input seed.


### generateBigWaifu(waifu) [async]

This method will generate a 400x400 image of the input waifu. `waifu.image`


### generateProduct(waifu[, product]) [async]

This method will generate a product image of the input waifu. `waifu.image`
Available products: `PILLOW` and `POSTER` (default: `PILLOW`).


### isValidSeed(any)

This method checks if the input seed is valid.
The following criteria have to be met for a seed to be valid:
```diff
+ The seeds have to be an Array
+ The Array's size has to be equal or larger than 17 (from index 0 to index 16)
- (if longer than 17, the items after that will get ignored)
+ Any item of the Array must not be NaN
+ Every seed has to be a positive integer from 0 to 2^32-1 (4294967295)
```

## Waifu Class
| Property | Type   | Description                       |
|----------|--------|-----------------------------------|
| image    | String | The Waifu Image encoded in Base64 |
| seeds    | Array  | The Seeds for that specific Waifu |

# Examples

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
