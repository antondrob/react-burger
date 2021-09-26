describe('Burger constructor', function () {
    before(function () {
        cy.visit('http://localhost:3000');
    })
    it('should handle drag & drop', function () {
        for (let i = 1; i < 10; i++) {
            cy.get(`a[draggable="true"]`)
                .eq(i)
                .trigger('dragstart')

            cy.get(`section`)
                .eq(1)
                .trigger('drop')
        }
    })
    it('should reorder ingredients inside the burger', function () {
        cy.get(`section`)
            .eq(1)
            .find('div[draggable="true"]')
            .first()
            .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
            .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
            .trigger('mouseup');
    })
    it('should delete ingredient from burger', () => {
        cy.get(`section`)
            .last()
            .find('div[draggable="true"]')
            .first()
            .find('.constructor-element__action')
            .click()
    })
})
export {}