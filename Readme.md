# consoleback

### **Improved logging for Javascript applications**

<a id="/features"></a>&nbsp;

- Uses console.log, console.warn, console.error
- Adds timestamp and log type to message (if desired)
- Allows callback that gives the application access to the log.

<a id="/usage"></a>&nbsp;

## Usage

```javascript
// ES6
import consoleback from "consoleback";

// CommonJS
const consoleback = require("consoleback");


// Usage
consoleback()

// All logs are now captured by consoleback

consoleback: (opts?: {
    callback?: (type: string, message: any, ...optionalParams: any[]) => void;
    showMsgType?: boolean;
    showTime?: boolean;
}) => void

```
All options are optional.

`callback?: (type: string, message: any, ...optionalParams: any[]) => void;`

The callback that will provide the logged data.
- type: The type of log (log, warn, error)
- message/optionalParams: The logged information

`showMsgType?: boolean;`

Whether to show a message type or not (defaults to true)

When true, [ LOG ], [ WRN ], or [ ERR ] will appear appended to the start of each log.

`showTime?: boolean;`

Whether to show time information (defaults to false)

<a id="/examples"></a>&nbsp;

## Example

```javascript
consoleback({
  callback: (type, message, optionalParams) => {
    // Perform actions on logged messages
  },
  showMsgType: true,
  showTime: true
})

console.log("The time is...");

// [ 2019-10-01T20:38:04.586Z ] [ LOG ] The time is...

```

<a id="/license"></a>&nbsp;

## License

This project is MIT Licensed.
