import './App.css' //css file
import { useState } from 'react'; //state
import { ROOT } from './data'; //mock data
import type { Item } from './types'; //FileItem | FolderItem
import { getItemsAtPath } from './path'; //function to find current folder and return folder items

// holds path's state, renders breadcrumb and table and updates path when you click on a folder
export default function App() {
  const [path, setPath] = useState<string[]>([]);
  const here: Item[] = getItemsAtPath(ROOT, path);
  return (
    <div style={{ maxWidth: 800, margin: '3rem auto', fontFamily: 'system-ui, sans-serif' }}>
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
          {here.map((it) => (
            <tr
              key={it.name}
              onClick={() => it.type === 'folder' && setPath([...path, it.name])}
              style={{
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
      {here.length === 0 && <p>No items here.</p>}
    </div>
  );
}

