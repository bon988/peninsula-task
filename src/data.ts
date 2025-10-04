import type { Item } from './types';
// mock data
export const ROOT: Item[] = [
  { type: 'pdf', name: 'Employee Handbook', added: '2017-01-06' },
  { type: 'pdf', name: 'Public Holiday Policy', added: '2016-12-06' },
  { type: 'folder', name: 'Expenses', files: [
      { type: 'doc', name: 'Expenses Claim Form', added: '2017-05-02' },
      { type: 'doc', name: 'Fuel Allowances', added: '2017-05-03' },
    ]},
  { type: 'csv', name: 'Cost Centres', added: '2016-08-12' },
  { type: 'folder', name: 'Misc', files: [
      { type: 'doc', name: 'Christmas Party', added: '2017-12-02' },
      { type: 'mov', name: 'Welcome to the Company!', added: '2015-04-24' },
    ]},
];
