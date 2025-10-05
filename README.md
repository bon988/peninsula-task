# Peninsula Documents — React + TypeScript (Vite)

A small single-page app to browse documents and folders from mock data.

## Implements (from the brief)
- Show list with **Type / Name / Date added**
- Indicate folders and make them **clickable**
- **Open a folder** to see its contents (breadcrumb + Back)
- **Sort** visible items by **name** or **date**
- **Peninsula-style** colours

---

## Getting started

**Requirements:** Node 18+ (tested on Node 22) and npm

```bash
npm install
npm run dev
```

Open the printed URL (e.g. http://localhost:5173).


## Project structure

```pgsql

src/
  App.tsx     # UI: breadcrumb/back, sort control, table
  App.css     # basic styles for controls/table
  data.ts     # mock data (Item[])
  path.ts     # getItemsAtPath(ROOT, path): navigate into folders
  types.ts    # FileItem | FolderItem | Item 
  utils.ts    # sortItems(items, 'name' | 'date')  (if kept separate)
```

## How it works (brief)

- **Data model**

```
type FileItem   = { type: 'pdf'|'doc'|'csv'|'mov'; name: string; added: string };
type FolderItem = { type: 'folder'; name: string; files: Item[] };
type Item = FileItem | FolderItem;
```

- **Navigation:** `path: string[]` tracks where we are (e.g. `[]`, `['Expenses']`).
`getItemsAtPath(ROOT, path)` walks folder names to return the items to show.

- **Sorting:** `sortBy: 'name' | 'date'` + pure helper `sortItems(here, sortBy)`.
Folders have no `added`, so in date mode they appear first. ISO date strings sort correctly via `localeCompare`.

- **React loop:** *state → derive → render → user click → update state → re-render.*

## Testing
**Note:** Due to time, tests are **not included** in this submission.

**If I had more time, I would add:**

- Unit tests
- One component test 


## Next steps (given more time)

- Filter: add filename search input


# Notes
I’m new to React + TypeScript. I referenced documentation/guidance to learn patterns and adapted them for this solution (styling, structure, and decisions are mine). 

# Preview
![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Voc2FkaXBtaTI5YmN6YXZxZjg4ZG9zdGhnNnppY2IwdXk1dDNybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CmaPuE5B078jng6HKs/giphy.gif)
