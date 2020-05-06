import { DatabaseEntry } from "@akaiv/core";
export declare class DatabaseManager {
    private dbEntry;
    constructor(dbEntry: DatabaseEntry);
    getChannelList(chanId: string): Promise<EmoticonList>;
    getChannelEntry(chanId: string): Promise<DatabaseEntry>;
    hasEmoticonOn(chanId: string, name: string): Promise<boolean>;
    deleteEmoticonOn(chanId: string, name: string): Promise<void>;
    uploadEmoticon(chanId: string, name: string, item: EmoticonItem): Promise<void>;
    getEmoticon(chanId: string, name: string): Promise<EmoticonItem | null>;
}
export interface EmoticonList {
    [key: string]: EmoticonItem;
}
export interface EmoticonItem {
    uploaderId: string;
    uploaderNickname: string;
    url: string;
    uploadedDate: number;
}
