import { BotModule, DatabaseEntry, BotMessageEvent, AttachmentTemplate, TemplateAttachment, AttachmentType } from "@akaiv/core";
import { AddCommand, InfoCommand, RemoveCommand, ListCommand } from "./emot-command";
import { DatabaseManager } from "./database-manager";
import * as request from "request-promise";

/*
 * Created on Mon Mar 30 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class EmotModule extends BotModule {

    private databaseManager: DatabaseManager;

    constructor({ dbEntry }: {
        dbEntry: DatabaseEntry
    }) {
        super();

        this.databaseManager = new DatabaseManager(dbEntry);

        this.CommandManager.addCommand(new AddCommand(this.databaseManager));
        this.CommandManager.addCommand(new InfoCommand(this.databaseManager));
        this.CommandManager.addCommand(new ListCommand(this.databaseManager));
        this.CommandManager.addCommand(new RemoveCommand(this.databaseManager));

        this.on('message', this.onConMessage.bind(this));
    }

    get Name() {
        return 'Custom Emoticon';
    }

    get Description() {
        return '커스텀 이모지';
    }

    get Namespace() {
        return 'con';
    }

    protected async loadModule(): Promise<void> {

    }

    protected async unloadModule(): Promise<void> {

    }

    protected async onConMessage(e: BotMessageEvent) {
        let text = e.Message.Text;

        if (text[0] !== ':' || text[text.length - 1] !== ':') return;

        let name = text.substring(1, text.length - 1);
        let item = await this.databaseManager.getEmoticon(e.Message.Channel.IdentityId, name);

        if (!item) return;

        let buffer = await request.get(item.url, {
            encoding: null,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                'Referer': item.url
            }
        });

        await e.Message.replyRichTemplate(new AttachmentTemplate('', new TemplateAttachment(AttachmentType.IMAGE, `${name}.png`, buffer)));
    }

}