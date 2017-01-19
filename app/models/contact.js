import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    message: DS.attr('string'),

    isValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
    isMessageLongEnough: Ember.computed.gte('message.length', 5),

    isValid: Ember.computed.and('isValidEmail', 'isMessageLongEnough'),
    isNotValid: Ember.computed.not('isValid')

});
