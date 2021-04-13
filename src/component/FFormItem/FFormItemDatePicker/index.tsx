import { DatePicker } from 'antd';
import React, { FC } from 'react';
import { DatePickerProps } from 'antd/lib/date-picker';
import moment, { Moment } from 'moment';

interface IFFormItemRangePickerProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string | null) => void;
}

const FFormItemRangePicker: FC<IFFormItemRangePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const changeDate = (values: Moment | null, formatString: string) => {
    if (!!values) {
      onChange && onChange(formatString);
    } else {
      onChange && onChange(null);
    }
  };
  const value2Moment = (): Moment | null => {
    if (value) {
      return moment(value);
    }
    return null;
  };
  return (
    <DatePicker
      style={{ width: '100%' }}
      value={value2Moment()}
      onChange={changeDate}
    />
  );
};

export default FFormItemRangePicker;
