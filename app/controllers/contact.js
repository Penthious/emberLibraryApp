import Ember from 'ember';

export default Ember.Controller.extend({
    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isLength: Ember.computed.gte('message.length', 5),

    isDisabled: Ember.computed.and('isValid', 'isLength'),

    actions: {
        saveData() {
            const email = this.get('emailAddress');
            const message = this.get('message');
            alert(`Your email address: ${email}, and message of ${message} is being processed`);
            this.set('responseMessage', `Your email and message has been sent, Thank you`);
            this.set('emailAddress', '');
            this.set('message', '');
        }
    }
});
