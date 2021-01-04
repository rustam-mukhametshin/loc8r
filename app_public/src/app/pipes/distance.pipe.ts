import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(distance: number): string {

    const isNumeric = (n) => {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    if (distance && isNumeric(distance)) {
      let thisDistance = '0';
      let unit = 'm';

      if (distance > 1000) {

        distance = parseFloat(String(distance / 1000));

        thisDistance = distance.toFixed(1);

        unit = 'km';
      } else {
        thisDistance = Math
          .floor(distance)
          .toString();
      }

      return thisDistance + unit;
    }

    return '?';
  }
}
