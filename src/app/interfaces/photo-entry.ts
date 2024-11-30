export interface PhotoListEntry {
    name : string;
    items : PhotoEntry[];
}

export interface PhotoEntry {
    path: string;
    thumbnailPath: string;
    name: string;
    slideName: string;
    place: string;
    ISO: number;
    shutterSpeed: string;
    fStop: string;
    focalLength: string;
    cameraMaker: string;
    cameraModel: string;
    lensMaker: string;
    lensModel: string;
    date: string;
}
