/// <reference types="cypress" />
import "cypress-xpath";

describe("Test LeaderBoard app", () => {
  it("Displays two buttons", () => {
    cy.visit("http://localhost:3000");
    cy.contains("button", "Create new leader board");
    cy.contains("button", "Go to leader board");
  });

  it("Navigates to an existing board", () => {
    cy.visit("http://localhost:3000");
    cy.xpath('//*[@id="root"]/div[3]/header/button[2]').click();

    const id = "6Ulc3SrCnSaxbtz9gcGL";

    // Type in ID
    cy.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div[2]/input").type(id);

    // Click submit
    cy.xpath(
      "/html/body/div[3]/div/div[2]/div/div[2]/div[3]/button[2]"
    ).click();

    // Should be redirected
    cy.location("pathname").should("eq", "/view/" + id);
  });

  it("Adds an entry", () => {
    cy.visit("http://localhost:3000/view/6Ulc3SrCnSaxbtz9gcGL");

    // Click add button
    cy.xpath("/html/body/div[1]/button").click();

    // Click user field
    cy.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div[2]/div[1]").click();
    cy.xpath("/html/body/div[4]/div/div/div[2]/div/div/div/div").click();

    // Enter a reason
    const input = "TEST ENTRY: " + Cypress._.random(0, 1e6);
    cy.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div[2]/input").type(
      input
    );

    // Click submit
    cy.xpath(
      "/html/body/div[3]/div/div[2]/div/div[2]/div[3]/button[2]"
    ).click();

    // Click view button
    cy.xpath(
      '//*[@id="root"]/div[2]/header/div/div/div/div/div/div/table/tbody/tr/td[3]/button'
    ).click();

    // Assert the data has been added
    cy.get("tr").should("contain", input);
  });
});
