//to render sorted list by name or date
import type { Item } from './types';

//Return a new array sorted by 'name' or 'date'
export function sortItems(items: Item[], by: 'name' | 'date'): Item[] {
  const copy = [...items]; //avoid mutating callers data
  return copy.sort((a, b) => {
    if (by === 'name') return a.name.localeCompare(b.name);
    
    //Folders have no 'added': treat as '' so they sort before files
    const aDate = 'added' in a ? a.added : ''; // folders first
    const bDate = 'added' in b ? b.added : '';
    if (aDate === bDate) return a.name.localeCompare(b.name);
    return aDate.localeCompare(bDate); // ISO dates sort correctly as strings
  });
}
