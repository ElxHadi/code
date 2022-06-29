



$(document).ready(function () {
  $('#navigation_2_dropdown_1').on("click", function(){
      $('.dropdown-menu').toggleClass("active");
  });
  
    $('.dropdown-menu div div').on('click' , function(){	$('#navigation_2_dropdown_1').text($(this).text()); 
    $('.dropdown-menu').toggleClass("active");																										
    })


    $(`form`).submit(function (e) { 
      e.preventDefault();
      const login = {
        email: email.value,
        password: password.value,
      };
    
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(login),
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
            error.style.display = "none";
            success.style.display = "block";
            success.innerText = data.success;
            
          }


          

      fetch("/api/getUserRole", {
        method: "POST",
        body: JSON.stringify({email: email.value}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res =>res.json()).then(role=>{

        const userRole = role[0].role;

        
        if(userRole === `teacher`)
        setTimeout(() => {
          window.location.href = `/analyse` 
        }, 2000);
        else{
          setTimeout(() => {
            window.location.href = `/search` 
          }, 2000);
        }

      })
      


        });
    });
});