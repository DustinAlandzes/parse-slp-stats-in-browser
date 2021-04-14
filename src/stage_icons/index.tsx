import battlefield from './BattlefieldIconSSBM.png'
import final_destination from './FinalDestinationIconSSBM.png'
import fountain_of_dreams from './FountainOfDreamsIconSSBM.png'
import pokemon_stadium from './PokemonStadiumIconSSBM.png'
import yoshis_story from './YoshisStoryIconSSBM.png'
import dream_land from './PastDreamLandIconSSBM.png'
import {Stage} from "@slippi/slippi-js";

type StageToIcon = {
    //[key: Stage]: string
    [key: number]: string
}

export const StageToIconMap: StageToIcon = {
    [Stage.BATTLEFIELD]: battlefield,
    [Stage.FINAL_DESTINATION]: final_destination,
    [Stage.FOUNTAIN_OF_DREAMS]: fountain_of_dreams,
    [Stage.POKEMON_STADIUM]: pokemon_stadium,
    [Stage.YOSHIS_STORY]: yoshis_story,
    [Stage.DREAMLAND]: dream_land
}
