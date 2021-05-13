import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { FC } from 'react';

interface IFFormItemCheckboxProp {
  value?: number;
  onChange?(val: number): void;
}
const FFormItemCheckbox: FC<IFFormItemCheckboxProp> = ({
  children,
  value,
  onChange,
}) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    onChange && onChange(e.target.checked ? 1 : 0);
  };
  return (
    <Checkbox checked={!!value} onChange={handleChange}>
      {children}
    </Checkbox>
  );
};

export default FFormItemCheckbox;
