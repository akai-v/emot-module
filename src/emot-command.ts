import { CommandInfo, BotCommandEvent, Logger, SpaceSplitedParser } from "@akaiv/core";
import { DatabaseManager } from "./database-manager";

/*
 * Created on Mon Mar 30 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class AddCommand implements CommandInfo {

    constructor(private databaseManager: DatabaseManager) {
        
    }
    
    get CommandList() {
        return [ 'add' ];
    }

    get Description() {
        return '이모지 추가';
    }

    get Usage() {
        return 'con/add <이름> <이모지 주소>';
    }
    
    async onCommand(e: BotCommandEvent, logger: Logger) {
        if (e.RawArgument.length < 1) {
            await e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let parser = new SpaceSplitedParser();

        let args = parser.parse(e.RawArgument);

        if (args.length < 2) {
            await e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let name = args.shift() as string;
        let url = args.join(' ');

        if (await this.databaseManager.hasEmoticonOn(e.Channel.IdentityId, name)) {
            await e.Channel.sendText(`${name} 은 이미 사용중인 이름입니다`);
            return;
        }
        
        await this.databaseManager.uploadEmoticon(e.Channel.IdentityId, name, {
            uploadedDate: Date.now(),
            uploaderId: e.Sender.IdentityId,
            uploaderNickname: e.Sender.Name,
            url: url
        });

        await e.Channel.sendText(`${name} 가 추가 되었습니다`);
    }
}

export class RemoveCommand implements CommandInfo {

    constructor(private databaseManager: DatabaseManager) {
        
    }
    
    get CommandList() {
        return [ 'rm' ];
    }

    get Description() {
        return '이모지 제거';
    }

    get Usage() {
        return 'con/rm <이름>';
    }
    
    async onCommand(e: BotCommandEvent, logger: Logger) {
        if (e.RawArgument.length < 1) {
            await e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let name = e.RawArgument;
        
        if (!this.databaseManager.hasEmoticonOn(e.Channel.IdentityId, name)) {
            await e.Channel.sendText(`${name} 을 찾을 수 없습니다`);
            return;
        }

        await this.databaseManager.deleteEmoticonOn(e.Channel.IdentityId, name);
        await e.Channel.sendText(`${name} 이 제거 되었습니다`);
    }
}

export class InfoCommand implements CommandInfo {

    constructor(private databaseManager: DatabaseManager) {
        
    }
    
    get CommandList() {
        return [ 'info' ];
    }

    get Description() {
        return '이모지 정보';
    }

    get Usage() {
        return 'con/info <이름>';
    }
    
    async onCommand(e: BotCommandEvent, logger: Logger) {
        if (e.RawArgument.length < 1) {
            await e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let name = e.RawArgument;

        let item = await this.databaseManager.getEmoticon(e.Channel.IdentityId, name);

        if (!item) {
            await e.Channel.sendText(`${name} 을 찾을 수 없습니다`);
            return;
        }

        await e.Channel.sendText(`이모지 정보\n업로더: ${item.uploaderNickname} (${item.uploaderId})\n업로드 된 날짜: ${new Date(item.uploadedDate).toString()}\n원주소: ${item.url}`);
    }
}

export class ListCommand implements CommandInfo {

    constructor(private databaseManager: DatabaseManager) {
        
    }
    
    get CommandList() {
        return [ 'list' ];
    }

    get Description() {
        return '이모지 목록';
    }

    get Usage() {
        return 'con/list';
    }
    
    async onCommand(e: BotCommandEvent, logger: Logger) {
        let list = await this.databaseManager.getChannelList(e.Channel.IdentityId);

        let str = `${e.Channel.Name} 의 이모지 목록\n\n`;

        let i = 0;
        for (let name in list) {
            let con = list[name];
            str += `${++i}. :${name}: by ${con.uploaderNickname}\n`;
        }

        await e.Channel.sendText(str);
    }
}