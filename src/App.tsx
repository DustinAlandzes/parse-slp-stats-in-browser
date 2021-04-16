import React from 'react';

import UploadScreen from "./UploadScreen";
import GameHistory from "./GameHistory";
import {list_of_stock_icons} from "./stock_icons"
// wouter
import {Link, Route} from "wouter";

// antd
import 'antd/dist/antd.css'
import {GithubOutlined, SmileOutlined} from '@ant-design/icons';

import {Avatar, BackTop, Divider, Layout, Menu} from 'antd';
import {Content, Footer, Header} from "antd/lib/layout/layout";
import Home from "./Home";

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function App(): JSX.Element {
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white'}}>
                {/* todo: select current item based on url */}
                <img alt={"random stock icon"} src={list_of_stock_icons[getRandomInt(list_of_stock_icons.length)]}
                     style={{float: 'left', marginTop: '1.5em', marginRight: '1.5em'}}/>
                <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link href="/upload">Parse Slippi Folder</Link></Menu.Item>
                    <Menu.Item key="3"><Link href="/history">Game History</Link></Menu.Item>
                    <Avatar icon={<SmileOutlined/>} style={{float: 'right', marginTop: '1em'}}/>
                </Menu>
            </Header>
            <Layout>
                <Content style={{padding: '10px 50px', marginTop: 64}}>
                    <div style={{padding: 24, minHeight: 380}}>
                        <Route path="/" component={Home}/>
                        <Route path="/upload" component={UploadScreen}/>
                        <Route path="/history" component={GameHistory}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <a href="https://github.com/DustinAlandzes/parse-slp-stats-in-browser"><GithubOutlined/></a>
                    <Divider type="vertical"/>
                    {"slp.spaceanimalz.com"}
                </Footer>
            </Layout>
            <BackTop/>
        </Layout>
    );
}

export default App;
