import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autocompletefilter'
})
export class AutocompletefilterPipe implements PipeTransform {

  transform(collection: any, value?: any): any {
    const result = [];

    if (!collection) {
      return [];
    } else if (!value || value === '' || value === 'undefined') {
      return collection;
    }

    collection.forEach(element => {
      if (element.shop.toLowerCase().includes(value.toLowerCase())) {
        result.push(element);
      }
    });
    return result;
  }

}

