import React, {useState} from 'react';

// slippi-js and node buffer polyfill
import {Buffer} from 'buffer';
import SlippiGame, {characters, stages} from '@slippi/slippi-js'

import {CharacterAndColorToIconMap} from "./stock_icons"
import {StageToIconMap} from "./stage_icons";

// antd
import {UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import {Button, Divider, Empty, Skeleton, Typography, Upload} from "antd";

const {Title, Paragraph} = Typography;

interface FileNameToSlippiGame {
    [key: string]: SlippiGame
}

export default function UploadScreen(): JSX.Element {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [fileNameToGameMapping, setFileNameToGameMapping] = useState<FileNameToSlippiGame>({})

    async function beforeUpload(file: File): Promise<File> {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            if (reader.result) {
                const game = new SlippiGame(Buffer.from(reader.result));
                if (game) {
                    setFileNameToGameMapping(prevState => ({...prevState, [file.name]: game}))
                }
            }
        }
        return file
    }

    function handleChange(info: UploadChangeParam) {
        setFileList(info.fileList);
    }

    function itemRender(originNode: React.ReactElement, file: UploadFile, fileList?: UploadFile[]): React.ReactNode {
        if (file.name in fileNameToGameMapping && file.percent === 100) {
            const game = fileNameToGameMapping[file.name];
            //const end = game.getGameEnd()
            //const stats = game.getStats();
            const metadata = game.getMetadata();
            const settings = game.getSettings();
            if (metadata && settings.stageId) {
                const stage_name = stages.getStageName(settings.stageId)
                const stage_icon = StageToIconMap[settings.stageId]
                return <div>
                    {metadata.startAt}
                    <Divider type="vertical"/>
                    <span>{metadata.lastFrame && (Math.round(metadata.lastFrame / 60))}{"s"}</span>
                    <Divider type="vertical"/>
                    <span>{stage_name}{" "}<img alt="stage icon" src={stage_icon} height={32}/></span>
                    <Divider type="vertical"/>
                    {settings.players.map(player => {
                        if (player.characterId !== null && player.characterColor !== null && metadata.players !== null) {
                            const character_colors_to_icon = CharacterAndColorToIconMap[player.characterId]
                            const color_name = characters.getCharacterColorName(player.characterId, player.characterColor)
                            const icon = character_colors_to_icon[color_name]

                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            const name = metadata.players[player.playerIndex].names.code;

                            return <span>
                                {name}
                                {" "}
                                {<img alt="character icon" src={icon}/>}
                                <Divider type="vertical"/>
                            </span>
                        } else {
                            return <span>No character?<Divider type="vertical"/></span>
                        }
                    })}
                    <Divider/>
                </div>
            }
        }

        if (file.percent === 100) {
            return <div>
                {"Unable to parse "}{file.name}
                <Divider/>
            </div>
        } else {
            return <div>
                <Skeleton paragraph={false} active={true}/>
                <Divider/>
            </div>
        }
    }

    return <div>
        <Typography>
            <Title>Parse Slippi Folder</Title>
            <Paragraph>
                Select your Slippi folder, it will be parsed and uploaded.
            </Paragraph>
        </Typography>
        <Divider dashed/>
        <Upload
            fileList={fileList}
            onChange={handleChange}
            action={'https://httpbin.org/post'}
            itemRender={itemRender}
            beforeUpload={beforeUpload}
            directory>
            <Button type="dashed">
                Click me to open the prompt, and choose your Slippi folder
            </Button>
            <Divider/>
        </Upload>
        <div>
            {fileList.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
        </div>
    </div>
}
