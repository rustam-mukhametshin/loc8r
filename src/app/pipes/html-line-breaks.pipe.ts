import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlLineBreaks'
})
export class HtmlLineBreaksPipe implements PipeTransform {

  /**
   * Fix line breaks.
   *
   * @param value string
   */
  transform(value: string): string {
    return value.replace(/\\n/g, '<br/>');
  }

}
