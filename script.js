class Calculator {
  constructor(previousOperandTextElemment, currentOperandTextElemment) {
    this.previousOperandTextElemment = previousOperandTextElemment
    this.currentOperandTextElemment = currentOperandTextElemment
    this.clear()
  }

  clear() {
    this.curentOperand = ""
    this.previousOperand = ""
    this.operand = undefined
  }

  delete() {
   this.curentOperand = this.curentOperand.toString().slice(0,-1)
   

  }

  appendNumber(number) {
    if (number === "." && this.curentOperand.includes(".")) return
    this.curentOperand = this.curentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.curentOperand === "") return
    if (this.previousOperand !== "") {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.curentOperand
    this.curentOperand = ""

  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.curentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
      computation=prev * current
      break
      case "/":
      computation=prev / current
      break
      default:
        return

    }
this.curentOperand = computation
this.operation = undefined
this.previousOperand =""
  }
getDisplayNumber(number){
  const stringNumber = number.toString()
  const integrerDigits = parseFloat (stringNumber.split(".")[0])
  const decimalDigits = stringNumber.split(".")[1]
  let integreDisplay
  if(isNaN(integrerDigits)){
    integreDisplay=""
  } else {
    integreDisplay=integrerDigits.toLocaleString("en",{
      maximumFractionDigits: 0})
    }
    if (decimalDigits !=null){
      return `${integreDisplay}.${decimalDigits}`
    } else  {
      return integreDisplay
    }
}

  updateDispaly() {
    this.currentOperandTextElemment.innerText = 
    this.getDisplayNumber(this.curentOperand)
    if (this.operation != null) {
      this.previousOperandTextElemment.innerText =
     ` ${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElemment.innerText=""
  }
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButtons = document.querySelector("[data-equals]")
const deleteButtons = document.querySelector("[data-delete]")
const allClearButtons = document.querySelector("[data-all-clear]")
const previousOperandTextElemment = document.querySelector("[data-previos-operand]")
const currentOperandTextElemment = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousOperandTextElemment,
  currentOperandTextElemment)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDispaly()
  })

})

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDispaly()
  })
})
equalsButtons.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDispaly()
})
allClearButtons.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDispaly()
})

deleteButtons.addEventListener("click", button => {
  calculator.delete()
  calculator.updateDispaly()
})
