let stepInfo = document.querySelector("#steps-parent");
let nextStepBtn = document.getElementById("next-btn");
let activeStepCounter = 1;
let stepInfoChildren = stepInfo.children;
let contactSection = document.querySelector(".contacts");
let formSectionContent = document.querySelector(".input-contact");
let changablePart = document.querySelector(".changablePart");
let backBtn = document.querySelector(".back-btn");
let thirdPageCardElement = document.querySelectorAll(".first-portion");
let thirdPage = document.querySelector(".thirdPage");
let fourthPage = document.querySelector(".fourthPage");
let totalCost = 0;

// console.log(thirdPage.children);
// console.log(thirdPageCardElement);

thirdPage.addEventListener("click", (e) => {
  if (e.target != thirdPage) {
    // let lable = e.target.parentElement;
    let label = e.target.closest("label");
    if (!label) return;

    let checkbox = label.querySelector(".online-checkbox");
    let card = label.querySelector(".third-page-card");
    let cost = card.querySelector(".cost");
    // console.log(cost.textContent);
    // if(card){
    //   card.classList.add("border-[3px]", "border-[var(--PurplishBlue)]");
    // }
    // console.log(checkbox);
    console.log(card);
    if (checkbox) {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        card.classList.add("border-[3px]", "border-[var(--PurplishBlue)]");
        let price = cost.textContent;
        let number = price.match(/\d+/)[0];
        number = parseInt(number);
        totalCost = totalCost + number;
      } else {
        card.classList.remove("border-[3px]", "border-[var(--PurplishBlue)]");
        let price = cost.textContent;
        let number = price.match(/\d+/)[0];
        number = parseInt(number);
        totalCost = totalCost - number;
      }
    }
    // let checkbox = lable.querySelector(".online-checkbox");
    // console.log(checkbox.checked);
    // // checkbox.checked = true;
    // if (checkbox.checked) {
    //   checkbox.checked = false;
    // } else {
    //   checkbox.checked = true;
    // }
    // console.log(checkbox.checked);
  }
  // console.log(e.target ! =);
});

// let

// console.log(changablePart.children);
// console.log(stepInfoChildren);

// console.log(contactSection.children[0]);
// console.log(formSectionContent);
// console.log(secondPageContent);

let heading = contactSection.children[0].children;
heading = Array.from(heading);
// console.log(heading);
// console.log(stepInfo);

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
  // console.log(inputs[0].value);
  // let warningTab = document.querySelectorAll(".warning");
  inputs.forEach((ele) => {
    if (ele.value == "") {
      let warningTab = ele.parentElement.children[0].children[1];
      warningTab.classList.remove("hidden");
    } else {
      let warningTab = ele.parentElement.children[0].children[1];
      warningTab.classList.add("hidden");
    }
  });
  inputs = inputs.every((input) => input.value.trim() !== "");
  // console.log(inputs);

  return inputs;
}

nextStepBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(areAllInputsFilled());
  if (!areAllInputsFilled() && activeStepCounter < 2) {
    // let warningTab = document.querySelectorAll(".warning");
    // warningTab.forEach((ele) => {
    //   ele.classList.remove("hidden");
    // });
    // console.log(warningTab.children);

    return;
  }

  if (activeStepCounter < stepInfoChildren.length) {
    let currentStep = stepInfoChildren[activeStepCounter].children[0];
    currentStep.classList.remove("bg-step-inactive");
    currentStep.classList.add("bg-step-active");
    currentStep.children[0].style.color = "black";
    let prevStep = stepInfoChildren[activeStepCounter - 1].children[0];
    prevStep.classList.remove("bg-step-active");
    prevStep.children[0].style.color = "";
    prevStep.classList.add("bg-step-inactive");
    let newPage = changablePart.children[activeStepCounter];
    backBtn.classList.remove("opacity-0", "pointer-events-none");
    let oldPage = changablePart.children[activeStepCounter - 1];
    newPage.classList.remove("hidden");
    oldPage.classList.add("hidden");
    activeStepCounter++;
    headingChangeFunction(activeStepCounter - 1);
    if (activeStepCounter == 4) {
      let price = fourthPage.querySelector(".price-sum");
      let checkOutPrice = fourthPage.querySelector(".checkout-price");
      // console.log(price);
      price.textContent = `$ ${totalCost}/mo`;
      checkOutPrice.textContent = `$ ${totalCost}/mo`;
    }
    // console.log(activeStepCounter);
  }
});

if (backBtn && !backBtn.disabled) {
  backBtn.addEventListener("click", () => {
    if (activeStepCounter > 1) {
      activeStepCounter--;
      let currentSteperSection =
        stepInfoChildren[activeStepCounter].children[0];
      currentSteperSection.classList.remove("bg-step-active");
      currentSteperSection.children[0].style.color = "";
      currentSteperSection.classList.add("bg-step-inactive");
      let oldSteperSection =
        stepInfoChildren[activeStepCounter - 1].children[0];
      oldSteperSection.classList.remove("bg-step-inactive");
      oldSteperSection.classList.add("bg-step-active");
      // console.log(oldSteperSection);

      let currentPage = changablePart.children[activeStepCounter];
      let oldPage = changablePart.children[activeStepCounter - 1];
      currentPage.classList.add("hidden");
      oldPage.classList.remove("hidden");
      if (activeStepCounter == 1) {
        backBtn.classList.add("opacity-0", "pointer-events-none");
      }
    }
    headingChangeFunction(activeStepCounter - 1);
  });
}
function headingChangeFunction(num) {
  heading[0].textContent = contactHeadingArray[num]["first-heading"];
  heading[1].textContent = contactHeadingArray[num]["second-heading"];
}
