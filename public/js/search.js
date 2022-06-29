function newEl(type, attrs = {}) {
  const el = document.createElement(type);
  for (let attr in attrs) {
    const value = attrs[attr];
    if (attr === `innerText`) el.innerText = value;
    else el.setAttribute(attr, value);
  }
  return el;
}

function isValid(choices) {
  return !(
    choices.desiredInteractivityLevel === "" ||
    choices.desiredInteractivityType === "" ||
    choices.desiredReadbilityScore === "" ||
    choices.desiredReadingTime === "1" ||
    choices.desiredSemanticDensity === "" ||
    choices.desiredTerms === "" ||
    choices.desiredTextRichnessLevel === ""
  );
}

$(document).ready(function () {
  // Core Search Function
  function searchEng() {
    $("#searchUpdate").html("");

    const desiredTerms = $("#terms :selected").text();
    const desiredReadingTime = $(`#readingTime`).val(); // default to 1
    const desiredInteractivityType = $(`#interactivity-type :selected`).val(); // default active
    const desiredInteractivityLevel = $(`#interactivity-level :selected`).val();
    const desiredSemanticDensity = $(`#semantic-density :selected`).val();
    const desiredTextRichnessLevel = $(`#textRichness-Level :selected`).val();
    const desiredReadbilityScore = $(`#readbility-score :selected`).val();
    const userId = $(`#userId`).text();
    
    const desiredResource = {
      desiredTerms,
      desiredReadingTime,
      desiredInteractivityType,
      desiredInteractivityLevel,
      desiredSemanticDensity,
      desiredTextRichnessLevel,
      desiredReadbilityScore,
      userId
    };

   
    if (!isValid(desiredResource)) {
      const driver = new Driver({
        allowClose: false,
        animate: true,
      });
      driver.highlight({
        element: ".center-form",
        popover: {
          title: "Hold on",
          description: "you forgot to set your preferences 😅",
          position: `buttom`,
        },
      });

      return;
    }

    fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(desiredResource),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setTimeout(_noResult, 2000);
          return;
        }

        $(`#seperator`).remove();
        $(`#nbDocs`).remove();

        $(`<hr id = "seperator">`).insertBefore(`#searchUpdate`);
        $(
          `<h4 id= "nbDocs">${data.length} document(s) found...</h4>`
        ).insertBefore(`#searchUpdate`);

        let output = '<div class="list-group">';

        // data here is displayed to the user

        $.each(data, function (key, val) {
          output +=
            '<div class="list-group-item">' +
            `<a target= "_blank" href="${val.url}">` +
            val.url +
            "</a>" +
            '<h4 class="list-group-item-heading">' +
            val.title +
            "</h4>";
        });

        output += "</div>";
        $("#searchUpdate").html(output);
        return true;
      })
      .catch((err) => console.log(err));
  }

  function _noResult() {
    const notFoundMsg =
      '<div class="list-group"><div style="text-align:center" class="list-group-item"><h4 class="list-group-item-heading">No Result 😐!</h4><p>Sorry, your search query returned no results...</p></div></div>';
    $(`#searchUpdate`).html(notFoundMsg);
    return;
  }

  //  Search
  $("#searchButton").click(function () {
    searchEng(); // nice done 😆
  });

  // Clear search field and results

  $("#clearButton").click(function () {
    $("#terms").val(null).trigger("change");
    $("#searchUpdate").html("");
  });

  // Custom search overlay

  $(`#customSearch`).on(`click`, function () {
    const overlay = new Overlay({ opened: false, closable: false });
    const choices = document.querySelector(`.search-params`);

    const closeBtn = newEl(`i`, { class: `fa-solid fa-circle-xmark fa-2xl` });
    closeBtn.onclick = function close() {
      choices.style.display = `none`;
      document.body.append(choices);
      overlay.close();
    };
    closeBtn.onmouseenter = function addBeat() {
      $(`.fa-circle-xmark`).addClass(`fa-beat`);
    };

    closeBtn.onmouseleave = function removeBeat() {
      $(`.fa-circle-xmark`).removeClass(`fa-beat`);
    };

    choices.style.display = `flex`;
    overlay.content.append(choices, closeBtn);
    overlay.open();
  });

  // Selec2 X domaine terms
  $(".terms-select").select2({
    width: "80%",
    tags: true,
    placeholder: `ex: data structures`,
    tokenSeparators: [","],
    maximumSelectionLength: 4,
    createTag: function (params) {
      const term = $.trim(params.term);
      if (term === "") {
        return null;
      }
      return {
        id: term,
        text: term + ` `,
        newTag: true,
      };
    },
    language: {
      noResults: function (params) {
        return "That's a miss.";
      },
    },
  });

  $(`.fa-gear`).hover(
    function () {
      $(this).addClass(`fa-spin`);
    },
    function () {
      $(this).removeClass("fa-spin");
    }
  );

  $(`.fa-magnifying-glass`).hover(
    function () {
      $(this).addClass(`fa-beat`);
    },
    function () {
      $(this).removeClass("fa-beat");
    }
  );
  $('#navigation_2_dropdown_1').on("click", function(){
    $('.dropdown-menu').toggleClass("active");
});

  $('.dropdown-menu div div').on('click' , function(){	$('#navigation_2_dropdown_1').text($(this).text()); 
  $('.dropdown-menu').toggleClass("active");																										
  })

});
