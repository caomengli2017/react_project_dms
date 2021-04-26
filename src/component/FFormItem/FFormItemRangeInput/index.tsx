import { InputNumber } from 'antd';
import './index.less';

const PREFIX = 'f-form-item-range-input';
interface FFormItemRangeInputProps {
  value?: [number, number];
  onChange?: (e: [number | null, number | null]) => void;
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
  const _onChange = (type: number, e: number) => {
    const _value = value || [null, null];
    _value[type] = e;
    onChange && onChange(_value);
  };
  return (
    <span className={PREFIX}>
      <InputNumber
        className={`${PREFIX}-left`}
        placeholder={placeholder && placeholder[0]}
        onChange={_onChange.bind(this, 0)}
        defaultValue={value && value[0]}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
      />
      <span className={`${PREFIX}-center`}>~</span>
      <InputNumber
        className={`${PREFIX}-right`}
        placeholder={placeholder && placeholder[1]}
        onChange={_onChange.bind(this, 1)}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
        defaultValue={value && value[1]}
      />
    </span>
  );
};

export default FFormItemRangeInput;
