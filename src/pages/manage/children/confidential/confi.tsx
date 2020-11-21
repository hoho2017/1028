import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './confi.less';
import {
  Row,
  Col,
  Table,
  Form,
  Button,
  Select,
  message,
  DatePicker,
  ConfigProvider,
  Upload,
  Modal,
} from 'antd';
import locale from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import { InboxOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { check } from 'prettier';

const { Option } = Select;
const { Dragger } = Upload;
interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const Confi: FC<PageProps> = props => {
  const { deptId, deptName, manage, dispatch, index, child } = props;
  const [year, setYear] = useState([]);
  const [yearClick, setYearClick] = useState(0);
  const [isAll, setIsAll] = useState(false);
  const [title, setTitle] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [importYear, setImportYear] = useState(2020);
  const [tableData, setTableData] = useState([]);
  const [showTableData, setShowTableData] = useState(false);
  const [uuid, setUuid] = useState('');
  const [showCheckFile, setShowCheckFile] = useState(false);
  const [fileList, setFileList] = useState([]);

  const queryInit = () => {
    dispatch({
      type: 'manage/queryY',
      payload: {
        deptId,
      },
      callback: data => {
        const year = Object.keys(data).map(item => {
          const value = data[item].status;
          const k = item.split('-')[0];
          return { key: k, value };
        });
        const arr = [];
        for (let i = Number(moment().year() - 19); i <= moment().year(); i++) {
          const obj = {};
          obj.k = i;
          obj.color = 'black';
          year.forEach(item => {
            if (Number(item.key) === i) {
              obj.color = item.value === 1 ? '#0FB723' : 'red';
            }
          });
          arr.push(obj);
        }
        setYear([...arr]);
      },
    });
    dispatch({
      type: 'manage/queryTitle',
      payload: {
        deptId,
      },
      callback: data => {
        setTitle(data.list[0]); //appLevelName
      },
    });
  };
  useEffect(() => {
    queryInit();
  }, [deptId]);

  const pagination = {
    current: 1,
    pageSize: 1000,
    hideOnSinglePage: true,
  };
  const columns = [
    {
      title: '密码应用控制点',
      dataIndex: 'splitTypeDescOne',
      key: 'splitTypeDescOne',
      colSpan: 3,
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan = 100;

        if (value === '技术要求' && index > 0) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: 'hide',
      colSpan: 0,
      dataIndex: 'splitTypeDescTwo',
      key: 'splitTypeDescTwo',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        //splitTypeTwo
        if (row.splitTypeTwo !== 0) {
          obj.props.rowSpan = row.splitTypeTwo;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: 'hide',
      colSpan: 0,
      dataIndex: 'splitTypeDescThree',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan = 1;
        return obj;
      },
    },
    {
      title: title ? title.appLevelName : '',
      colSpan: 1,
      dataIndex: 'levelMsg',
      key: 'levelMsg',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan = 1;
        return obj;
      },
    },
    {
      title: '监控结果',
      colSpan: 1,
      dataIndex: 'resultType',
      key: 'resultType',
      render: text => <div>{text}</div>,
    },
    {
      title: '详细监控信息',
      colSpan: 1,
      dataIndex: 'resultTypeDesc',
      key: 'resultTypeDesc',
      render: text => <div>{text}</div>,
    },
  ];
  const showTable = year => {
    if (year === yearClick) {
      setShowTableData(false);
      setYearClick(0);
      return false;
    }
    setYearClick(year);
    dispatch({
      type: 'manage/queryTable2',
      payload: {
        year,
        deptId,
      },
      callback: data => {
        setTableData([...data.data.data]);
        setShowTableData(true);
      },
    });
  };
  const props2 = {
    name: 'file',
    multiple: false,
    beforeUpload: fileC => {
      setFileList([fileC]);
      const formData = new FormData();
      formData.append('file', fileC);
      dispatch({
        type: 'manage/upload',
        payload: { file: formData, year: importYear, deptId },
        callback: data => {
          if (data.code === 0) {
            setUuid(data.uuid);
          } else {
            message.warn(data.msg);
            setFileList([]);
          }
        },
      });
      return false;
    },
    fileList,
  };
  const checkFile = () => {
    if (uuid !== '') {
      dispatch({
        type: 'manage/checkFile',
        payload: {
          uuid,
        },
        callback: data => {
          if (data.code === 0) {
            setTableData([...data.data]);
            setShowCheckFile(true);
          }
        },
      });
    } else {
      message.info('请先上传文件！');
    }
  };
  const confirmUp = () => {
    dispatch({
      type: 'manage/confirmUp',
      payload: {
        uuid,
      },
      callback: data => {
        if (data.code === 0) {
          message.success('文件上传成功！');
          setUuid('');
          setShowConf(false);
          setShowCheckFile(false);
          queryInit();
        }
      },
    });
  };
  return (
    <>
      <div style={{ marginTop: '1rem' }}>
        <span className={styles.title}>{deptName} &emsp; 密评登记结果</span>
      </div>
      <div className={styles.content} style={{ paddingBottom: '20px' }}>
        <div className={styles.title2}>历年登记情况</div>
        <Row style={{ marginTop: '15px' }}>
          <Col span={1} offset={7}>
            <div className={styles.colorr}></div>
          </Col>
          <Col span={2}>
            <span>登记失败</span>
          </Col>
          <Col span={1} offset={1}>
            <div className={styles.colorg}></div>
          </Col>
          <Col span={2}>
            <span>登记成功</span>
          </Col>
          <Col span={1} offset={1}>
            <div className={styles.colorb}></div>
          </Col>
          <Col span={2}>
            <span>未登记</span>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={1}>
            <div className={isAll ? styles.yearbox2 : styles.yearbox3}>
              <Row className={styles.yearbox} style={{ marginTop: '20px' }}>
                <Col span={2}>
                  <span className={styles.head}>年份</span>
                </Col>
                {year.slice(10, 20).map(item => {
                  return (
                    <Col span={2} key={item.k}>
                      <span
                        className={styles.yearNum}
                        style={{
                          color: yearClick == item.k ? '#fff' : item.color,
                          backgroundColor:
                            yearClick == item.k ? '#0085e8' : '#fff',
                        }}
                        onClick={() =>
                          item.color === '#0FB723' ? showTable(item.k) : null
                        }
                      >
                        {item.k}
                      </span>
                    </Col>
                  );
                })}
              </Row>
              <Row style={{ display: isAll ? 'flex' : 'none' }}>
                {year.slice(0, 10).map((item, index) => {
                  return (
                    <Col span={2} offset={index === 0 ? 2 : 0} key={item.k}>
                      <span
                        className={styles.yearNum}
                        style={{
                          color: yearClick == item.k ? '#fff' : item.color,
                          backgroundColor:
                            yearClick == item.k ? '#0085e8' : '#fff',
                        }}
                        onClick={() =>
                          item.color === '#0FB723' ? showTable(item.k) : null
                        }
                      >
                        {item.k}
                      </span>
                    </Col>
                  );
                })}
              </Row>
              <Row style={{ display: isAll ? 'flex' : 'none' }}>
                {year.slice(10, 20).map((item, index) => {
                  return (
                    <Col span={2} offset={index === 0 ? 2 : 0} key={item.k}>
                      <span
                        className={styles.yearNum}
                        style={{
                          color: yearClick == item.k ? '#fff' : item.color,
                          backgroundColor:
                            yearClick == item.k ? '#0085e8' : '#fff',
                        }}
                        onClick={() =>
                          item.color === '#0FB723' ? showTable(item.k) : null
                        }
                      >
                        {item.k}
                      </span>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
          <Col offset={1}>
            <div
              onClick={() => setIsAll(!isAll)}
              className={isAll ? styles.all : styles.noall}
              style={{ marginTop: '20px' }}
            >
              全
            </div>
          </Col>
        </Row>
        <Table
          style={{
            width: '100%',
            marginTop: '2%',
            padding: '3%',
            display: showTableData ? 'inline-block' : 'none',
          }}
          columns={columns}
          dataSource={tableData}
          pagination={pagination}
          bordered
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title2}>新增登记</div>
        <Row>
          <Col offset={1}>
            <span style={{ padding: '5px' }}>导入登记信息</span>
            <Select
              size="small"
              defaultValue="2020"
              onChange={value => setImportYear(value)}
              style={{ width: 70 }}
            >
              {year.map(item => {
                return (
                  <Option key={item.k} value={item.k}>
                    {item.k}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col offset={5}>
            <Button
              style={{ color: '#0085e8' }}
              onClick={() => setShowUpload(true)}
              size="small"
              shape="round"
            >
              导入文件
            </Button>
          </Col>
          <Col offset={1}>
            <Button
              style={{ color: '#0085e8' }}
              onClick={() => checkFile()}
              size="small"
              shape="round"
            >
              查看导入文件
            </Button>
          </Col>
          <Col offset={1}>
            <Button
              style={{ color: '#0085e8' }}
              onClick={() => {
                if (uuid !== '') {
                  setShowConf(true);
                } else {
                  message.info('请先上传文件！');
                }
              }}
              size="small"
              shape="round"
            >
              确定导入
            </Button>
          </Col>
        </Row>
        <Row>
          <Table
            style={{
              width: '100%',
              marginTop: '2%',
              padding: '3%',
              display: showCheckFile ? 'inline-block' : 'none',
            }}
            columns={columns}
            dataSource={tableData}
            pagination={pagination}
            bordered
          />
        </Row>
      </div>
      <Modal
        closable={false}
        visible={showUpload}
        bodyStyle={{ textAlign: 'center' }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setShowUpload(false);
              setFileList([]);
            }}
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => setShowUpload(false)}
          >
            确定
          </Button>,
        ]}
      >
        <Dragger {...props2}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖入文件上传</p>
        </Dragger>
      </Modal>
      <Modal
        centered={true}
        bodyStyle={{ textAlign: 'center' }}
        title=""
        visible={showConf}
        onOk={() => {}}
        onCancel={() => {}}
        closable={false}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setShowConf(false);
              setShowCheckFile(false);
            }}
          >
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => confirmUp()}>
            确定
          </Button>,
        ]}
      >
        <p style={{ fontSize: '1rem', fontWeight: '600' }}>
          请确定导入数据无误,一旦确认无法修改!
        </p>
      </Modal>
    </>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Confi);
