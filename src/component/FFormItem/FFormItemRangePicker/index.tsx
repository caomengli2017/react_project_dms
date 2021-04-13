import { DatePicker } from 'antd';
import React, { FC } from 'react';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment, { Moment } from 'moment';

const { RangePicker } = DatePicker;

interface IFFormItemRangePickerProps
  extends Omit<RangePickerProps, 'value' | 'onChange'> {
  value?: [string, string];
  onChange?: (value: string[] | null) => void;
}
type EventValue<DateType> = DateType | null;
type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;
const FFormItemRangePicker: FC<IFFormItemRangePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const changeDate = (
    values: RangeValue<Moment>,
    formatString: [string, string]
  ) => {
    if (!!values) {
      onChange && onChange(formatString);
    } else {
      onChange && onChange(null);
    }
  };
  const value2Moment = (): [Moment, Moment] | null => {
    if (value) {
      return [moment(value[0]), moment(value[1])];
    }
    return null;
  };
  return (
    <RangePicker
      style={{ width: '100%' }}
      value={value2Moment()}
      onChange={changeDate}
    />
  );
};

export default FFormItemRangePicker;
