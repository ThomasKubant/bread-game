var moneyBtn = document.querySelector(".funny-button");
var cashOutBtn = document.querySelector(".cash-out-button");
var resetBtn = document.querySelector(".reset-button");
var balance = document.querySelector(".balance");
var dead = document.querySelector(".die-alert");
var chanceEl = document.querySelector(".chance");
var clickEl = document.querySelector(".click-count")
var bestBreadEl = document.querySelector(".best-bread");
var prevBreadEl = document.querySelector(".prev-bread");
var chanceOfProgEl = document.querySelector(".chance-of-progress")
var clickCount = 0;
var bestBread = 0;
var money = 0;
var chance = 1;

moneyBtn.addEventListener("click", () => play());
document.addEventListener("keyup", function(e) {
  console.log(e);
  if(e.keyCode === 13) {
    e.preventDefault;
    moneyBtn.click();
  }
});
cashOutBtn.addEventListener("click", () => cashOut());
resetBtn.addEventListener("click", () => reset());
document.addEventListener("keyup", function(e) {
  if(e.keyCode === 82) {
    e.preventDefault;
    resetBtn.click();
  }
})

function calcChanceOfClicks(clicks) {
  let inverse;
  let odds;
  let chance = 1;
  odds = 100 - chance;
  for(let i = 1; i <= clicks; i++) {
    if(i > 1) {
      inverse = 100 - chance;
      odds = (odds * inverse) / 100;
    }
    chance *= 1.05;
  }
  return odds;
}

function reset() {
  money = 0;
  chance = 1;
  clickCount = 0;
  moneyBtn.className = "funny-button";
  cashOutBtn.className = "cash-out-button";
  dead.textContent = ""
  clickEl.textContent = "Click count: 0"
  balance.textContent = "Current breadage: $0";
  chanceEl.textContent = "Chance of death: 1%";
  resetBtn.className = "reset-button"
}

function cashOut() {
  if (cashOutBtn.className != "dead-cash-button") {
    if (money > bestBread || bestBread === null) {
      bestBreadEl.textContent =
        "Your best breadage was: $" +
        money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      bestBread = money;
    }
    prevBreadEl.textContent =
      "Your previous breadage was : $" +
      money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    money = 0;
    balance.textContent = "Current breadage: $" + 0;
    reset()
  }
}

function die() {
  dead.textContent =
    "You died with $" + money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  moneyBtn.className = "dead-cash-button";
  resetBtn.className = "active-reset-button";
  cashOutBtn.className = "dead-cash-button";
  let chanceOfProg = calcChanceOfClicks(clickCount).toFixed(3);
  chanceOfProgEl.textContent = "The odds of making it this far is: " + chanceOfProg + "%";

}

function play() {
  if (moneyBtn.className != "dead-cash-button") {
    if (money === 0) {
      money = 1;
      chanceEl.textContent = "Chance of death: " + chance.toFixed(2) + "%";
      balance.textContent = "Current breadage: $" + money;
      clickCount++;
      clickEl.textContent = "Click count: 1"
      return
    }
    if (Math.random() * 100 < chance) {
      die();
    } else {
      money *= 2;
      chance *= 1.05;
      chanceEl.textContent = "Chance of death: " + chance.toFixed(2) + "%";
      clickCount++;
      clickEl.textContent = "Click count: " + clickCount
    }
    let moneyDisplay = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    balance.textContent = "Current breadage: $" + moneyDisplay;
  }
}
