import { CommandInfo, BotCommandEvent, Logger } from "@akaiv/core";
import { DatabaseManager } from "./database-manager";
export declare class AddCommand implements CommandInfo {
    private databaseManager;
    constructor(databaseManager: DatabaseManager);
    get CommandList(): string[];
    get Description(): string;
    get Usage(): string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
export declare class RemoveCommand implements CommandInfo {
    private databaseManager;
    constructor(databaseManager: DatabaseManager);
    get CommandList(): string[];
    get Description(): string;
    get Usage(): string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
export declare class InfoCommand implements CommandInfo {
    private databaseManager;
    constructor(databaseManager: DatabaseManager);
    get CommandList(): string[];
    get Description(): string;
    get Usage(): string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
export declare class ListCommand implements CommandInfo {
    private databaseManager;
    constructor(databaseManager: DatabaseManager);
    get CommandList(): string[];
    get Description(): string;
    get Usage(): string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
