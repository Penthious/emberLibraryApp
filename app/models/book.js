import DS from 'ember-data';
import Faker from 'faker';

export default DS.Model.extend({
    title: DS.attr('string'),
    releaseYear: DS.attr('date'),

    library: DS.belongsTo('library'),
    author: DS.belongsTo('author'),

    randomize(author, library){
        this.set('title', this._bookTitle());
        this.set('author', author);
        this.set('releaseYear', this._randomYear());
        this.set('library', library);
    },

    _bookTitle(){
        return `${Faker.commerce.productName()} Cookbook`;
    },

    _randomYear(){
        return new Date(this._getRandomArbitrary(1900, 2016).toPrecision(4));
    },

});
