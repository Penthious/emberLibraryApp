import Ember from 'ember';
import Faker from 'faker';

export default Ember.Controller.extend({
    actions: {

        generateLibraries(volume) {
            const counter = parseInt(volume);

            for (let i = 0; i < counter; i++) {
                const isTheLast = i === counter - 1;
                this._saveRandomLibrary(isTheLast);
            }
        },

        deleteLibraries() {
            this._destroyAll(this.get('libraries'));

            this.set('libDelDone', true);
        },

        generateBooksAndAuthors(volume) {
            const counter = parseInt(volume);

            for (let i = 0; i < counter; i++) {
                const isTheLast = i === counter - 1;
                const newAuthor = this._saveRandomAuthor(isTheLast);

                this._generateSomeBooks(newAuthor);
            }
        },

        deleteBooksAndAuthors() {
            this._destroyAll(this.get('books'));
            this._destroyAll(this.get('authors'));
            this.set('authDelDone', true);
        }
    },

    // Private methods

    _saveRandomLibrary(isLast) {
        const randomLibrary = this.store.createRecord('library').randomize();

        randomLibrary.save().then(() => {
            if (isLast) {
                this.set('libDone', true);
            }
        });
    },

    _saveRandomAuthor(isLast) {
        const newAuthor = this.store.createRecord('author').randomize();
        newAuthor.save().then(() => {
                if (isLast) {
                    this.set('authDone', true);
                }
            }
        );
        return newAuthor;
    },

    _generateSomeBooks(author) {
        const bookCounter = Faker.random.number(10);

        for (let j = 0; j < bookCounter; j++) {
            const library = this._selectRandomLibrary();
            this.store.createRecord('book')
                .randomize(author, library)
                .save();
            author.save();
            library.save();
        }
    },

    _selectRandomLibrary() {
        const libraries = this.get('libraries');
        const librariesCounter = libraries.get('length');
        const libraryIds = libraries.map(lib => lib.get('id'));
        const randomNumber = Faker.random.number(librariesCounter - 1);

        return libraries.findBy('id', libraryIds[randomNumber]);
    },

    _destroyAll(records) {
        records.forEach(
            item => item.destroyRecord()
        );
    }

});