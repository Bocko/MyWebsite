import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ExifReader from 'exifreader';
import latinize from 'latinize';


const fullPath = './public/assets/imgs/';
const webPath = './assets/imgs/';
const thumbnailFolder = "thumbnail";
const imgListOutputFileName = 'img-list.json';
const imgCategoriesOutputFileName = 'img-categories.json';

const slideNamePrefix = "pid-"

const thumbnailSize = 300;

function isValidImage(filePath)
{
    return !fs.statSync(filePath).isDirectory() && path.parse(filePath).ext != '.json';
}

function padDate(date)
{
    return date.toString().padStart(2, '0');
}

function cleanName(name)
{
    name = name.toLowerCase();
    name = name.replaceAll(/[?!(),]/g, "");
    name = name.replaceAll(/[ +]/g, "-");
    return slideNamePrefix + latinize(name);
}

function scanFolder(folderPath, folder)
{
    let imgList = [];

    fs.readdirSync(folderPath).forEach(item => 
    {
        const originalPath = path.join(folderPath, item);
        if (isValidImage(originalPath))
        {
            const pathedItem = path.parse(item);
            const splitName = pathedItem.name.split('_');

            const name = splitName[0];
            const location = splitName[1];
            let airline = "";
            let aircraft = "";
            if (splitName.length > 2)
            {
                airline = splitName[2];
                aircraft = splitName[3];
            }

            let img = {};
            img.path = path.join(webPath, folder, item);
            img.thumbnailPath = path.join(webPath, folder, thumbnailFolder, item);
            img.name = name;
            img.slideName = cleanName(name);
            img.location = location;
            img.airline = airline;
            img.aircraft = aircraft;

            // from exif data

            const exifTags = ExifReader.load(fs.readFileSync(originalPath));

            img.ISO = exifTags["ISOSpeedRatings"]?.description;
            img.shutterSpeed = exifTags["ExposureTime"]?.description;
            img.fStop = exifTags["FNumber"]?.description;
            img.focalLength = exifTags["FocalLength"]?.description;
            img.cameraMaker = exifTags["Make"]?.description;
            img.cameraModel = exifTags["Model"]?.description;
            img.lensMaker = exifTags["LensMake"]?.description;
            img.lensModel = exifTags["LensModel"]?.description;
            const date = new Date(exifTags["CreateDate"]?.description);
            const customDateFormat = `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(date.getDate())} ${padDate(date.getHours())}:${padDate(date.getMinutes())}:${padDate(date.getSeconds())}`
            img.date = customDateFormat;

            imgList.push(img);
        }
    });

    imgList = imgList.sort(function(x, y) 
    {
        return y.date.toString().localeCompare(x.date.toString());
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

    fs.readdirSync(folderPath).forEach(item => 
    {
        const originalPath = path.join(folderPath, item);

        if (isValidImage(originalPath))
        {
            const thumbnailPath = path.join(thumbnailFolderPath, item);

            if (!fs.existsSync(thumbnailPath))
            {
                sharp(originalPath)
                .resize(thumbnailSize)
                .toFile(thumbnailPath, (err, info) => 
                {
                    console.log(err);
                    console.log(info);
                });
            }
        }
    });
}

function scanFolders()
{
    let imgCategories = [];
    fs.readdirSync(fullPath).forEach(folderName => 
    {
        if (fs.statSync(path.join(fullPath, folderName)).isDirectory())
        {
            const folderPath = path.join(fullPath, folderName);
    
            console.log("Scanning folder for: " + folderName);
            const folderItems = scanFolder(folderPath, folderName);
            console.log("Scanning done.");
    
            console.log("Generating thumbnails for: " + folderName);
            generateThumbnails(folderPath);
            console.log("Thumbnail generation done.");
    
            fs.writeFileSync(path.join(fullPath, folderName.toLowerCase() + "-img-list" + '.json'), JSON.stringify(folderItems, null, 2));

            const category = {};
            category.name = folderName;
            category.count = folderItems.length;

            imgCategories.push(category);
        }
    })

    fs.writeFileSync(path.join(fullPath, imgCategoriesOutputFileName), JSON.stringify(imgCategories, null, 2));
}

scanFolders();