import React, { useState, useEffect } from 'react';
import { List, message, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from '../../index.less';
interface Pprops {
  handleId: any;
}
const PatientList: React.FC<Pprops> = ({ handleId }) => {
  const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
  const ContainerHeight = 900;
  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  const itemCLick = (Id: string) => {
    handleId(Id);
  };

  return (
    <List className={`${styles.patientList}`}>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={20}
        itemKey="email"
        onScroll={onScroll}
      >
        {(Pitem: any) => (
          <List.Item key={Pitem.email} onClick={() => itemCLick(Pitem.Id)}>
            <List.Item.Meta
              avatar={<Avatar src={Pitem.picture.large} />}
              title={<a href="https://ant.design">{Pitem.name.last}</a>}
              description={Pitem.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default PatientList;
