describe("Stimulus multiselect", () => {
  const resultsListSelector = "[data-multiselect-target='list'] li"

  it("displays results on click", () => {
    cy.visitPage()
    cy.clickOnSelect()
    cy.get(resultsListSelector).should("have.length", 3)
  })

  it("filters results on base on the search term", () => {
    cy.visitPage()

    cy.enterSearchTerm("Roost")
    cy.get(resultsListSelector).should("have.length", 1)

    cy.enterSearchTerm("no-results")
    cy.get(resultsListSelector).should('not.exist')
  })
})