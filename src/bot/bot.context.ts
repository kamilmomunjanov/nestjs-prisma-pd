import { Scenes } from 'telegraf';
// import { ProfileEntity } from '../bot.service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BotContext extends Scenes.SceneContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly state: {
        // user?: ProfileEntity | null;
    }
}