import { log } from 'console';
import fs from 'fs'
import path from 'path'

const planesPath = './public/assets/imgs/planespotting/';
const planesContentPath = './assets/imgs/planespotting/';
const othersPath = './public/assets/imgs/other/';
const othersContentPath = './assets/imgs/other/';
const outputFileName = 'img-list.json';

function scanFolder(folder, contentFolder) {
    let imgList = [];

    fs.readdirSync(folder).forEach(item => {
        const pathedItem = path.parse(item);
        if (pathedItem.ext != '.json')
        {
            const itemSplit = pathedItem.name.split('_');

            let img = {};
            img.path = path.join(contentFolder, item);
            img.name = itemSplit[0];
            img.place = itemSplit[1];
            img.date = itemSplit[2];

            imgList.push(img);
        }
    });
    
    return imgList;
}

console.log('Thumbnail generation started!');

console.log("TODO!");

console.log('Thumbnail generated successfully!');

console.log('File lists generation started!');

const planesList = scanFolder(planesPath, planesContentPath);
const othersList = scanFolder(othersPath, othersContentPath);
fs.writeFileSync(path.join(planesPath, outputFileName), JSON.stringify(planesList, null, 2));
fs.writeFileSync(path.join(othersPath, outputFileName), JSON.stringify(othersList, null, 2));

console.log('File lists generated successfully!');