import { CommandInfo, BotCommandEvent, ModuleLogger } from "@akaiv/core";

/*
 * Created on Thu Jan 23 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class ExampleCommand implements CommandInfo {

    // CommandList dont have to be constant value
    get CommandList() {
        return [ 'example' ];
    }

    get Usage() {
        return 'ex/example <required_param1> [optional_param1]';
    }

    // Description have to be short but clear
    get Description() {
        return 'This is example command!';
    }

    onCommand(e: BotCommandEvent, logger: ModuleLogger) {
        logger.info(`Logging to bot ${e.TargetBot.Name}`);
        e.Channel.sendText('Hello World!');
    }

}
