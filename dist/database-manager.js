"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseManager {
    constructor(dbEntry) {
        this.dbEntry = dbEntry;
    }
    async getChannelList(chanId) {
        return await this.dbEntry.get(chanId);
    }
    async getChannelEntry(chanId) {
        return await this.dbEntry.getEntry(chanId);
    }
    async hasEmoticonOn(chanId, name) {
        return await (await this.getChannelEntry(chanId)).has(name);
    }
    async deleteEmoticonOn(chanId, name) {
        return (await this.getChannelEntry(chanId)).deleteKey(name);
    }
    async uploadEmoticon(chanId, name, item) {
        (await this.getChannelEntry(chanId)).set(name, item);
    }
    async getEmoticon(chanId, name) {
        if (!(await this.hasEmoticonOn(chanId, name)))
            return null;
        let item = await (await this.getChannelEntry(chanId)).get(name);
        return item;
    }
}
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=database-manager.js.map