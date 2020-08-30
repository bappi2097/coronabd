$(document).ready(() => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  $(".navbar").css("border-color", "#" + randomColor);
  $("#navbar-burger").click(() => {
    let navbarBurger = $("#navbar-burger");
    let navMenu = $("#navMenu");
    navbarBurger.hasClass("is-active")
      ? navbarBurger.removeClass("is-active")
      : navbarBurger.addClass("is-active");
    navMenu.hasClass("is-active")
      ? navMenu.removeClass("is-active")
      : navMenu.addClass("is-active");
  });
  $.get("https://corona.lmao.ninja/v3/covid-19/all", () => {})
    .done((response) => {
      $("#world-cases").text(covertEToB(response.cases));
      $("#world-treatment").text(
        covertEToB(response.cases - (response.recovered + response.deaths))
      );
      $("#world-recovered").text(covertEToB(response.recovered));
      $("#world-deaths").text(covertEToB(response.deaths));
    })
    .fail(() => {
      toastr.danger("something went wrong!");
    });
  $.get("https://corona.lmao.ninja/v3/covid-19/countries/bangladesh", () => {})
    .done((response) => {
      $("#bd-cases").text(covertEToB(response.cases));
      $("#bd-treatment").text(
        covertEToB(response.cases - (response.recovered + response.deaths))
      );
      $("#bd-recovered").text(covertEToB(response.recovered));
      $("#bd-deaths").text(covertEToB(response.deaths));
      $("#progress-recovered").width(
        percent(response.cases, response.recovered) + "%"
      );
      $("#progress-death").width(
        percent(response.cases, response.deaths) + "%"
      );
      $("#progress-treatment").width(
        percent(
          response.cases,
          response.cases - (response.recovered + response.deaths)
        ) + "%"
      );
    })
    .fail(() => {
      toastr.danger("something went wrong!");
    });
});
function covertEToB(number) {
  return new Number(number).toLocaleString("bn-BD");
}
function percent(total, num) {
  return (num / total) * 100;
}
