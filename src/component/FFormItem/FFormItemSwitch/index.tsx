import { Switch } from 'antd';
import React, { FC } from 'react';

interface IFFormItemSwitchProp {
  value?: number;
  onChange?(val: number): void;
}
const FFormItemSwitch: FC<IFFormItemSwitchProp> = ({ value, onChange }) => {
  const handleChange = (checked: boolean) => {
    onChange && onChange(checked ? 1 : 0);
  };

  return <Switch checked={!!value} onChange={handleChange} />;
};

export default FFormItemSwitch;
