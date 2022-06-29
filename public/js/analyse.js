function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function renderTerms(strTerms) {
  if (strTerms.length < 0)
    return { id: 0, text: `not term was found`, disabled: true };
  const arrayTerms = strTerms.split(`,`);
  let tmp = [];
  let k = 0;
  for (let i = 0; i < arrayTerms.length; i++) {
    tmp.push({ id: k++, text: arrayTerms[i], disabled: true });
  }

  return tmp;
}

function enterValidUrl() {
  $(`#link-source-label`).css(`color`, `red`);
  $(`#link-source-label`).text(`Please enter a valid link...`);

  setTimeout(function () {
    $(`#link-source-label`).css(`color`, `black`);
    $(`#link-source-label`).text(`Link`);
    $(`#link-source`).val(``);
  }, 2000);
}

function renderResults(result) {
  const tmp = $(`.input-group`);

  // replace input with loading animation
  $(
    `<i class="fa-solid fa-hourglass-start fa-xl fa-flip" style="--fa-flip-x: 1; --fa-flip-y: 0; margin : 4em; color: black " ></i>`
  ).replaceAll(`.input-group`);
  $(`.fa-hourglass-start`).css({
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  });

  // then render the results

  setTimeout(function () {
    tmp.replaceAll(`.fa-hourglass-start`);
    let output = `<div class="column data" style = "border: none; padding :0px ; font-size: 1.2em; display : flex; flex-flow : column no-wrap ">`;
    output += `<div style="width: 60%;"> <p> Title 📕: ${result.title} </p>`;
    output += `<p>  Language 🗣️: ${result.language} </p>`;
    output += `<p>  Interactivity Type 🐢: ${result.interActivityType} </p>`;
    output += `<p>  Interactivity Level 🌡️: ${result.interactivityLevel} </p>`;
    output += `<p>  Semantic Density ⚖️: ${result.semanticDensity} </p>`;
    output += `<p> Text richness ✍️: ${result.textRichness} </p>`;
    output += `<p> Reading Time ⏱️: ${Math.round(result.readingTime)} min </p>`;
    output += `<p> Readbility Score 📖: ${result.textReadability} </p>`;
    output += `<p> Detected Terms (sorted by their frequency) 🔍:&nbsp</p><div class = "results"><select class="terms"></select></div>`;
    output += `</div>`;

    output += `<hr noshade align:"center" color : "gray">`;

    output += `<div class="satisfied" style = "display: flex; flex-direction: column; flex-wrap: nowrap; align-content: center; justify-content: flex-start; align-items: center;" >`;
    output += `<h2> Are you satisfied 😎 ? </h2><br>`;
    output += `<p style = "width: 50%">You can add it to the database if you want.</p><br>`;
    output += `<i class = "fa-solid fa-circle-plus fa-xl" style="color: green"></i>`;
    output += `</div>`;

    // FIXME: maybe it exist a better way ?
    output += `<p style = "display:none">${JSON.stringify(result)}</p>`;

    output += `</div>`;

    $(output).replaceAll(`.input-group`);

    // load terms of the analysed document scraper

    $(`.analyse .terms`).select2({
      placeholder: `click to show...`,
      width: "60%",
      data: renderTerms(result.detectedTerms),
      minimumResultsForSearch: Infinity,
    });

    // toogles animation for plus button
    $(".fa-circle-plus").hover(
      function () {
        $(this).addClass(`fa-beat`);
      },
      function () {
        $(this).removeClass(`fa-beat`);
      }
    );

    // adds the analysed resource to the database
    $(".fa-circle-plus").click(function (e) {
      e.preventDefault();
      //JSON.parse($(`.data p`).last().text());

      fetch(`/api/add`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ result, userId: $(`#userId`).text() }),
      })
        .then((res) => res.json())
        .then((data) => {
          $(
            `<h2 id="successfulADD" style="text-align: center;"> ✅ Succesfully added to the database </h2>`
          ).replaceAll(`.satisfied h2:nth-child(1)`);
          $(`#successfulADD`).fadeOut({ duration: 2500, queue: false });
          $(`.data`).fadeOut({ duration: 2500, queue: true });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    });
  }, 2000);
}

function loadResources() {
  fetch("/api/load", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ userId: $(`#userId`).text() }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resources) => {
      $(`.resource`).select2({
        allowClear: true,
        placeholder: `choose one of your resource...`,
        minimumResultsForSearch: Infinity,
        width: `100%`,
        data: resources,
      });
    });
}

