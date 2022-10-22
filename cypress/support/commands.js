const resultsListSelector = "[data-multiselect-target='list'] li"
const input = "[data-multiselect-target='search']"

Cypress.Commands.add("visitPage", (path = "/") => {
  cy.visit(path)
})

Cypress.Commands.add("enterSearchTerm", (term) => {
  cy.get(input).type(term)
})

Cypress.Commands.add("clickOnSelect", () => {
  const element = cy.get(".multiselect__container")
  element.click()
})
