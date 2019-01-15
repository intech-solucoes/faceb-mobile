const { filesystem, prompt } = require('gluegun');

(async () => {
    
    const configs = await filesystem.listAsync("./scripts/configs");
    var envList = [];

    configs.forEach((config) => {
        var splitConfigName = config.split(".");
        envList.push(splitConfigName[1]);
    });
    
    const { env } = await prompt.ask(
        {
            type: 'list',
            name: 'env',
            message: 'Selecione um ambiente:',
            choices: envList
        }
    );

    await filesystem.copy(`./scripts/configs/config.${env}.json`, "./src/config.json", { overwrite: true });
})();