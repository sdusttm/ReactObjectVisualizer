# Object Visualizer

A light weight react component to visualize the JSON object in a table format.

## Features

-   can expand/collapse nested objects
-   options to support levels of default expansion, especialy useful for smaller objects
-   options to support customized size to expand object by default

## How to use

1. Import the **mount** function from the module

```js
import { ObjectVisualizer } from "react-object-visualizer";
```

2. add the component to code

```js
// data is the object to be visualize, configs are optional config parameters
<ObjectVisualizer
    data={data}
    configs={{
        defaultExpandLevels: 1,
        defaultExpandObjectSizeLimit: 500
    }}
></ObjectVisualizer>
```

3. Check in Browser

The object should now be shown in a table format!

## License

[MIT](https://github.com/iendeavor/object-visualizer/blob/master/LICENSE)

