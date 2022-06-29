function renderInteractivityTypeData(data) {
  let nbInterActiveDocs = 0,
    nbExpositiveDocs = 0;


  for (let i = 0; i < data.length; i++) {
    if (data[i].interActivityType === `active`) nbInterActiveDocs++;
    else if (data[i].interActivityType === `expositive`) nbExpositiveDocs++;

  }

  const ctxInteractive = document
    .getElementById("InteractivityTypeChart")
    .getContext("2d");
  const interActivityTypeChart = new Chart(ctxInteractive, {
    type: "pie",
    data: {
      labels: ["expositive", "active"],
      datasets: [
        {
          data: [nbExpositiveDocs, nbInterActiveDocs],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(12, 192, 78)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });
}

function renderInteractivityLevelData(data) {
  let veryLowInter = 0,
    lowInter = 0,
    mediumInter = 0,
    highInter = 0,
    veryHighInter = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].interactivityLevel === `very low`) veryLowInter++;
    else if (data[i].interactivityLevel === `low`) lowInter++;
    else if (data[i].interactivityLevel === `medium`) mediumInter++;
    else if (data[i].interactivityLevel === `high`) highInter++;
    else veryHighInter++;
  }

  const tooltip = {
    enabled: true,
    callbacks: {
      label: function (context) {
        console.log(context);
        context.dataset.label = ` # of Documents: ${context.parsed.y}`;
        return context.dataset.label;
      },
    },
  };

  const ctxInteractiveLevel = document
    .getElementById("InteractivityLevelChart")
    .getContext("2d");
  const interactivityLevelChart = new Chart(ctxInteractiveLevel, {
    type: "bar",
    data: {
      labels: [`very low`, `low`, `medium`, `high`, `very high`],
      datasets: [
        {
          data: [veryLowInter, lowInter, mediumInter, highInter, veryHighInter],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(0, 123, 210, 0.2)",
            "rgba(89, 9, 235, 0.2)",
            "rgba(235, 126, 0, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip,
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: `number of documents`,
            font: {
              size: 14,
              family: `Arial`,
            },
          },
          beginAtZero: true,
          grace: "5%",
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },
            stepSize: 5,
          },
        },

        x: {
          title: {
            display: true,
            text: `interactivity levels`,
            font: {
              size: 18,
              family: `Arial`,
            },
          },
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },
          },
        },
      },
    },
  });
}

function renderSemanticDensityData(data) {
  let veryLowDensity = 0,
    lowDensity = 0,
    mediumDensity = 0,
    highDensity = 0,
    veryHighDensity = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].semanticDensity === `very low`) veryLowDensity++;
    else if (data[i].semanticDensity === `low`) lowDensity++;
    else if (data[i].semanticDensity === `medium`) mediumDensity++;
    else if (data[i].semanticDensity === `high`) highDensity++;
    else veryHighDensity++;
  }

  const tooltip = {
    enabled: true,
    callbacks: {
      label: function (context) {
        console.log(context);
        context.dataset.label = ` # of Documents: ${context.parsed.y}`;
        return context.dataset.label;
      },
    },
  };

  const ctxSemanticDensity = document
    .getElementById("semanticDensityChart")
    .getContext("2d");
  const semanticDensityChart = new Chart(ctxSemanticDensity, {
    type: "bar",
    data: {
      labels: [`very low`, `low`, `medium`, `high`, `very high`],
      datasets: [
        {
          data: [
            veryLowDensity,
            lowDensity,
            mediumDensity,
            highDensity,
            veryHighDensity,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(0, 123, 210, 0.2)",
            "rgba(89, 9, 235, 0.2)",
            "rgba(235, 126, 0, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip,
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: `number of documents`,
            font: {
              size: 14,
              family: `Arial`,
            },
          },
          beginAtZero: true,
          grace: "5%",
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },
            stepSize: 5,
          },
        },

        x: {
          title: {
            display: true,
            text: `semantic density levels`,
            font: {
              size: 18,
              family: `Arial`,
            },
          },
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },
          },
        },
      },
    },
  });
}

function getTextRichnessData(data) {
  let veryLowRich = 0,
    lowRich = 0,
    mediumRich = 0,
    highRich = 0,
    veryHighRich = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].textRichness === `very low`) veryLowRich++;
    else if (data[i].textRichness === `low`) lowRich++;
    else if (data[i].textRichness === `medium`) mediumRich++;
    else if (data[i].textRichness === `high`) highRich++;
    else veryHighRich++;
  }

  const tooltip = {
    enabled: true,
    callbacks: {
      label: function (context) {
        console.log(context);
        context.dataset.label = ` # of Documents: ${context.parsed.y}`;
        return context.dataset.label;
      },
    },
  };

  const ctxTextRichness = document
    .getElementById("textRichnessChart")
    .getContext("2d");
  const textRichnessChart = new Chart(ctxTextRichness, {
    type: "bar",
    data: {
      labels: [`very low`, `low`, `medium`, `high`, `very high`],
      datasets: [
        {
          data: [veryLowRich, lowRich, mediumRich, highRich, veryHighRich],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(0, 123, 210, 0.2)",
            "rgba(89, 9, 235, 0.2)",
            "rgba(235, 126, 0, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip,
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: `number of documents`,
            font: {
              size: 18,
              family: `Arial`,
            },
          },
          beginAtZero: true,
          grace: "5%",
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },
            stepSize: 5,
          },
        },

        x: {
          title: {
            display: true,
            text: `standardised type/token ratio (STTR) levels`,
            font: {
              size: 18,
              family: `Arial`,
            },
          },
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },
          },
        },
      },
    },
  });
}

