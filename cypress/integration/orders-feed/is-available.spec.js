describe('Order feed', function () {
    before(function () {
        cy.visit('http://localhost:3000/feed');
    })
    it('should be available on localhost:3000/feed', function () {
        cy.visit('http://localhost:3000/feed');
    });
    it('should open order details', () => {
        cy.get('section')
            .first()
            .find('ul li a')
            .first()
            .click()
        cy.wait(5000);
    })
    it('should close order popup', () => {
        cy.get('body').trigger('keydown', { keyCode: 27});
        cy.wait(500);
        cy.get('body').trigger('keyup', { keyCode: 27});
    })
});