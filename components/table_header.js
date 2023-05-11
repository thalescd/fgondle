import React from 'react';
import HeaderCell from './header_cell';

function TableHeader() {
  return (
    <thead>
      <tr>
        <HeaderCell label='Icon' />
        <HeaderCell label='Name' />
        <HeaderCell label='Class' />
        <HeaderCell label='NP Type' />
        <HeaderCell label='NP Target' />
        <HeaderCell label='Rarity' />
        <HeaderCell label='Gender' />
      </tr>
    </thead>
  );
}

export default TableHeader;