import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Card, Tag } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from '../../index.less';
import { queryPatientList } from '@/services/patient';
import Meta from 'antd/lib/card/Meta';
interface Pprops {
  handleId: any;
}
const PatientList: React.FC<Pprops> = ({ handleId }) => {
  // const fakeDataUrl =
  //   'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
  const ContainerHeight = 900;
  const [data, setData] = useState([]);

  const appendData = (isconcat: boolean) => {
    let offset = data.length;
    if (isconcat) {
      offset = 0;
    }
    queryPatientList({ offset, length: 10 }).then((res: any) => {
      if (res.code) {
        if (isconcat) {
          setData(data.concat(res.data.data));
        } else {
          setData(res.data.data);
        }
      } else {
        message.error(res.msg || '获取数据失败');
      }
    });
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData(data.concat(body.results));
    //     message.success(`${body.results.length} more items loaded!`);
    //   });
  };
  const renderCardTitle = (item: any) => {
    return (
      <span>
        <span>{item.name}</span>
        {item.tags.map((tag: any) => {
          return (
            <Tag color="#55acee" key={tag}>
              {tag}
            </Tag>
          );
        })}
      </span>
    );
  };

  useEffect(() => {
    appendData(false);
  }, []);

  const onScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData(true);
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
        itemKey="id"
        onScroll={onScroll}
      >
        {(Pitem: any) => (
          <List.Item key={Pitem.id} onClick={() => itemCLick(Pitem.id)}>
            {/* <List.Item.Meta
              avatar={<Avatar src={Pitem.avatar || ''} />}
              title={<a>{Pitem.name}</a>}
              description={Pitem.contact}
            />
            <div>Content</div> */}
            <Card style={{ width: 375 }} cover hoverable bordered>
              <Meta
                avatar={<Avatar src={Pitem.avatar || 'https://joeschmoe.io/api/v1/random'} />}
                title={renderCardTitle(Pitem)}
                description={Pitem.contact}
              />
            </Card>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default PatientList;
