import React from 'react';
import './App.css';

// slippi-js and node buffer polyfill so I can pass slippi files to it

// antd
import 'antd/dist/antd.css'
import {Breadcrumb, Button, Layout, Menu, Typography, Upload} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';

const {Title, Paragraph, Text, Link} = Typography;
const {Header, Content, Sider} = Layout;


function App() {
    return (
        <Layout>
            <Header className="header">
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
                            <Paragraph>
                                After massive project practice and summaries, Ant Design, a design language for
                                background
                                applications, is refined by Ant UED Team, which aims to
                                <Text strong>
                                    uniform the user interface specs for internal background projects, lower the
                                    unnecessary
                                    cost of design differences and implementation and liberate the resources of design
                                    and
                                    front-end development
                                </Text>.
                            </Paragraph>
                            <Title level={2}>Guidelines and Resources</Title>
                            <Paragraph>
                                We supply a series of design principles, practical patterns and high quality design
                                resources
                                (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their
                                product
                                prototypes beautifully and efficiently.
                            </Paragraph>

                            <Paragraph>
                                <ul>
                                    <li>
                                        <Link href="#">Principles</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Patterns</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Resource Download</Link>
                                    </li>
                                </ul>
                            </Paragraph>
                        </Typography>
                        <Upload
                            onChange={console.log}
                            action={'https://httpbin.org/post'}
                            //previewFile={(file) => {}}

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
