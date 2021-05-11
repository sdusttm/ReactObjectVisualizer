// babelrc format does not work with transformIgnorePatterns in jest config
// https://github.com/facebook/jest/issues/6229
module.exports = (api) => {
    api.cache(true);
    return {
        presets: [
            "@babel/react",
            "@babel/preset-typescript",
            [
                "@babel/preset-env",
                {
                    // for jest we transpile to commonjs syntax, otherwise set to false to preserve the 'import' syntax so host's build flow can lazy load
                    modules: "commonjs",
                    targets: {
                        esmodules: true
                    }
                }
            ]
        ]
    };
};
