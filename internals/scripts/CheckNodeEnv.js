import chalk from 'chalk'

export default expectedEnv => {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set')
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(
      chalk.whiteBright.bgRed.bold(
        `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`,
      ),
    )
    /**
     * For unknown reason this happens in dev mode and shuts down the eslint server
     * see: https://github.com/Microsoft/vscode-eslint/issues/590#issuecomment-448943357
     */
    //process.exit(2)
  }
}
