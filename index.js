let stepInfo = document.querySelector("#steps-parent");
let nextStepBtn = document.getElementById("next-btn");
let activeStepCounter = 1;
let stepInfoChildren = stepInfo.children;
let contactSection = document.querySelector(".contacts");
let formSectionContent = document.querySelector(".input-contact");
// console.log(contactSection.children[0]);
console.log(formSectionContent);

let heading = contactSection.children[0].children;
heading = Array.from(heading);
console.log(heading);

let formDataArray = [];
let contactHeadingArray = [
  {
    "first-heading": "Personal info",
    "second-heading": "Please Provide Your name, email address, phone number",
  },
  {
    "first-heading": "Select Your Plan",
    "second-heading": "You have a option of monthly and yearly billing",
  },
  {
    "first-heading": "Pick add-ons",
    "second-heading": "Add-ons help enhance your gaming experience",
  },
  {
    "first-heading": "Finishing up",
    "second-heading": "Double Check Everything looks OK before confirming",
  },
];
// contactHeadingArray.push(contactSection.children[0]);
// contactArray.push("");
function areAllInputsFilled() {
  let inputs = document.querySelectorAll("input[required]");
  inputs = Array.from(inputs);
  inputs = inputs.every((input) => input.value.trim() !== "");
  return inputs;
}

nextStepBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(areAllInputsFilled());
  if (!areAllInputsFilled()) {
    return;
  }

  if (activeStepCounter < stepInfoChildren.length) {
    let currentStep = stepInfoChildren[activeStepCounter].children[0];
    currentStep.classList.add("bg-step-active");
    currentStep.children[0].style.color = "black";
    let prevStep = stepInfoChildren[activeStepCounter - 1].children[0];
    prevStep.classList.remove("bg-step-active");
    prevStep.children[0].style.color = "";
    prevStep.classList.add("bg-step-inactive");
    activeStepCounter++;
    headingChangeFunction(activeStepCounter - 1);
  }
});

function headingChangeFunction(num) {
  heading[0].textContent = contactHeadingArray[num]["first-heading"];
  heading[1].textContent = contactHeadingArray[num]["second-heading"];
}
