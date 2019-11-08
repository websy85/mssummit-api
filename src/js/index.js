import * as styles from "../less/main.less";
import { request } from "http";
import enigma from "enigma.js";
import schema from "./qlikSchema";
import { Bar } from "./bar";

window.navController;

const options = {
  defaultView: "hub"
};
window.navController = new WebsyNavigator(options);
window.navController.subscribe("show", (view, params) => {});
window.navController.subscribe("hide", view => {});
window.navController.init();

function createApp() {
  const name = document.getElementById("newAppName").value;
  getRequest(`/createapp/${name}`).then(response => {});
}

window.createApp = createApp;

function getRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
}
console.log("create session");

const session = enigma.create({
  url: "ws://3.10.23.19:9076/app/aUniqueUrl",
  schema
});
session.open().then(global => {
  console.log(global);
  global.openDoc("ramen.qvf").then(app => {
    const def = {
      qInfo: {
        qType: "nicksobject"
      },
      qSelectionObjectDef: {},
      color: "blue",
      myProp1: [
        {
          qStringExpression: `='There are ' & Count(DISTINCT Country) & ' countries'`
        },
        "hello",
        {
          qValueExpression: `=Count(DISTINCT Country)`
        }
      ],
      qListObjectDef: {
        qDef: {
          qFieldDefs: ["Country", "Style", "Brand"],
          qGrouping: "C"
        },
        qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 1, qHeight: 10000 }]
      },
      myTable: {
        qHyperCubeDef: {
          qDimensions: [
            {
              qDef: {
                qFieldDefs: ["Country"],
                qSortCriterias: [
                  {
                    qSortByAscii: 1
                  }
                ]
              },
              qNullSuppression: true
            },
            {
              qDef: {
                qFieldDefs: ["Style"]
              }
            }
          ],
          qMeasures: [
            {
              qDef: {
                qDef: `Avg(Stars)`
              },
              qSortBy: {
                qSortByNumeric: -1
              }
            }
          ],
          qInterColumnSortOrder: [0],
          qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 3, qHeight: 30 }]
        }
      }
    };
    app.createSessionObject(def).then(model => {
      console.log(model);
      model.on("changed", () => {
        model.getLayout().then(layout => {
          console.log(layout);
        });
      });
      model.getLayout().then(layout => {
        console.log(layout);
        const patchDefs = [
          {
            qOp: "replace",
            qPath: "/myTable/qHyperCubeDef/qDimensions/1/qDef",
            qValue: JSON.stringify({
              qFieldDefs: ["Brand"]
            })
          },
          {
            qOp: "replace",
            qPath: "/qListObjectDef/qDef/qActiveField",
            qValue: JSON.stringify(1)
          }
        ];
        model.applyPatches(patchDefs);
      });
    });

    const barCubeDef = {
      qInfo: {
        qType: "bar"
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ["Style"]
            }
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: "=avg(Stars)"
            }
          }
        ],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 2,
            qHeight: 1000
          }
        ]
      }
    };

    app.clearAll();

    app.createSessionObject(barCubeDef).then(model => {
      const bar = new Bar({
        node: document.getElementById("sandbox"),
        model: model
      });
    });
  });
});
