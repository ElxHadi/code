
$(document).ready(function () {

  $(`#role`).change(function (e) { 
    e.preventDefault();
    if( $(`#role :selected`).text() === 'Teacher'){

      $(`.studyLevelSelect`).css(`display`, `none`);
      $(`.gradeSelect`).css(`display`, `block`);
    }
    else{
      $(`.gradeSelect`).css(`display`, `none`);
      $(`.studyLevelSelect`).css(`display`, `block`);
    }
  });


  $(`#form`).submit(function (e) { 
    e.preventDefault();

    const userPassLength = $(`#password`).val().length

    const register = {
      email: email.value,
      password: password.value,
      role : $(`#role :selected`).text().toLowerCase(),
      grade :  $(`.gradeSelect`).css(`display`) !== `none` ? $(`#grade :selected`).text().toLowerCase()  : null,
      studyLevel : $(`.studyLevelSelect`).css(`display`) !== `none` ? $(`#studyLevel :selected`).text().toLowerCase()  : null
    };
  


    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "error") {
          success.style.display = "none";
          error.style.display = "block";
          error.innerText = data.error;
        } else {
          success.style.display = "block";
          error.style.display = "none";
          success.innerText = data.success;
        }
      });
    
  });
 


  })
