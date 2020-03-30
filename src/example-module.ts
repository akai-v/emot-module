import { BotModule } from "@akaiv/core";
import { ExampleCommand } from "./example-command";

/*
 * Created on Sat Oct 26 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

// NOTE: Module should not target any specific bot. It's individual part.
export class ExampleModule extends BotModule {

    constructor({ something }: { // ALways receive params as object
        something: string
    }) {
        super();

        this.CommandManager.addCommand(new ExampleCommand());
    }

    get Name() {
        return 'Example'; // Module name
    }

    get Description() {
        return 'This is example module';
    }

    get Namespace() {
        return 'ex'; //This is used as command prefix `ex/{command}` and module id
    }

    // LOAD MODULE RESOURCES HERE
    protected async loadModule(): Promise<void> {

    }

    // UNLOAD MODULE RESOURCES HERE
    protected async unloadModule(): Promise<void> {

    }

}