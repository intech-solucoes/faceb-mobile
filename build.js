const { print, filesystem, prompt, system, colors } = require('gluegun');

(async () => {
    var env = JSON.parse(filesystem.read("./env.json"));
    var envList = Object.getOwnPropertyNames(env);

    var { selectedEnv } = await prompt.ask({
        type: "select",
        name: "selectedEnv",
        message: "Selecione um ambiente:",
        choices: envList
    });

    filesystem.write("./src/config.json", env[selectedEnv]);

    console.log(env[selectedEnv]);
})();