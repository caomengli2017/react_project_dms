import React, { useRef, useState } from 'react';
import { Image, Input, Typography } from 'antd';
import intl from 'react-intl-universal';
import fallback from '@src/assets/img/base64/fallback';
import { FBaseListPage } from '@src/component';
import { IBaseListPageRef, IPageRes } from '@src/types/baseTypes';
import { getDealerGoodsList } from '@src/apis/main/dealer-goods';
import AddForm from './addForm';
import FFormItemSelect from '../../../../component/FFormItem/FFormItemSelect/index';
import { getBrandList } from '@src/apis/main/goods';
/**
 *
 * @author Leo
 * @desc 经销商商品列表
 * @date 2021-04-21 16:00:06
 */
const DealerGoodsPage = () => {
  const [visible, setvisible] = useState(false);
  const [editData, setEditData] = useState();
  const baseList = useRef<IBaseListPageRef>(null);
  return (
    <FBaseListPage
      ref={baseList}
      queryApi={getDealerGoodsList}
      rowKey="id"
      conditions={[
        {
          id: 'goodsName',
          label: intl.get('fc_name'),
          _node: <Input />,
        },
        {
          id: 'brandId',
          label: intl.get('fc_brandName'),
          _node: (
            <FFormItemSelect<IPageRes>
              queryApi={getBrandList}
              options={{
                getData: (data) => data.list,
                name: 'name',
                value: 'oid',
              }}
            />
          ),
        },
        {
          id: 'goodsBn',
          label: intl.get('fc_goodsNumber'),
          _node: <Input />,
        },
      ]}
      columns={[
        {
          dataIndex: 'id',
          title: intl.get('c_oid'),
        },
        {
          dataIndex: 'image',
          title: intl.get('c_picUrl'),
          render: (val) => {
            return (
              <Image width={50} height={50} src={val} fallback={fallback} />
            );
          },
        },
        {
          dataIndex: 'name',
          title: intl.get('fc_name'),
        },
        {
          dataIndex: 'goodsNumber',
          title: intl.get('fc_goodsNumber'),
        },
        {
          dataIndex: 'brandName',
          title: intl.get('fc_brandName'),
        },
        {
          dataIndex: 'stock',
          title: intl.get('c_stock'),
        },
        // {
        //   dataIndex: 'price',
        //   title: intl.get('c_price'),
        //   render: (val) => {
        //     return val.sign + val.value + `(${val.unit})`;
        //   },
        // },
        {
          title: intl.get('operating'),
          render: (value, record) => {
            return (
              <Typography.Link
                onClick={() => {
                  setEditData(record);
                  setvisible(true);
                }}
              >
                {intl.get('edit')}
              </Typography.Link>
            );
          },
        },
      ]}
    >
      <AddForm
        visible={visible}
        data={editData}
        onCancel={() => setvisible(false)}
        onRefresh={() => {
          baseList.current?.query();
        }}
      />
    </FBaseListPage>
  );
};

export default DealerGoodsPage;
