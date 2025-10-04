import type { Item, FolderItem } from './types';

// function getItemsAtPath: to loop through parameters, root and path to return value of Item (for loop, walks the folder names to return the current folders items )
export function getItemsAtPath(root: Item[], path: string[]): Item[] {
    // variable items set to root(mock data in data.ts)
  let items = root;
  // for loop
  for (const folderName of path) {
    const found = items.find(i => i.type === 'folder' && i.name === folderName);
    if (!found) return items; //if nothing is found, return root items
    items = (found as FolderItem).files; //go deeper and assign files to the found folder 'FolderItem' and assign to value items
  }
  return items; //return folder files
}