import './App.css' //css file
import { useState } from 'react'; //state
import { ROOT } from './data'; //mock data
import type { Item } from './types'; //FileItem | FolderItem
import { getItemsAtPath } from './path'; //function to find current folder and return folder items
import { sortItems } from './utils';

// holds path's state, renders breadcrumb back and table, updates path when you click on a folder and renders control for sorted list 
export default function App() {
  // where we are in the folder tree
  const [path, setPath] = useState<string[]>([]);
  // items at the current location
  const here: Item[] = getItemsAtPath(ROOT, path);
  // sort state + derived sorted list
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');
  const shown: Item[] = sortItems(here, sortBy);

  return (
    <div style={{ maxWidth: 800, margin: '3rem auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* --- App Heading --- */}
      <h1>Peninsula Documents</h1>
        {/* --- Breadcrumb / Back --- */}
      <div style={{ marginBottom: 12 }}>
        <span
          onClick={() => setPath([])}
          style={{ cursor: 'pointer', textDecoration: path.length ? 'underline' : 'none' }}
        >Home   {/* --- Home link --- */}
        </span>
        {path.map((folderName, i) => (
          <span key={folderName}>
            {' / '}
            <span
              onClick={() => i < path.length - 1 && setPath(path.slice(0, i + 1))}
              style={{
                cursor: i < path.length - 1 ? 'pointer' : 'default',
                textDecoration: i < path.length - 1 ? 'underline' : 'none',
              }}
            >
              {folderName}
            </span>
          </span>
        ))}
        {path.length > 0 && (
          <button style={{ marginLeft: 8 }} onClick={() => setPath(p => p.slice(0, -1))}>
            Back   {/* --- Back button--- */}
          </button>
        )}
      </div>
      {/* Control: Sort dropdown */}
      <div style={{ marginBottom: 8, display:'flex', alignItems:'center', gap:8, margin:'8px 0 10px' }}>
        <label>
          Sort by:&nbsp;
          <select style={{ marginBottom: 8, padding:'6px 10px', border:'1px solid #d0d7de', borderRadius:8, background:'#fff' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'date')}
          >
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
        </label>
      </div>
      <table style={{ width: '100%', borderRadius: '0.5em', borderCollapse: 'collapse', backgroundColor: '#edf4ff' }}>
        <thead>
          {/* --- Table Headings--- */}
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #3954e0' }}>
            <th style={{ padding: 15, textTransform: 'uppercase', fontWeight: '800'}}>Name</th>
            <th style={{ padding: 15, textTransform: 'uppercase', fontWeight: '800'}}>Type</th>
            <th style={{ padding: 15, textTransform: 'uppercase', fontWeight: '800'}}>Date added</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((it) => (
            <tr
              key={[...path, it.name].join('/')}
              onClick={() => it.type === 'folder' && setPath([...path, it.name])}
              style={{
                borderBottom: '1px solid #f3f3f3',
                cursor: it.type === 'folder' ? 'pointer' : 'default',
              }}
            >
              {/* --- Table Body Content--- */}
              <td style={{ padding: 15 }}>{it.name}</td>
              <td style={{ padding: 15, fontWeight: it.type === 'folder' ? 600 : 400 }}>{it.type === 'folder' ? (<span className= "folder-hover">📁 folder</span>) : (it.type)}</td>
              <td style={{ padding: 15 }}>{'added' in it && it.added ? new Date(it.added).toLocaleDateString('en-GB') : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {shown.length === 0 && <p>No items here.</p>}
    </div>
  );
}

