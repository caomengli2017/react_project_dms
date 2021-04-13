import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { FIconFont } from '../../';
import icons from './icons';
import './index.less';

interface IFIconSelectorProps {
  onSelect: (icon: string) => void;
}
const PREFIX = 'f-icon-selector';

const FIconSelector = ({ onSelect }: IFIconSelectorProps) => {
  return (
    <ul className={PREFIX}>
      {icons.map((val, index) => (
        <li key={val} onClick={() => onSelect(val)}>
          <FIconFont type={val} />
        </li>
      ))}
    </ul>
  );
};
interface IFFormItemIconSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}
const FFormItemIconSelector = ({
  value,
  onChange,
  placeholder,
}: IFFormItemIconSelectorProps) => {
  const [visibleIcon, setVisibleIcon] = useState(false);
  return (
    <div>
      <Input
        disabled
        value={value}
        placeholder={placeholder}
        addonAfter={
          <FIconFont
            onClick={() => setVisibleIcon(true)}
            type="icon-set"
            style={{ fontSize: 18 }}
          />
        }
      />
      <Modal
        width={600}
        visible={visibleIcon}
        onCancel={() => setVisibleIcon(false)}
        footer={null}
        mask={false}
        closable={false}
        destroyOnClose={true}
      >
        <FIconSelector
          onSelect={(val) => {
            setVisibleIcon(false);
            onChange && onChange(val);
          }}
        />
      </Modal>
    </div>
  );
};

export default FFormItemIconSelector;
