### Technology Stack
- React
- ReactHook
- ReactRouter
- Redux
- Axios
- Less
- Third party


### Functions to complete
1. homepage
2. Announcement
3. search
4. detail page
5. comment/ likes
6. personal profile
7.

### Environment construct
1. Project environment: create-react-app (Use react scaffold to construct react project structure)
2. Integrate network axios
3. Less


### Less configuration support
- In the React scaffold configuration environment, it support CSS and Sass/ Scss in default, thus need to configure Less by ourselves
1. npm run eject
2. install the dependency
```js
npm install --save-dev less less-loader
```
3. change the configuration file
```js
// configuration 1
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

// configuration 2
{
    test: lessRegex,
        exclude: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 3,
        sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
        modules: {
            mode: 'icss',
        },
    },
    'less-loader'
),

    sideEffects: true,
},
{
    test: lessModuleRegex,
        use: getStyleLoaders(
    {
        importLoaders: 3,
        sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
        modules: {
            mode: 'local',
            getLocalIdent: getCSSModuleLocalIdent,
        },
    },
    'less-loader'
),
},
```

### condigure network request
1. install dependency
```js
npm install --save axios
```
2. configure related files
- request.js

### condigure initialization styles
1. initialization css files
2. import font css
