import { Select } from '@mantine/core';
import React from 'react';
import DownArrowIcon from '../constants/icons/DownArrowIcon';

function SelectOptions({ name, value, setFieldValue, data }) {

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => setFieldValue(`${name}`, e)}
      rightSection={<DownArrowIcon />}
      placeholder="Kategori Seç"
      classNames={{
        input: 'categoryInput',
      }}
      styles={{
        dropdown: { marginTop: '-9px', boxShadow: '0px 3px 12px #1E36482E;' },
        item: { fontSize: '16px', fontWeight: '400', color: '#3e3e3e' },
        hovered: { color: '#4b9ce2', backgroundColor: '#f2f2f2' },
        rightSection: { pointerEvents: 'none' }
      }}
      data={data} />
  );
}

export default SelectOptions;