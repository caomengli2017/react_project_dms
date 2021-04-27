import { Input } from 'antd';
import { ChangeEvent, useState } from 'react';
import './index.less';

const PREFIX = 'f-form-item-range-input';
type IRangeInputValue = [number | undefined, number | undefined];
interface FFormItemRangeInputProps {
  value?: IRangeInputValue;
  onChange?: (e: IRangeInputValue) => void;
  placeholder?: [string, string];
  onBlur?: () => void;
  onPressEnter?: () => void;
}
const FFormItemRangeInput = ({
  value,
  onChange,
  placeholder,
  onBlur,
  onPressEnter,
}: FFormItemRangeInputProps) => {
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const _onChange = (type: number, e: ChangeEvent<HTMLInputElement>) => {
    const _value = value || [undefined, undefined];
    const _e = Number(e.target.value) || undefined;
    _value[type] = _e;
    if (type === 0) setMin(_e);
    if (type === 1) setMax(_e);
    onChange && onChange(_value);
  };

  return (
    <span className={PREFIX}>
      <Input
        type="number"
        className={`${PREFIX}-left`}
        placeholder={placeholder && placeholder[0]}
        onChange={_onChange.bind(this, 0)}
        value={(value && value[0]) || min}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
      />
      <span className={`${PREFIX}-center`}>~</span>
      <Input
        type="number"
        className={`${PREFIX}-right`}
        placeholder={placeholder && placeholder[1]}
        onChange={_onChange.bind(this, 1)}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
        value={(value && value[1]) || max}
      />
    </span>
  );
};

export default FFormItemRangeInput;
