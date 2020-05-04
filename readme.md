# Qooxdoo JSON-RPC API Incubator

![Build and Deploy](https://github.com/qooxdoo/incubator.qx.io.jsonrpc/workflows/Build%20and%20Deploy/badge.svg)

This incubator contains a proposal to add an extensible JSON-RPC v2 API 
to qooxdoo.

Development status: beta. The API should be fairly stable.

- API: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/apiviewer/#qx.io.jsonrpc
- Test runner: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/

## Installation for use in your project

```bash
git clone https://github.com/qooxdoo/incubator.qx.io.jsonrpc.git
```

Then, in your application `compile.json`, add the absolute or
relative path to the repository clone in the `libraries` array.

## Installation & testing (development)

To run this incubator project as a standalone application (for development purposes),
execute the following steps

```bash
npm install --no-save --no-package-lock @qooxdoo/compiler
npx qx package install
npx qx test
```

To update the dependencies, run

```bash
npm install --no-save --no-package-lock @qooxdoo/compiler
npx qx package install qooxdoo/qxl.testtapper --save=0
npx qx package install qooxdoo/qxl.apiviewer --save=0
```

