import { BotModule, DatabaseEntry, BotMessageEvent } from "@akaiv/core";
export declare class EmotModule extends BotModule {
    private databaseManager;
    constructor({ dbEntry }: {
        dbEntry: DatabaseEntry;
    });
    get Name(): string;
    get Description(): string;
    get Namespace(): string;
    protected loadModule(): Promise<void>;
    protected unloadModule(): Promise<void>;
    protected onConMessage(e: BotMessageEvent): Promise<void>;
}