function getTextReadabilityData(data) {
  let veryEasy = 0,
    easy = 0,
    fairlyEasy = 0,
    plainEnglish = 0,
    fairlyDifficult = 0,
    difficult = 0,
    veryDifficult = 0,
    extremelyDifficult = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].textReadability === `very easy to read`) veryEasy++;
    else if (data[i].textReadability === `easy to read`) easy++;
    else if (data[i].textReadability === `fairly easy to read`) fairlyEasy++;
    else if (
      data[i].textReadability ===
      `plain english,understood by 13- to 15-year-old students`
    )
      plainEnglish++;
    else if (data[i].textReadability === `fairly difficult`) fairlyDifficult++;
    else if (data[i].textReadability === `difficult to read`) difficult++;
    else if (data[i].textReadability === `very difficult to read`)
      veryDifficult++;
    else extremelyDifficult++;
  }

  const tooltip = {
    enabled: true,
    callbacks: {
      label: function (context) {
        console.log(context);
        context.dataset.label = ` # of Documents: ${context.parsed.y}`;
        return context.dataset.label;
      },
    },
  };

  const ctxTextReadability = document
    .getElementById("textReadabilityChart")
    .getContext("2d");
  const textReadability = new Chart(ctxTextReadability, {
    type: "bar",
    data: {
      labels: [
        `very easy to read`,
        `easy to read`,
        `fairly easy to read`,
        `plain english`,
        `fairly difficult`,
        `difficult to read`,
        `very difficult to read`,
        `extremely difficult to read`,
      ],
      datasets: [
        {
          data: [
            veryEasy,
            easy,
            fairlyEasy,
            plainEnglish,
            fairlyDifficult,
            difficult,
            veryDifficult,
            extremelyDifficult,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(0, 123, 210, 0.2)",
            "rgba(89, 9, 235, 0.2)",
            "rgba(235, 126, 0, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip,
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: `Flesch–Kincaid readability score`,
            font: {
              size: 18,
              family: `Arial`,
            },
          },

          ticks: {
            font: {
              family: `Arial`,
              size: 12,
            },

            stepSize: 5,
          },
        },
        y: {
          title: {
            display: true,
            text: `number of documents`,
            font: {
              size: 18,
              family: `Arial`,
            },
          },
          beginAtZero: true,
          grace: "5%",
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },

            stepSize: 5,
          },
        },
      },
    },
  });
}

function getReadingTime(data) {
  const adjustedArr = data.map((element) =>
    element.title.slice(0, element.title.indexOf("—"))
  );
  const readingTimeArr = data.map((element) => element.readingTime);

  const ctxReadingTimeChart = document
    .getElementById("readingTimeChart")
    .getContext("2d");
  const textReadability = new Chart(ctxReadingTimeChart, {
    type: "line",
    data: {
      labels: adjustedArr,
      datasets: [
        {
          data: readingTimeArr,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: `reading time in minuits`,
            font: {
              size: 18,
              family: `Open Sans`,
            },
          },
          beginAtZero: true,
          grace: "1%",
          ticks: {
            stepSize: 1,
          },
        },
        x: {
          title: {
            display: true,
            text: `document title`,
            font: {
              size: 18,
              family: `Open Sans`,
            },
          },
          grace: "1%",
          ticks: {
            font: {
              family: `Arial`,
              size: 18,
            },
          },
        },
      },
    },
  });
}

$(document).ready(function () {
  fetch("/api/statistics", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text: `hey` }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderInteractivityTypeData(data);

      $($(`.trigger`).eq(0)).click(function (e) {
        setTimeout(() => {
          $($(`.chart-container`).eq(0)).toggle(`show`);
        }, 1000);
      });

      renderInteractivityLevelData(data);

      $($(`.trigger`).eq(1)).click(function (e) {
        setTimeout(() => {
          $($(`.chart-container`).eq(1)).toggle(`show`);
        }, 1000);
      });

      renderSemanticDensityData(data);

      $($(`.trigger`).eq(2)).click(function (e) {
        setTimeout(() => {
          $($(`.chart-container`).eq(2)).toggle(`show`);
        }, 1000);
      });

      getTextRichnessData(data);

      $($(`.trigger`).eq(3)).click(function (e) {
        setTimeout(() => {
          $($(`.chart-container`).eq(3)).toggle(`show`);
        }, 1000);
      });

      getTextReadabilityData(data);

      $($(`.trigger`).eq(4)).click(function (e) {
        setTimeout(() => {
          $($(`.chart-container`).eq(4)).toggle(`show`);
        }, 1000);
      });

      getReadingTime(data);

      $($(`.trigger`).eq(5)).click(function (e) {
        setTimeout(() => {
          $($(`.chart-container`).eq(5)).toggle(`show`);
        }, 1000);
      });
    });

  $("#navigation_2_dropdown_1").on("click", function () {
    $(".dropdown-menu").toggleClass("active");
  });

  $(".dropdown-menu div div").on("click", function () {
    $("#navigation_2_dropdown_1").text($(this).text());
    $(".dropdown-menu").toggleClass("active");
  });
});
