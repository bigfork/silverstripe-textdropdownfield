import jQuery from 'jquery';
import { loadComponent } from 'lib/Injector';
import React from 'react';
import ReactDOM from 'react-dom';

jQuery.entwine('ss', ($) => {
  $('.js-injector-boot .form__field-holder .text-dropdown-field').entwine({
    onmatch() {
      const Component = loadComponent('TextDropdownField');
      const schemaState = this.data('state');

      const form = this.closest('.cms-edit-form');
      form.changetracker('destroy');

      const setValue = (fieldName, value) => {
        const input = document.querySelector(`input[name="${fieldName}"]`);

        if (!input) {
          return;
        }

        input.value = value;
      };

      ReactDOM.render(<Component {...schemaState} onAutofill={setValue} />, this[0]);

      form.changetracker(form.getChangeTrackerOptions());
    },

    onunmatch() {
      ReactDOM.unmountComponentAtNode(this[0]);
    },
  });
});
