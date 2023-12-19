import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const CustomizedContent = (props) => {
  const { data, item, setKeySelected } = props;

  return (
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexDirection: 'row' }}>
      {Object.keys(data) && Object.keys(data).map((item) => (
        <h4
          key={Math.random()}
          style={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            margin: '0 10px', // Add margin to separate items
          }}
          onClick={() => setKeySelected(item)}
        >
          <span style={{ paddingTop: '50px', color: '#000', fontSize: 30 }}>
            {item === 'users' && <UserOutlined />}
            {item === 'products' && <AppstoreOutlined />}
            {item === 'orders' && <ShoppingCartOutlined />}
              {`  `} {data[item]}
          </span>
        </h4>
      ))}
    </div>
  );
};

export default CustomizedContent;