function renderData(data) {
  if (data.length < 0) return;

  let output = `<div class="column data" style = "border: none; padding :0px ; font-size: 1.2em; display : flex; flex-flow : column no-wrap ">`;

  output += `<div style="width: 67%;"> <p>Title 📕: ${data[0].title} </p>`;
  output += `<p> Language 🗣️: ${data[0].language} </p>`;
  output += `<p> Interactivity Type 🐢: ${data[0].interActivityType} </p>`;
  output += `<p> Interactivity Level 🌡️: ${data[0].interactivityLevel} </p>`;
  output += `<p> Semantic Density ⚖️: ${data[0].semanticDensity} </p>`;
  output += `<p> Text richness ✍️: ${data[0].textRichness} </p>`;
  output += `<p> Reading Time ⏱️: ${Math.round(data[0].readingTime)} min </p>`;
  output += `<p> Readbility Score 📖: ${data[0].textReadability} </p>`;
  output += `<p> Detected Terms (sorted by their frequency) 🔍:&nbsp</p><div class = "results"><select class="terms"></select></div>`;
  output += `</div>`;

  output += `<hr noshade align:"center" color : "gray"  width : "50%">`;

  output += `<div class="not-satisfied" style = "display: flex; flex-direction: column; flex-wrap: nowrap; align-content: center; justify-content: flex-start; align-items: center;" >`;
  output += `<h2 id="notIntrested"> Not interested anymore 😅 ? </h2><br>`;
  output += `<p style = "width: 50%">You can delete it from the database if you want.</p><br>`;
  output += `<i class="fa-solid fa-circle-xmark fa-xl" style= "color: red"></i>`;
  output += `</div>`;

  output += `</div>`;

  $(output).replaceAll(`.lookUp`);

  $(`.check .terms`).select2({
    placeholder: `click to show...`,
    width: "60%",
    data: renderTerms(data[0].detectedTerms),
    minimumResultsForSearch: Infinity,
  });
}

function deleteFromDB(title) {
  const abrTitle = title.slice(0, 25) + `...`;
  const youSure = confirm(`Are you sure you want to delete ${abrTitle}`);

  if (!youSure) return;

  fetch(`/api/remove`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      $(
        `<h2 id="successfulDELETE" style="text-align: center;"> ❌ Succesfully deleted from the database </h2>`
      ).replaceAll(`.not-satisfied h2:nth-child(1)`);
      $(`#successfulDELETE`).fadeOut({
        duration: 2500,
        queue: false,
      });

      $(`.data`).fadeOut({ duration: 2500, queue: true });

      // wait a bit then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
}

$(document).ready(function () {
  $(`.analyse .fa-arrow-down`).on(`click`, function () {
    // change arrow direction
    $(this).toggleClass(`fa-arrow-up`);

    // toogle display
    $(`.input-group`).length !== 0
      ? $(`.input-group`).toggleClass(`hide-dont-keep`)
      : $(`.analyse .data`).toggleClass(`hide-dont-keep`);

    // empty the input
    $(`#link-source`).val(``);
  });

  $(`.input-group`).focusout(function () {
    const resourceUrl = $(`#link-source`).val();

    if (!isValidHttpUrl(resourceUrl)) enterValidUrl();
    else {
      // send to server
      fetch(`/api/analyse`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ resourceUrl }),
      })
        .then((res) => {
          return res.json();
        })
        .then((scrapedResource) => {
          renderResults(scrapedResource);
        })
        .catch((err) => console.log(err));
    }
  });

  $(`.check .fa-arrow-down`).on(`click`, function () {
    // change arrow direction
    $(this).toggleClass(`fa-arrow-up`);

    // toogle display
    $(`.lookUp`).length !== 0
      ? $(`.lookUp`).toggleClass(`hide-dont-keep`)
      : $(`.check .data`).toggleClass(`hide-dont-keep`);

    // Load resources
    loadResources();
  });

  $(".resource").on(`change`, () => {
    const title = $(`.resource :selected`).text();

    fetch(`/api/view`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // get data first then dispaly information
        setTimeout(() => {
          renderData(data);
        }, 2000);

        // then redirect user to resource page
        setTimeout(() => {
          window.open(data[0].url, "_blank").focus();
        }, 2000);

        setTimeout(() => {
          // then add beat effect on delete button
          $(".fa-circle-xmark").hover(
            function () {
              $(this).addClass(`fa-beat`);
            },
            function () {
              $(this).removeClass(`fa-beat`);
            }
          );

          // then if the delete button is clicked
          $(`.fa-circle-xmark`).click(function (e) {
            e.preventDefault();
            deleteFromDB(title);
          });
        }, 2000);
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
