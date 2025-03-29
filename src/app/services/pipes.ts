import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'enumToArray',
    standalone: true
  })
  export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object) {
      return Object.values(data);
    }
  }