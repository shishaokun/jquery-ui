/*!
* jQuery UI Placeholder @VERSION
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/
(function( $, undefined ) {

    $.widget( 'ui.placeholder', {
        version: '@VERSION',
        options: {
            color: '#a9a9a9',
            text: ''
        },

        _create: function() {
            this.options.text = this.options.text || this.element.attr('placeholder');
            this.originalColor = this.element.css('color');
            if (!this.element.val()) {
                this.element
                .val(this.options.text)
                .css('color', this.options.color);

                this._value = '';
            }
            this._on({
                'mousedown': '_onChange',
                'keydown': '_onChange',
                'input': '_onInput'
            });

            if ($.ui.placeholder.instances === 0) {
                this._on(window, {
                    'beforeunload': '_onBeforeupload'
                });
            }

            $.ui.placeholder.instances += 1;
        },

        _destroy: function () {
            $.ui.placeholder.instances -= 1;
        },

        value: function () {
            return this._value;
        },

        _onChange: function () {
            if (this._value === '') {
                this._delay(function () {
                    if (this._value === '') {
                        this.element.setSelection(0, 0);
                    }
                })
            }
        },

        _onInput: function () {
            var currentValue = this.element.val();

            if (currentValue === '') {
                this.element
                .val(this.options.text)
                .css('color', this.options.color)
                .setSelection(0, 0);

                this._value = '';

            }
            else {
                if (this._value === '') {
                    this.element
                    .css('color', this.originalColor)
                    .deleteText(this.element.getSelection().start, currentValue.length, true);         
                }

                this._value = this.element.val();
            }
        },

        _onBeforeupload: function () {
            $(':ui-placeholder').each(function (index, element) {
                if ($(element).placeholder('value') === '') {
                    element.value = '';
                }
            });
        }


    });

    $.ui.placeholder.instances = 0;

}( jQuery ) );
