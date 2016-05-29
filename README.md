# packt-fontsettings

This plugin adds font settings in the GitBook reader.

### Using this plugin

This can be enabled using a `book.json` configuration:

```
{
    plugins: ["packt-fontsettings"]
}
```

### Configuration

This plugin can be configured in the `book.json`:

Default configuration is:

```js
{
    "pluginsConfig": {
        "fontsettings": {
            "family": 'sans',// 'serif' or 'sans',
            "size": 2 // 1 - 4
        }
    }
}
```
