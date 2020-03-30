"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const emot_command_1 = require("./emot-command");
const database_manager_1 = require("./database-manager");
const request = require("request-promise");
class EmotModule extends core_1.BotModule {
    constructor({ dbEntry }) {
        super();
        this.databaseManager = new database_manager_1.DatabaseManager(dbEntry);
        this.CommandManager.addCommand(new emot_command_1.AddCommand(this.databaseManager));
        this.CommandManager.addCommand(new emot_command_1.InfoCommand(this.databaseManager));
        this.CommandManager.addCommand(new emot_command_1.RemoveCommand(this.databaseManager));
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
    async loadModule() {
    }
    async unloadModule() {
    }
    async onConMessage(e) {
        let text = e.Message.Text;
        if (text[0] !== ':' && text[text.length - 1] !== ':')
            return;
        let name = text.substring(1, text.length - 1);
        let item = await this.databaseManager.getEmoticon(e.Message.Channel.IdentityId, name);
        if (!item)
            return;
        let buffer = await request.get(item.url, {
            encoding: null,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                'Referer': item.url
            }
        });
        await e.Message.replyRichTemplate(new core_1.AttachmentTemplate('', new core_1.TemplateAttachment(core_1.AttachmentType.IMAGE, `${name}.png`, buffer)));
    }
}
exports.EmotModule = EmotModule;
//# sourceMappingURL=emot-module.js.map