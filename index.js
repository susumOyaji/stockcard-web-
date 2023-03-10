'use strict';
var db;

(function () {
    const T = self.SqliteTestUtil;
    const toss = function (...args) { throw new Error(args.join(' ')) };

    const debug = console.debug.bind(console);
    const eOutput = document.querySelector('#test-output');
    const eOutput1 = document.querySelector('#test-output1');
    const logC = console.log.bind(console)

    const logE = function (domElement) {
        eOutput.append(domElement);
    };
    const logHtml = function (cssClass, ...args) {
        const ln = document.createElement('div');
        if (cssClass) ln.classList.add(cssClass);
        ln.append(document.createTextNode(args.join(' ')));
        logE(ln);
    }
    const log = function (...args) {
        logC(...args);
        logHtml('', ...args);
    };
    const warn = function (...args) {
        logHtml('warning', ...args);
    };
    const error = function (...args) {
        logHtml('error', ...args);
    };





    //////////////////////////////////
    //////////////////////////////
    const runStockcard = function (sqlite3) {
        const capi = sqlite3.capi,
            oo = sqlite3.oo1,
            wasm = sqlite3.wasm;
        log("Loaded module:", capi.sqlite3_libversion(), capi.sqlite3_sourceid());
        T.assert(0 !== capi.sqlite3_vfs_find(null));
        if (!capi.sqlite3_vfs_find('kvvfs')) {
            error("This build is not kvvfs-capable.");
            return;
        }



        const dbStorage = 0 ? 'session' : 'local';
        const theStore = 's' === dbStorage[0] ? sessionStorage : localStorage;
        const db = new oo.JsStorageDb(dbStorage);
        // Or: oo.DB(dbStorage, 'c', 'kvvfs')
        log("size.storageSize(", dbStorage, ") says", db.storageSize(),
            "bytes");



        function insert(_rack, _contaner, _parts) {
            const resultRows = [];

            db.exec({
                sql: "insert into fruits(rack,contaner,parts) values ($a,$b,$c)",
                // bind by parameter name...
                bind: { $a: _rack, $b: _contaner, $c: _parts }
            });

            db.exec({
                sql: "SELECT * FROM fruits",//????????????SQL
                rowMode: "object",//??????????????????????????????????????????????????????????????????,
                //'array'(???????????????), 'object', 'stmt'?????????Stmt????????????????????????????????????
                resultRows,//returnValue:
            });
            return resultRows;
        }



        async function _getdowhtmls() {
            const puppeteer = require("puppeteer");

            (async () => {
              const browser = await puppeteer.launch();
              const page = await browser.newPage();
              await page.goto("https://example.com");
            
              const result = await page.evaluate(() => {
                return [...document.querySelectorAll(".target")]
                  .map(e => e.innerText);
              });
            
              await browser.close();
            })();
            
        }


        _getdowhtmls();

        //insert
        document.querySelector('#btn-init-db').addEventListener('click', function () {
            try {
                db.exec("CREATE TABLE IF NOT EXISTS fruits(id INTEGER PRIMARY KEY ,rack TEXT,contaner TEXT,parts TEXT DEFAULT 'NO VALUE')");


                log("Insert using a prepared statement...");
                let i;
                let q = db.prepare([
                    "insert into fruits(rack,contaner,parts) ",
                    "values(?,?,?)"
                ]);
                try {
                    q.bind(1, 'r001').bind(2, 'c001').bind(3, '10500').stepReset();
                    q.bind(1, 'r001').bind(2, 'c002').bind(3, '10600').stepReset();
                    q.bind(1, 'r002').bind(2, 'c003').bind(3, '10700').stepReset();
                    //for (i = 105; i <= 107; ++i) {
                    //  q.bind(1, i).bind(2, i * 10).bind(3, i * 100).stepReset();
                    //}
                    //var ret = insert(99, "99", 99);
                } finally {
                    q.finalize();
                }

                const resultRows = [];
                db.exec({
                    sql: "SELECT * FROM fruits",//????????????SQL
                    rowMode: "object",//??????????????????????????????????????????????????????????????????,
                    //'array'(???????????????), 'object', 'stmt'?????????Stmt????????????????????????????????????
                    resultRows,//returnValue:
                });
                log("DB Delete All. and Reconfiguration");
                log("..._insert...Result rows:", JSON.stringify(resultRows, undefined, 2));

            } catch (e) {
                error(e.message);
            }
        });



        document.querySelector('#btn-clear-log').addEventListener('click', function () {
            eOutput.innerText = '';
            log("Loaded module:", capi.sqlite3_libversion(), capi.sqlite3_sourceid());
            log("size.storageSize(", dbStorage, ") says", db.storageSize(),
                "bytes");
            log("Display  Delete All. and Reconfiguration");
        });

        document.querySelector('#btn-clear-storage').addEventListener('click', function () {
            const sz = db.clearStorage();
            log("kvvfs", db.filename + "Storage cleared:", sz, "entries.");
        });






        const result = document.querySelector("#select-output");
        function _parts(value) {
            var value;
            var sqlString = `select * from fruits where parts='${value}'`;


            const resultRows = [];

            if (value.length >= 1) {
                try {
                    db.exec({
                        sql: sqlString,
                        rowMode: "object",
                        resultRows,
                    });
                } catch (e) {
                    error(e.message);
                }
                if (resultRows.length == 0) {

                    result.innerText = value + " is Not registered";
                } else {
                    for (var i = 0; i < resultRows.length; i++) {
                        //result.innerText = resultRows[i].contaner;
                        //result.innerText = result.innerText + " - " + resultRows[i].rack;
                    }

                }

            }
            return resultRows;

        }


        function _contaner(value) {
            var value;
            var sqlString = `select * from fruits where contaner='${value}'`;



            const resultRows = [];

            if (value.length >= 1) {
                try {
                    db.exec({
                        sql: sqlString,
                        rowMode: 'object',
                        resultRows,
                    });
                } catch (e) {
                    error(e.message);
                }
                if (resultRows.length == 0) {

                    result.innerText = value + " contaner is Not registered";
                    console.log(sqlString);
                } else {
                    for (var i = 0; i < resultRows.length; i++) {
                        result.innerText = resultRows[i].parts;
                        result.innerText = result.innerText + " - " + resultRows[i].rack;
                    }

                }

            }

        };


        function _rack(value) {
            var value;
            var sqlString = `select * from fruits where rack='${value}'`;



            const resultRows = [];

            if (value.length >= 1) {
                try {
                    db.exec({
                        sql: sqlString,
                        rowMode: "object",
                        resultRows,
                    });
                } catch (e) {
                    error(e.message);
                }
                if (resultRows.length == 0) {
                    alert(elem.value + " is Not Regiserd Rack");
                    //result.innerText = elem.value + " is Not Regiserd Rack";
                } else {
                    for (var i = 0; i < resultRows.length; i++) {
                        result.innerText = result.innerText + " ... " + resultRows[i].contaner;
                    }


                }


            }
            //contaner.value="";
        };





        document.querySelector('#select').addEventListener('change', function () {
            var a = document.getElementById("select").value;
            //const out = document.getElementById("#select-output");
            var s = a.charAt(0);//

            switch (s) {
                case "": //???data?????????p????????????????????????
                    console.log("???????????????????????????????????????");
                    break;
                case "c": //???data?????????c????????????????????????
                    console.log("Contaner");
                    _contaner(a);
                    //document.getElementById("contaner").focus();
                    //document.querySelector("#selct-output")
                    break;
                case "r"://???data?????????r????????????????????????
                    _rack(a);
                    console.log("Rack");
                    //document.getElementById("rack").focus();
                    break;
                default: //?????????????????????CASE????????????????????????????????????????????????
                    console.log("Parts");
                    var ret = _parts(a);


                    // ??????????????????????????????JSON???
                    var json = JSON.stringify(ret);

                    // JSON??????????????????????????????????????????????????????
                    json = JSON.parse(json);

                    for (var i = 0; i < ret.length; i++) {
                        document.getElementById("select-output").innerText = JSON.stringify(json[i].contaner, undefined, 2);
                        document.getElementById("select-output").innerText = JSON.stringify(json[i].rack, undefined, 2);
                        //console.log(json[i].contaner);
                        //console.log(json[i].rack);
                    }
                    //document.getElementById("select-output").innerText = JSON.stringify(json, undefined, 2);
                    break;
            }

        });

    };

    sqlite3InitModule(self.sqlite3TestModule).then((sqlite3) => {
        runStockcard(sqlite3);
        //demo1(sqlite3);//??????????????????
    });
    //document.getElementById('parts').click()


})();