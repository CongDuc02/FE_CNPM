import { Button, Dropdown, Space, Table } from 'antd'
import React, { useMemo, useState } from 'react'
import Loading from '../LoadingComponent/Loading';
import { DownOutlined } from '@ant-design/icons';
import { Excel } from 'antd-table-saveas-excel';

const TableComponent = (props) => {

  const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDeleteMany  } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  }, [columns])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };



  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }

  
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  const items = [ 
  {
    key: '1',
    label: (
      <a onClick={exportExcel}>
        Xuất file Excel
      </a>
    ),
  },
  {
    key: '2',
    danger: true,
    label: (
      <a onClick={handleDeleteAll}>
        Xóa tất cả
      </a>
    ),
  },
  // {
  //   key: '2',
  //   danger: true,
  //   label: 'a danger item',
  // },
  ];


  return (
    <div>
    <Loading isLoading={isLoading}>
    <div> <Dropdown menu={{
        items,
      }}
      trigger={['click']}
    
    >
    <Button style={{marginBottom: '10px',}}>
      <Space>
        Hover me
        <DownOutlined />
        
      </Space>
    </Button>
    </Dropdown>
  
  </div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
    </div>
  )
}

export default TableComponent
