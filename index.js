let stepContainer = document.querySelector("#steps-parent");
let nextButton = document.getElementById("next-btn");
let currentStep = 1;
let stepChildren = stepContainer.children;
let contactSection = document.querySelector(".contacts");
let formContent = document.querySelector(".input-contact");
let dynamicContent = document.querySelector(".changablePart");
let backButton = document.querySelector(".back-btn");
let secondPage = document.querySelector(".secondPage");
let thirdPageCards = document.querySelectorAll(".first-portion");
let thirdPage = document.querySelector(".thirdPage");
let fourthPage = document.querySelector(".fourthPage");
let subscriptionContainer = document.querySelector(".fourth-page-container");
let totalAmount = 12;
let selectedPlans = [];
let subscriptionType = "Arcade";
let checkoutAddon = document.getElementById("checkout-addons");

secondPage.addEventListener("click", (event) => {
  let selectedCard = event.target.closest(".first, .second, .third");
  if (selectedCard) {
    let priceDetails = selectedCard.querySelector(".price-info");
    // console.log(priceDetails);
    if (priceDetails) {
      subscriptionType = priceDetails.children[0].textContent;
      let price = priceDetails.children[1].textContent;
      price = price.match(/\d+/)[0];
      totalAmount = parseInt(price) - totalAmount + totalAmount;
    }
  }
});

thirdPage.addEventListener("click", (event) => {
  if (event.target != thirdPage) {
    let label = event.target.closest("label");
    if (!label) return;
    let checkbox = label.querySelector(".online-checkbox");
    let card = label.querySelector(".third-page-card");
    let cost = card.querySelector(".cost");
    // console.log(card);
    if (checkbox) {
      event.preventDefault();
      checkbox.checked = !checkbox.checked;
      let span = card.querySelector("span");
      if (checkbox.checked) {
        card.classList.add("border-[3px]", "border-[var(--PurplishBlue)]");
        let price = cost.textContent;
        let number = price.match(/\d+/)[0];
        number = parseInt(number);
        totalAmount = totalAmount + number;
        let subscriptionText = document.createElement("span");
        subscriptionText.classList.add(
          "text-[12px]",
          "text-[var(--CoolGray)]",
          "font-medium",
          "p-[2px]"
        );
        let div = document.createElement("div");
        let priceSpan = document.createElement("span");
        priceSpan.textContent = cost.textContent;
        priceSpan.classList.add("pr-[4px]", "font-medium", "text-[15px]");
        subscriptionText.textContent = span.textContent;
        div.appendChild(subscriptionText);
        div.appendChild(priceSpan);
        div.classList.add("flex", "justify-between");
        console.log(div);
        selectedPlans.push(div);
      } else {
        card.classList.remove("border-[3px]", "border-[var(--PurplishBlue)]");
        let price = cost.textContent;
        let number = price.match(/\d+/)[0];
        number = parseInt(number);
        totalAmount = totalAmount - number;
        selectedPlans = selectedPlans.filter((text) => {
          let addOnsText = text.querySelector("span");
          if (text.textContent == span.textContent) {
            console.log("yes");
            return addOnsText.textContent != span.textContent;
          }
        });
        console.log(selectedPlans);
      }
      let subscriptionDiv = document.createElement("div");
      subscriptionDiv.setAttribute("id", "subscription-name-preview");
      subscriptionDiv.classList.add("flex", "flex-col");
      // checkoutAddon.innerHTML = "";
      selectedPlans.forEach((element) => {
        subscriptionDiv.appendChild(element);
      });

      if (subscriptionContainer.querySelector("#subscription-name-preview")) {
        let existingDiv = subscriptionContainer.querySelector(
          "#subscription-name-preview"
        );
        existingDiv.remove();
      }

      subscriptionContainer.appendChild(subscriptionDiv);
    }
  }
});
let headingElements = contactSection.children[0].children;
headingElements = Array.from(headingElements);
function areAllInputsFilled() {
  let inputs = document.querySelectorAll("input[required]");
  inputs = Array.from(inputs);
  // console.log(inputs[0].value);
  // let warningTab = document.querySelectorAll(".warning");
  inputs.forEach((element) => {
    if (element.value == "") {
      let warningTab = element.parentElement.children[0].children[1];
      warningTab.classList.remove("hidden");
    } else {
      let warningTab = element.parentElement.children[0].children[1];
      warningTab.classList.add("hidden");
    }
  });
  inputs = inputs.every((input) => input.value.trim() !== "");
  return inputs;
}
nextButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(areAllInputsFilled());
  if (!areAllInputsFilled() && currentStep < 2) {
    return;
  }

  if (currentStep < stepChildren.length) {
    let currentStepElement = stepChildren[currentStep].children[0];
    currentStepElement.classList.remove("bg-step-inactive");
    currentStepElement.classList.add("bg-step-active");
    currentStepElement.children[0].style.color = "black";
    let previousStepElement = stepChildren[currentStep - 1].children[0];
    previousStepElement.classList.remove("bg-step-active");
    previousStepElement.children[0].style.color = "";
    previousStepElement.classList.add("bg-step-inactive");
    let newPage = dynamicContent.children[currentStep];
    backButton.classList.remove("opacity-0", "pointer-events-none");
    let oldPage = dynamicContent.children[currentStep - 1];
    newPage.classList.remove("hidden");
    oldPage.classList.add("hidden");
    currentStep++;
    updateHeading(currentStep - 1);
    if (currentStep == 4) {
      let price = fourthPage.querySelector(".price-sum");
      let checkoutPrice = fourthPage.querySelector(".checkout-price");
      price.textContent = `$ ${totalAmount}/mo`;
      checkoutPrice.textContent = `$ ${totalAmount}/mo`;
      let subscription = fourthPage.querySelector(".subscription-name");
      subscription.children[0].textContent = subscriptionType;
      // console.log(subscription);
    }
    // console.log(currentStep);
  }
});

if (backButton && !backButton.disabled) {
  backButton.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      let currentStepSection = stepChildren[currentStep].children[0];
      currentStepSection.classList.remove("bg-step-active");
      currentStepSection.children[0].style.color = "";
      currentStepSection.classList.add("bg-step-inactive");
      let oldStepSection = stepChildren[currentStep - 1].children[0];
      oldStepSection.classList.remove("bg-step-inactive");
      oldStepSection.classList.add("bg-step-active");
      // console.log(oldStepSection);

      let currentPage = dynamicContent.children[currentStep];
      let oldPage = dynamicContent.children[currentStep - 1];
      currentPage.classList.add("hidden");
      oldPage.classList.remove("hidden");
      if (currentStep == 1) {
        backButton.classList.add("opacity-0", "pointer-events-none");
      }
    }
    updateHeading(currentStep - 1);
  });
}
let formData = [];
let contactHeadings = [
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
function updateHeading(index) {
  headingElements[0].textContent = contactHeadings[index]["first-heading"];
  headingElements[1].textContent = contactHeadings[index]["second-heading"];
}
