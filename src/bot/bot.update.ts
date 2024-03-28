import { OnModuleInit, UseFilters } from "@nestjs/common";
import { Telegraf } from "telegraf";
import { BotContext } from "./bot.context";
import { BOT_NAME } from "./bot.constants";
import { BotService } from "./bot.service";
import { Command, Ctx, InjectBot, Message, On, Start, Update } from "nestjs-telegraf";
import { Message as TelegramMessage } from 'typegram';
import { TelegrafExceptionFilter } from "./filters/telegraf-exception.filter";


@Update()
@UseFilters(TelegrafExceptionFilter)
export class BotUpdate implements OnModuleInit {

    constructor(
        @InjectBot(BOT_NAME)
        private readonly bot: Telegraf<BotContext>,
        private readonly botService: BotService,
    ) { }

    onModuleInit(): void {
        console.log('onBotInit', this.bot.botInfo?.username);

        this.bot.telegram.setMyCommands([
            {
                command: 'start',
                description: 'Start Bot',
            },
            {
                command: 'hello',
                description: 'say hello',
            }
        ])
    }

    @Start()
    async onStart(
        @Ctx() ctx: BotContext,
        @Message() message: TelegramMessage
    ) {
        console.log("OnStart", message, ctx);

        await ctx.reply('Hello!!!');
    }

    @Command('hello')
    async onHello(
        @Ctx() ctx: BotContext,
        @Message() message: TelegramMessage
    ) {
        ctx.reply(`Hello!! ${message.from?.first_name ?? message.from?.username}`);
    }

    @On('sticker')
    async onSticker(
        @Ctx() ctx: BotContext,
        @Message() message: TelegramMessage.StickerMessage,
    ) {
        await ctx.reply(`Классный стикер ${message.from?.username}`)
    }


    @On('message')
    async onMessage(
        @Ctx() ctx: BotContext,
        @Message() message: TelegramMessage.TextMessage,
    ) {
        await ctx.reply(`You said: ${message.text}`)
    }

}