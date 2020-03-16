# Qooxdoo JSON-RPC API Incubator

[![Build Status](https://travis-ci.com/qooxdoo/incubator.qx.io.jsonrpc.svg?branch=master)](https://travis-ci.com/qooxdoo/incubator.qx.io.jsonrpc)

This incubator contains a proposal to add an extensible JSON-RPC v2 API 
to Qooxdoo.

This module should be considered **ALPHA RELEASE** and is subject to change without notice.

- API: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/apiviewer/#qx.io.jsonrpc
- Test runner: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/

## Installation & testing

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

