/// <reference types="cypress" />

describe("Test LeaderBoard app", () => {
  it("Displays two buttons", () => {
    cy.visit("http://localhost:3000");
    cy.contains("button", "Create new leader board");
    cy.contains("button", "Go to leader board");
  });

  it("Navigates to an existing board", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="go-to-board-button"]').click();

    const id = "6Ulc3SrCnSaxbtz9gcGL";

    // Type in ID
    cy.get('[data-test-id="board-id-input"]').type(id);

    // Click submit
    cy.get('[data-test-id="board-id-submit"]').click();

    // Should be redirected
    cy.location("pathname").should("eq", "/view/" + id);
  });

  it("Adds an entry", () => {
    cy.visit("http://localhost:3000/view/6Ulc3SrCnSaxbtz9gcGL");

    // Click add button
    cy.get('[data-test-id="board-add-button"]').click();

    // // Click user field
    // cy.get('[data-test-id="select-user-field"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.get('[data-test-id="select-user-field"]').wait(1000).type("{enter}");
    // Enter a reason
    const input = "TEST ENTRY: " + Cypress._.random(0, 1e6);
    cy.get('[data-test-id="input-reason"]').type(input);

    // Click submit
    cy.get('[data-test-id="submit-entry-button"]').click();

    // Click view button
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.get('[data-test-id="view-entry-button"]').wait(2000).click();

    // Assert the data has been added
    cy.get("tr").should("contain", input);
  });
});
