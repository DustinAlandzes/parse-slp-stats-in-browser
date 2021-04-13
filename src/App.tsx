import React, {useState} from 'react';
import './App.css';

// slippi-js and node buffer polyfill
import {Buffer} from 'buffer';
import SlippiGame from '@slippi/slippi-js'

// antd
import 'antd/dist/antd.css'
import {Breadcrumb, Button, Layout, Menu, Typography, Upload} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import default_fox from './stock_icons/fox-default.png';

const {Title, Paragraph} = Typography;
const {Header, Content, Sider} = Layout;

function App(): JSX.Element {

    const [state, setState] = useState({fileList: []})

    async function beforeUpload(file: File): Promise<File> {
        console.log(file)
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            if (reader.result) {
                const game = new SlippiGame(Buffer.from(reader.result));
                // todo: show characters, duration, stage, winner in preview
            }
        }
        return file
    }

    return (
        <Layout>
            <Header>
                <a href="#">
                    <img src={default_fox} style={{height: 32, float: 'left', marginTop: 16, marginRight: 16}}/>
                </a>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Home</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item key="1" icon={<LaptopOutlined/>}>Parse Slippi Folder</Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined/>}>Logout</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Parse Slippi Folder</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* todo: separate component for this */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            backgroundColor: "white"
                        }}
                    >
                        <Typography>
                            <Title>Parse Slippi Folder</Title>
                            <Paragraph>
                                In the process of internal desktop applications development, many different design specs
                                and
                                implementations would be involved, which might cause designers and developers
                                difficulties and
                                duplication and reduce the efficiency of development.
                            </Paragraph>
                        </Typography>
                        <Upload
                            //fileList={state.fileList}
                            //onChange={handleChange}
                            action={'https://httpbin.org/post'}
                            //previewFile={previewFile}
                            beforeUpload={beforeUpload}
                            directory>
                            <Button type="primary">
                                Click me to open the prompt, and choose your Slippi folder
                            </Button>
                        </Upload>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
