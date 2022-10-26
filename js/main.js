import '../sass/style.scss'

const previous_screen_element = document.querySelector(
    '#screen__previous__operand'
)
const current_screen_element = document.querySelector(
    '#screen__current__operand'
)
const all_clear_BTN = document.querySelector('.all-clear-btn')
const numbers_BTNS = document.querySelectorAll('.numbers-btn')
const operators_BTNS = document.querySelectorAll('.operator-btn')
const delete_BTN = document.querySelector('.delete-btn')
const equals_BTN = document.querySelector('.equals-btn')

function Calculator(previousTextElement, currentTextElement) {
    Object.assign(this, {
        previousTextElement,
        currentTextElement,

        allClear() {
            this.previousNumber = ''
            this.currentNumber = ''
            this.operator = undefined
        },

        deleteNumber() {
            this.currentNumber = this.currentNumber.slice(0, -1)
        },

        calculation() {
            let sumResult, sumOperators, previousParse, currentParse

            previousParse = Number(this.previousNumber)
            currentParse = Number(this.currentNumber)

            sumOperators = {
                '+': () => previousParse + currentParse,
                '-': () => previousParse - currentParse,
                '/': () => previousParse / currentParse,
                '*': () => previousParse * currentParse,
            }

            sumResult = sumOperators[this.operator]()

            this.currentNumber = sumResult
            this.previousNumber = ''
            this.operator = undefined
        },

        chooseOperators(operator) {
            if (this.previousNumber != '') this.calculation()

            this.operator = operator
            this.previousNumber = this.currentNumber
            this.currentNumber = ''
        },

        putNumberOnScreen(number) {
            if (this.currentNumber.includes('.') && number === '.') return

            if (this.currentNumber == '' && number == '.') number = `0${'.'}`

            this.currentNumber = `${this.currentNumber}${number.toString()}`
        },

        formatScreenNumber(number) {
            return new Intl.NumberFormat('en-US').format(number)
        },

        updateScreenContent() {
            this.previousTextElement.textContent = `${this.formatScreenNumber(
                this.previousNumber
            )} ${this.operator || ''}`
            this.currentTextElement.textContent = this.formatScreenNumber(
                this.currentNumber
            )
        },
    })

    this.allClear()
    this.updateScreenContent()
}

const calculator = new Calculator(
    previous_screen_element,
    current_screen_element
)

//clear content
all_clear_BTN.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateScreenContent()
})

//enabling numbers buttons
numbers_BTNS.forEach(item => {
    item.addEventListener('click', () => {
        calculator.putNumberOnScreen(item.textContent)
        calculator.updateScreenContent()
    })
})

//enabling operators buttons
operators_BTNS.forEach(item => {
    item.addEventListener('click', () => {
        calculator.chooseOperators(item.textContent)
        calculator.updateScreenContent()
    })
})

//equals event
equals_BTN.addEventListener('click', () => {
    calculator.calculation()
    calculator.updateScreenContent()
})

//delete number
delete_BTN.addEventListener('click', () => {
    calculator.deleteNumber()
    calculator.updateScreenContent()
})
