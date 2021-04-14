import React, {useState} from 'react';
import './App.css';

// slippi-js and node buffer polyfill
import {Buffer} from 'buffer';
import SlippiGame, {characters, stages} from '@slippi/slippi-js'

// antd
import 'antd/dist/antd.css'
import {Breadcrumb, Button, Layout, Menu, Typography, Upload} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {UploadChangeParam, UploadFile} from "antd/lib/upload/interface";

import {CharacterAndColorToIconMap} from "./stock_icons"

const {Title, Paragraph} = Typography;
const {Header, Content, Sider} = Layout;

interface FileNameToSlippiGame {
    [key: string]: SlippiGame
}

function App(): JSX.Element {

    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [fileNameToGameMapping, setFileNameToGameMapping] = useState<FileNameToSlippiGame>({})

    async function beforeUpload(file: File): Promise<File> {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            if (reader.result) {
                const game = new SlippiGame(Buffer.from(reader.result));
                if (game) {
                    setFileNameToGameMapping({...fileNameToGameMapping, [file.name]: game})
                }
            }
        }
        return file
    }

    function handleChange(info: UploadChangeParam) {
        const fileList = [...info.fileList];
        setFileList(fileList);
    }

    function itemRender(originNode: React.ReactElement, file: UploadFile, fileList?: UploadFile[]): React.ReactNode {
        console.log(file);
        console.log(fileList);
        console.log(fileNameToGameMapping);
        if (file.name in fileNameToGameMapping) {
            const game = fileNameToGameMapping[file.name];
            const end = game.getGameEnd()
            const stats = game.getStats();
            const metadata = game.getMetadata();
            const settings = game.getSettings();
            console.log(end);
            console.log(stats);
            console.log(metadata);
            console.log(settings);
            if (metadata) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return <div>
                    {file.name} {metadata.startAt}
                    <div>
                        {settings.slpVersion}
                        <div>{"Duration (in seconds): "}{metadata.lastFrame && (Math.round(metadata.lastFrame / 60))}</div>
                        <div>{"Stage: "}{settings.stageId && stages.getStageName(settings.stageId)}</div>
                        {settings.players.map(player => {
                            if (player.characterId && player.characterColor && metadata.players) {
                                const character_colors_to_icon = CharacterAndColorToIconMap[player.characterId]
                                const color_name = characters.getCharacterColorName(player.characterId, player.characterColor)
                                const icon = character_colors_to_icon[color_name]

                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                const name = metadata.players[player.playerIndex].names.code;

                                return <div>
                                    {name}
                                    {<img alt="character icon" src={icon}/>}
                                </div>
                            } else {
                                return <div>Unable to parse</div>
                            }
                        })}
                    </div>
                </div>
            }
        }
        return <div>{file.name}</div>
    }

    return (
        <Layout>
            <Header>
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
                            fileList={fileList}
                            onChange={handleChange}
                            action={'https://httpbin.org/post'}
                            itemRender={itemRender}
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
