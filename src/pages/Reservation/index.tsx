import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Calendar,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd';
import './antdCover.less';
import styles from './index.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { addNewReservation, editReservation, queryReservationByDate } from '@/services/reservation';
import { EditOutlined } from '@ant-design/icons';
import DebounceSelect from '@/pages/components/DebounceSelect';
import { queryFuzzyPatient } from '@/services/patient';
import DropSelect from '@/pages/components/DropSelect';
import TextArea from 'antd/lib/input/TextArea';

interface recordInterface {
  id: string;
  doctorName: string;
  doctor_Id: number;
  patientId: number;
  patientName: string;
  rank: number | string;
  time: string;
  title: string;
  type: any;
  description: string;
}
interface selectDateInterface {
  month: number;
  year: number;
}

const Reservation: React.FC = () => {
  moment.locale('zh-cn');
  const [monthlyRecord, setMonthlyRecord] = useState<recordInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState<selectDateInterface>({
    month: moment().month() + 1,
    year: moment().year(),
  });
  const [reserveModalVisible, setReserveModalVisible] = useState<boolean>(false);
  const [reservationForm] = Form.useForm();
  const [saveloading, setSaveloading] = useState<boolean>(false);
  // const [editId, setEditId] = useState<number>(-1);
  useEffect(() => {
    queryReservationByDate({ ...selectedDate }).then((res: any) => {
      setMonthlyRecord(res?.data || []);
    });
  }, [selectedDate]);

  const getListData = (value: any) => {
    // console.log(value, '11111');
    value.date();
    // console.log(value.date(), 2222);
    const ListDateStart = moment(value).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const ListDateEnd = moment(value).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    // console.log(ListDateStart, ListDateEnd, '33333');
    const data = monthlyRecord.filter(
      (item: recordInterface) =>
        moment(item.time).isBefore(ListDateEnd) && moment(item.time).isAfter(ListDateStart),
      // value.isAfter(moment(item.time))
    );
    return data;
  };

  const toEditReservation = (record: recordInterface) => {
    setReserveModalVisible(true);
    reservationForm.setFieldsValue({
      id: record.id,
      patient: {
        value: record.patientId,
        label: record.patientName,
      },
      doctor: {
        value: record.doctor_Id,
        label: record.doctorName,
      },
      description: record.description,
      rank: record.rank,
      time: moment(record.time),
      title: record.title,
    });
  };

  const renderReserveText = (item: recordInterface) => {
    return (
      <span className={styles.recordArea}>
        <span>{moment(item.time).format('HH:mm:ss')}</span>
        <span className={styles.recordText}>{item.title}</span>
        <span className={styles.recordText}>{item.patientName}</span>
        <span className={styles.recordText}>{item.doctorName}</span>
        {moment().isBefore(moment(item.time)) ? (
          <EditOutlined onClick={() => toEditReservation(item)} />
        ) : (
          <div />
        )}
      </span>
    );
  };

  const dateCellRender = (value: any) => {
    // console.log('value', value);
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item: recordInterface) => (
          <li key={item.title}>
            <Badge status={item.type} text={renderReserveText(item)} className={styles.BadgeArea} />
          </li>
        ))}
      </ul>
    );
  };
  const onPanelChange = (value: { format: (arg0: string) => any }, mode: any) => {
    console.log(value.format('YYYY-MM'), mode);
    //get year and month
    const year = moment(value.format('YYYY-MM')).year();
    const month = moment(value.format('YYYY-MM')).month() + 1;
    setSelectedDate({ month, year });
  };

  const toAddNewReservation = () => {
    setReserveModalVisible(true);
    reservationForm.resetFields();
  };

  const fetchOptionsList = async (inputValue: string): Promise<any> => {
    const res = await queryFuzzyPatient({ fuzzy: inputValue });
    return (
      res?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  };

  const toSaveReservation = () => {
    reservationForm.validateFields().then((values: any) => {
      setSaveloading(true);
      const { doctor, patient, time, ...rest } = values;
      rest.patientId = patient.value;
      rest.doctorId = doctor.value;
      rest.time = moment(time).format('YYYY-MM-DD HH:mm:ss');
      console.log('save', rest);
      if (reservationForm.getFieldValue('id')) {
        rest.reservation_id = reservationForm.getFieldValue('id');
        editReservation(rest)
          .then((res: any) => {
            if (res.code) {
              message.success('修改预约成功');
              setReserveModalVisible(false);
              setSelectedDate({ ...selectedDate });
            } else {
              message.error(res.message || '修改预约失败');
            }
          })
          .finally(() => {
            setSaveloading(false);
          });
        return;
      }
      addNewReservation(rest)
        .then((res: any) => {
          if (res.code) {
            message.success('预约成功');
            setReserveModalVisible(false);
            setSelectedDate({ ...selectedDate });
          } else {
            message.error(res.message || '预约失败');
          }
        })
        .finally(() => {
          setSaveloading(false);
        });
    });
  };

  return (
    <>
      <Modal
        visible={reserveModalVisible}
        onCancel={() => setReserveModalVisible(false)}
        className="s-modal"
        closable={true}
        centered
        mask
        destroyOnClose
        bodyStyle={{
          padding: '24px 42px 4px',
        }}
        title="病人预约"
        // onOk={toSaveReservation}
        footer={
          <>
            <Button onClick={() => setReserveModalVisible(false)} loading={saveloading}>
              取消
            </Button>
            <Button type="primary" onClick={toSaveReservation} loading={saveloading}>
              保存
            </Button>
          </>
        }
      >
        <div>
          <Form labelAlign="right" form={reservationForm}>
            <Form.Item
              name="patient"
              label="病人"
              rules={[
                {
                  required: true,
                  message: '请选择您的病人!',
                },
              ]}
            >
              <DebounceSelect
                showSearch={true}
                placeholder="请输入患者姓名或者手机号"
                showArrow={true}
                fetchOptions={(value: any) => fetchOptionsList(value)}
              />
            </Form.Item>
            <Form.Item label="主治医师" name="doctor">
              <DropSelect
                searchInfo={{
                  api: '/api/doctor/query/list',
                }}
                placeholder="请选择主治医生"
              />
            </Form.Item>
            <Form.Item
              label="预约时间"
              name="time"
              rules={[{ required: true, message: '预约时间不能为空' }]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                placeholder="请选择预约时间"
                className="dateItem"
              />
            </Form.Item>
            <Form.Item
              label="预约内容"
              name="title"
              key="title"
              rules={[{ required: true, message: '预约内容不能为空' }]}
            >
              <Input placeholder="请输入预约内容" />
            </Form.Item>
            <Form.Item
              label="预约详情"
              name="description"
              key="description"
              rules={[{ required: true, message: '预约详情不能为空' }]}
            >
              <TextArea placeholder="请输入预约详情" showCount maxLength={50} />
            </Form.Item>
            <Form.Item
              label="预约类型"
              name="rank"
              key="rank"
              rules={[{ required: true, message: '预约类型不能为空' }]}
            >
              <Select placeholder="请选择预约类型">
                <Select.Option value={1}>常规</Select.Option>
                <Select.Option value={2}>紧急</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div>
        <Button onClick={toAddNewReservation}>新增预约</Button>
      </div>
      <div className={styles.calendarArea}>
        <Calendar
          headerRender={({ value, onChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];

            const current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i++) {
              current.month(i);
              months.push(localeData.monthsShort(current));
            }

            for (let index = start; index < end; index++) {
              monthOptions.push(
                <Select.Option className="month-item" key={`${index}`}>
                  {months[index]}
                </Select.Option>,
              );
            }
            const month = value.month();

            const year = value.year();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>,
              );
            }
            return (
              <div style={{ padding: 8 }}>
                <Typography.Title level={4}>预约门诊</Typography.Title>
                <Row gutter={8}>
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      className="my-year-select"
                      onChange={(newYear: any) => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                      }}
                      value={String(year)}
                    >
                      {options}
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      value={String(month)}
                      onChange={(selectedMonth) => {
                        const newValue = value.clone();
                        newValue.month(parseInt(selectedMonth, 10));
                        onChange(newValue);
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                </Row>
              </div>
            );
          }}
          dateCellRender={dateCellRender}
          onPanelChange={onPanelChange}
        />
      </div>
    </>
  );
};
export default Reservation;
