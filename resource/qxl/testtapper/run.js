async function goTest () {
  const fs = require("fs");
  const puppeteer = require("puppeteer");
  const pti = require('puppeteer-to-istanbul');
  const argv = require("yargs")
    .command("$0 [options] <url>", "run a tests with TAP compliant reporting", yargs => {
      yargs.positional("url", {
        describe: "URL to access for testing",
        type: "string",
        example: "https://localhost:8888/runTests"
      })
        .options({
          verbose: {
            describe: "show all console messages",
            type: "boolean"
          },
          diag: {
            describe: "show diagnostic output",
            type: "boolean"
          },
          terse: {
            describe: "show only summary and errors",
            type: "boolean"
          },
          module: {
            describe: "only run tests of this module",
            type: "string"
          }
        });
    })
    .help("h")
    .alias("h", "help")
    .version("0.2.0")
    .wrap(72)
    .strict(true)
    .argv;

  let href = argv.url;
  if (fs.existsSync(href)) {
    if (href.match(/^[^/]/)) {
      href = process.cwd() + "/" + href;
    }
    href = "file://" + href;
  }
  if (argv.module) {
    href += "?class=" + argv.module;
  }

  href = new URL(href);

  console.log("CALL "+ href.href);
  let notOk = 0;
  let Ok = 0;
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  page.on("console", async msg => {
    let val = msg.text();
    // value is serializable
    // eslint-disable-next-line no-negated-condition

    if  ( val.match(/^\d+\.\.\d+$/) ) {
      console.info(`DONE testing ${Ok} ok, ${notOk} not ok`);
      if (notOk > 0) {
        await browser.close();
        process.exit(notOk);
      }
      else {
        let jsCoverage = await page.coverage.stopJSCoverage();
        console.info("writing coverage information ...");
        await pti.write(jsCoverage);
        await browser.close();
        process.exit(0);
      }
    }
    else if (val.match(/^not ok /)) {
      notOk++;
      console.log(val);
    }
    else if (val.match(/^ok\s/)) {
      if (!argv.terse) {
        console.log(val);
      }
      Ok++;
    }
    else if (val.match(/^#/) && argv.diag) {
      console.log(val);
    }
    else if (argv.verbose) {
      console.log(val);
    }
  });
  await page.coverage.startJSCoverage();
  await page.goto(href.href);
}

(async () => {
  try {
    await goTest();
  }
  catch ( err ) {
    console.log(`ERROR ${err}`);
    process.exit(1);
  };
})();
