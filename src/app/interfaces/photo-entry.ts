export interface PhotoListEntry {
    name : string;
    items : PhotoEntry[];
}

export interface PhotoEntry {
    path: string;
    thumbnailPath: string;
    name: string;
    slideName: string;
    location: string;
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


export function getSelectedFilterField(field: string, photoEntry: PhotoEntry) : string
{
  switch (field)
  {
    case PhotoMetadata.NAME:
    {
      return photoEntry.name;
    }
    case PhotoMetadata.LOCATION:
    {
      return photoEntry.location;
    }
    case PhotoMetadata.ISO:
    {
      return photoEntry.ISO.toString();
    }
    case PhotoMetadata.SHUTTER_SPEED:
    {
      return photoEntry.shutterSpeed;
    }
    case PhotoMetadata.FSTOP:
    {
      return photoEntry.fStop;
    }
    case PhotoMetadata.FOCAL_LENGTH:
    {
      return photoEntry.focalLength;
    }
    case PhotoMetadata.CAMERA_MAKER:
    {
      return photoEntry.cameraMaker;
    }
    case PhotoMetadata.CAMERA_MODEL:
    {
      return photoEntry.cameraModel;
    }
    case PhotoMetadata.LENS_MAKER:
    {
      return photoEntry.lensMaker;
    }
    case PhotoMetadata.LENS_MODEL:
    {
      return photoEntry.lensModel;
    }
    case PhotoMetadata.DATE:
    {
      return photoEntry.date;
    }
    default:
    {
      return "";
    }
  }
}

export enum PhotoMetadata {
    NAME = "Name",
    LOCATION = "Location",
    ISO = "ISO",
    SHUTTER_SPEED = "Shutter Speed",
    FSTOP = "F-Stop",
    FOCAL_LENGTH = "Focal Length",
    CAMERA_MAKER = "Camera Maker",
    CAMERA_MODEL = "Camera Model",
    LENS_MAKER = "Lens Maker",
    LENS_MODEL = "Lens Model",
    DATE = "Date"
  }