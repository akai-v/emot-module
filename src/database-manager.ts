import { DatabaseEntry } from "@akaiv/core";

/*
 * Created on Mon Mar 30 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class DatabaseManager {

    constructor(private dbEntry: DatabaseEntry) {
        
    }

    async getChannelEntry(chanId: string): Promise<DatabaseEntry> {
        return await this.dbEntry.getEntry(chanId);
    }

    async hasEmoticonOn(chanId: string, name: string): Promise<boolean> {
        return await (await this.getChannelEntry(chanId)).has(name);
    }

    async deleteEmoticonOn(chanId: string, name: string): Promise<void> {
        return (await this.getChannelEntry(chanId)).deleteKey(name);
    }

    async uploadEmoticon(chanId: string, name: string, item: EmoticonItem): Promise<void> {
        (await this.getChannelEntry(chanId)).set(name, item);
    }

    async getEmoticon(chanId: string, name: string): Promise<EmoticonItem | null> {
        if (! (await this.hasEmoticonOn(chanId, name))) return null;
        let item = await (await this.getChannelEntry(chanId)).get(name);

        return item as EmoticonItem;
    }

}

export interface EmoticonItem {

    uploaderId: string;
    uploaderNickname: string;
    url: string;
    uploadedDate: number;

}