export interface PhotoListEntry {
    name : string;
    items : PhotoEntry[];
}

export interface PhotoEntry {
    path : string;
    thumbnailPath: string;
    name : string;
    place : string;
    date : string;
}
