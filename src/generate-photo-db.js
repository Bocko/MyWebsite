import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ExifReader from 'exifreader';
import latinize from 'latinize';


const fullPath = './public/assets/imgs/';
const webPath = './assets/imgs/';
const thumbnailFolder = "thumbnail";
const outputFileName = 'img-list.json';

function isValidImage(filePath)
{
    return !fs.statSync(filePath).isDirectory() && path.parse(filePath).ext != '.json';
}

 function scanFolder(folderPath, folder)
{
    let imgList = [];

    fs.readdirSync(folderPath).forEach(item => {
        const originalPath = path.join(folderPath, item);
        if (isValidImage(originalPath))
        {
            const pathedItem = path.parse(item);
            const itemSplit = pathedItem.name.split('_');

            const exifTags = ExifReader.load(fs.readFileSync(originalPath));

            let img = {};
            img.path = path.join(webPath, folder, item);
            img.thumbnailPath = path.join(webPath, folder, thumbnailFolder, item);
            img.name = itemSplit[0];
            img.slideName = latinize(itemSplit[0].replaceAll(" ", "-").toLowerCase());
            img.location = itemSplit[1];

            // from exif data

            img.ISO = exifTags["ISOSpeedRatings"]?.description;
            img.shutterSpeed = exifTags["ExposureTime"]?.description;
            img.fStop = exifTags["FNumber"]?.description;
            img.focalLength = exifTags["FocalLength"]?.description;
            img.cameraMaker = exifTags["Make"]?.description;
            img.cameraModel = exifTags["Model"]?.description;
            img.lensMaker = exifTags["LensMake"]?.description;
            img.lensModel = exifTags["LensModel"]?.description;
            img.date = new Date(exifTags["CreateDate"]?.description).toLocaleString();

            imgList.push(img);
        }
    });

    return imgList
}

function generateThumbnails(folderPath)
{
    const thumbnailFolderPath = path.join(folderPath, thumbnailFolder);

    if (!fs.existsSync(thumbnailFolderPath))
    {
        console.log("Thumbnail Folder does not exist! Creating it now.");
        fs.mkdirSync(thumbnailFolderPath);
    }

    fs.readdirSync(folderPath).forEach(item => {
        const originalPath = path.join(folderPath, item);

        if (isValidImage(originalPath))
        {
            const thumbnailPath = path.join(thumbnailFolderPath, item);

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

function scanFolders()
{
    let imgFolderList = [];
    fs.readdirSync(fullPath).forEach(folder => {
        if (fs.statSync(path.join(fullPath, folder)).isDirectory())
        {
            const folderItem = {};
            folderItem.name = folder;
    
            const folderPath = path.join(fullPath, folder);
    
            console.log("Scanning folder for: " + folder);
            folderItem.items = scanFolder(folderPath, folder);
            console.log("Scanning done.");
    
            console.log("Generating thumbnails for: " + folder);
            generateThumbnails(folderPath);
            console.log("Thumbnail generation done.");
    
            imgFolderList.push(folderItem);
        }
    })

    imgFolderList.sort(function(x, y) {
        if(x.items.length < y.items.length)
        {
            return 1;
        }
        
        if(x.items.length > y.items.length)
        {
            return -1;
        }

        return 0;
    });

    fs.writeFileSync(path.join(fullPath, outputFileName), JSON.stringify(imgFolderList, null, 2));
}

scanFolders();