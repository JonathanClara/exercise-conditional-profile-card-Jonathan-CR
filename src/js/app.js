import "../style/index.css";

/**
 * EDIT ONLY INSIDE THIS RENDER FUNCTION
 * This function is called every time the user changes types or changes any input
 *
 * {
 * includeCover: true, // if includeCover is true the algorithm should show the cover image
 * background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
 * avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
 * socialMediaPosition: "right", // social media bar position (left or right)
 *
 * twitter: null, // social media usernames
 * github: null,
 * linkedin: null,
 * instagram: null,
 *
 * name: null,
 * lastName: null,
 * role: null,
 * country: null,
 * city: null
 * }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Determine social media position class
  const socialMediaClass =
    variables.socialMediaPosition === "left"
      ? "position-left"
      : "position-right";

  // Render social media links only if the username is provided
  const renderSocialMedia = () => {
    let links = "";
    if (variables.twitter)
      links += `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`;
    if (variables.github)
      links += `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`;
    if (variables.linkedin)
      links += `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`;
    if (variables.instagram)
      links += `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`;
    return `<ul class="${socialMediaClass}">${links}</ul>`;
  };

  // Render name and last name if provided
  const renderName = () => {
    if (variables.name && variables.lastName) {
      return `<h1>${variables.name} ${variables.lastName}</h1>`;
    } else if (variables.name) {
      return `<h1>${variables.name}</h1>`;
    }
  };

  const renderLocation = () => {
    let location = [];
    if (variables.city) location.push(variables.city);
    if (variables.country) location.push(variables.country);
    return `<h3>${location.join(", ")}</h3>`;
  };

  const renderRole = () => {
    return `<h2>${variables.role || ""}</h2>`;
  };

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
        ${cover}
        <img src="${variables.avatarURL}" class="photo" />
        ${renderName()}
        ${renderRole()}
        ${renderLocation()}
        ${renderSocialMedia()}
      </div>
    `;
}
/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background:
      "https://img.freepik.com/foto-gratis/arbol-acacia-fondo-cielo-azul-parque-nacional-etosha-namibia-sudafrica_1150-21611.jpg?semt=ais_hybrid&w=740",
    // this is the url for the profile avatar
    avatarURL:
      "https://cdn3d.iconscout.com/3d/premium/thumb/hombre-pelo-mohawk-9606857-7759145.png?f=webp",
    // social media bar position (left or right)
    socialMediaPosition: "right",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker, .input-text").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input (both pickers and text inputs)
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
