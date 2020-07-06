import React, { useState, useEffect } from 'react';
import { List, Input, Divider, Button } from 'antd';

import useDebounce from '../util/useDebounce';

import { School } from '../School';
import SchoolCardView from './SchoolCardView';

async function fetchSchools(offset: number, filter: string) {
  const query = new URLSearchParams({
    offset: offset.toString(),
    limit: '5',
    filter,
  });

  const url = `${process.env.BASE_URL}?${query.toString()}`;
  const response = await fetch(url);
  const result = response.ok ? await response.json() : ([] as School[]);

  return result;
}

export function SchoolsListView(props: { signal: number }) {
  const [schools, setSchools] = useState<School[]>([]);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const loadData = async (filterChanged = false) => {
    setLoading(true);

    const result = await fetchSchools(filterChanged ? 0 : offset, debouncedFilter);

    if (result.length < 5) {
      setNoMore(true);
      setOffset(filterChanged ? 0 : offset);
    } else {
      setNoMore(false);
      setOffset((filterChanged ? 0 : offset) + 5);
    }

    if (filterChanged) {
      setSchools(result);
    } else {
      setSchools([...schools, ...result]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData(true);
  }, [debouncedFilter, props.signal]);

  const loadMore =
    !noMore && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={() => loadData()}>Load more</Button>
      </div>
    ) : null;

  return (
    <>
      <Input.Search
        loading={loading}
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
