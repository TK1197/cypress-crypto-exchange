class crypto_exchange_objects{

    verifyHeader(){

        return cy.get('[data-testid="lepepe-company-title"]')
    }

    verifyText(){

        return cy.get('[data-testid="lepepe-company-motto"]')
    }

    verifySwapLabel(){

        return cy.get('[data-testid="swap-label"]')
    }

    verifyBuyLabel(){

        return cy.get('[data-testid="buy-label"]')
    }

    verifyExchangeRateText(){

        return cy.get('.gap-x-4 > .text-cyan-600')
    }

    verifyDescriptionText(){

        return cy.get('.mt-10 > .text-opacity-60')
    }

    clickDropdownlist(text:string){

        return cy.get(`[data-testid="${text}-dropdown"]`)
    }

    verifyDropdownlist(text:string, crypto:string){

        return cy.get(`[data-testid="${text}-dropdown-option-${crypto}"]`)
    }

    inputTextField(text:string){

        return cy.get(`[data-testid="${text}-input"]`)
    }

    getExchangeRate(){

        return cy.get('[data-testid="exchange-rate"]')
    }

    clickOnSwapButton(){

        return cy.get('[class="h-10 w-10 text-cyan-600 p-2 rounded-full bg-sky-200 bg-opacity-60 cursor-pointer"]')
    }
}

export default crypto_exchange_objects;