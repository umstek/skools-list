import React, { useState, useEffect } from 'react';
import { List, Input } from 'antd';

import useDebounce from '../util/useDebounce';

import { School } from '../School';
import SchoolCardView from './SchoolCardView';

const base_url = 'http://localhost:3000/schools';

export function SchoolsListView() {
  const [schools, setSchools] = useState<School[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter);

  useEffect(() => {
    const query = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      filter: debouncedFilter,
    });

    const url = `${base_url}?${query.toString()}`;

    fetch(url)
      .then((response) => response.ok && response.json())
      .then(setSchools);
  }, [offset, limit, debouncedFilter]);

  return (
    <div>
      <Input.Search
        loading={filter != debouncedFilter}
        id="search"
        size="large"
        onChange={(event) => setFilter(event.target.value)}
        value={filter}
        onSearch={console.log}
      />
      <List grid={{ gutter: 16, column: 4 }} dataSource={schools} renderItem={SchoolCardView} />
    </div>
  );
}
