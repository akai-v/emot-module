"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
class AddCommand {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }
    get CommandList() {
        return ['add'];
    }
    get Description() {
        return '이모지 추가';
    }
    get Usage() {
        return 'con/add <이름> <이모지 주소>';
    }
    async onCommand(e, logger) {
        if (e.RawArgument.length < 1) {
            await e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let parser = new core_1.SpaceSplitedParser();
        let args = parser.parse(e.RawArgument);
        if (args.length < 2) {
            await e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let name = args.shift();
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
exports.AddCommand = AddCommand;
class RemoveCommand {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }
    get CommandList() {
        return ['rm'];
    }
    get Description() {
        return '이모지 제거';
    }
    get Usage() {
        return 'con/rm <이름>';
    }
    async onCommand(e, logger) {
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
exports.RemoveCommand = RemoveCommand;
class InfoCommand {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }
    get CommandList() {
        return ['info'];
    }
    get Description() {
        return '이모지 정보';
    }
    get Usage() {
        return 'con/info <이름>';
    }
    async onCommand(e, logger) {
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
exports.InfoCommand = InfoCommand;
//# sourceMappingURL=emot-command.js.map