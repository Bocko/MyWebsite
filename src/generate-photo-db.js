import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const fullPath = './public/assets/imgs/';
const webPath = './assets/imgs/';
const thumbnailFolder = "thumbnail";
const outputFileName = 'img-list.json';

function scanFolder(folder)
{
    let imgList = [];

    const folderPath = path.join(fullPath, folder);
    fs.readdirSync(folderPath).forEach(item => {
        const pathedItem = path.parse(item);
        const originalPath = path.join(folderPath, item);

        if (!fs.statSync(originalPath).isDirectory() && pathedItem.ext != '.json')
        {
            const itemSplit = pathedItem.name.split('_');

            let img = {};
            img.path = path.join(webPath, folder, item);
            img.thumbnailPath = path.join(webPath, folder, thumbnailFolder, item);
            img.name = itemSplit[0];
            img.place = itemSplit[1];
            img.date = itemSplit[2];

            imgList.push(img);
        }
    });

    fs.writeFileSync(path.join(folderPath, outputFileName), JSON.stringify(imgList, null, 2));
}

function generateThumbnails(folder)
{
    const folderPath = path.join(fullPath, folder);
    const thumbnailFolderPath = path.join(folderPath, thumbnailFolder);

    if(!fs.existsSync(thumbnailFolderPath))
    {
        console.log("Thumbnail Folder does not exist! Creating it now.");
        fs.mkdirSync(thumbnailFolderPath);
    }

    fs.readdirSync(folderPath).forEach(item => {
        const pathedItem = path.parse(item);
        const originalPath = path.join(folderPath, item);

        if (!fs.statSync(originalPath).isDirectory() && pathedItem.ext != '.json')
        {
            const thumbnailPath = path.join(thumbnailFolderPath, item);

            console.log(originalPath);
            console.log(thumbnailPath);

            if(!fs.existsSync(thumbnailPath))
            {
                sharp(originalPath)
                .resize(300)
                .toFile(thumbnailPath, (err, info) => {
                    console.log(err);
                    console.log(info);
                });
            }
        }
    });
}

console.log('File lists generation started!');

scanFolder("planespotting");
scanFolder("other");

console.log('File lists generated successfully!');

console.log('Thumbnail generation started!');

generateThumbnails("planespotting");
generateThumbnails("other");

console.log('Thumbnail generated successfully!');