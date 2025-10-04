//defines Item as either FileItem or FolderItem
export type FileType = 'pdf' | 'doc' | 'csv' | 'mov'; 
export type FileItem = { type: FileType; name: string; added: string };
export type FolderItem = { type: 'folder'; name: string; files: Item[] };
export type Item = FileItem | FolderItem;