# 区分不同环境打包所需要的不同配置

通过`process.env.VUE_APP_ENV_ID`变量来区分不同环境需要的不同配置，`process.env.VUE_APP_ENV_ID`约定是目录下的一个文件名，从`npm.script`中传入，具体可以查看`package.json`的配置

如果需要增加一个环境配置，则增加一个文件，然后在`index.js`中的`modulesEnv`变量中添加一行，再在`package.json.scripts`添加对应的执行命令
