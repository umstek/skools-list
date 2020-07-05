import React, { useState, useEffect } from 'react';
import { List, Input, Divider, Button } from 'antd';

import useDebounce from '../util/useDebounce';

import { School } from '../School';
import SchoolCardView from './SchoolCardView';

const base_url = 'http://localhost:3000/schools';

export function SchoolsListView() {
  const [schools, setSchools] = useState<School[]>([]);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const query = new URLSearchParams({
        offset: offset.toString(),
        limit: '5',
        filter: debouncedFilter,
      });

      const url = `${base_url}?${query.toString()}`;

      const response = await fetch(url);
      const result = response.ok ? await response.json() : [];
      setSchools([...schools, ...result]);

      setLoading(false);
    };

    loadData();
  }, [offset, debouncedFilter]);

  const loadMore = !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={() => setOffset(offset + 5)}>Load more</Button>
    </div>
  ) : null;

  return (
    <>
      <Input.Search
        loading={filter != debouncedFilter}
        id="search"
        size="large"
        onChange={(event) => setFilter(event.target.value)}
        value={filter}
        onSearch={console.log}
      />
      <Divider orientation="center" plain />
      <List
        grid={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, gutter: 16 }}
        dataSource={schools}
        renderItem={SchoolCardView}
        loadMore={loadMore}
        loading={loading}
      />
    </>
  );
}
