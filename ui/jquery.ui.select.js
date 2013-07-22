/*!
* jQuery UI Placeholder @VERSION
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/
(function( $, undefined ) {

    $.widget( 'ui.select', {
        version: '@VERSION',
        options: {
        	name: null,
            value: null
        },

        _create: function() {
        	this.options.name = this.options.name || this.element.attr('data-name');
            if (this.options.value === null) {
            	this.options.value = this.element.attr('data-value');
            	if (this.options.value === undefined) {
            		this.options.value = this.element.find('span').html();
            	}
            }
            this.input = $('<select name="'+this.options.name+'" style="left:-999999px;position:absolute;">');
            
            var html = '';

	        this.element.find('li').each(function (index, option) {
	            option = $(option);
	            if (option.attr('data-value') === undefined) {
	            	option.attr('data-value', option.html());
	            }
	            html += '<option value="'+option.attr('data-value')+'">'+option.html()+'</option>';
	        });

	        this.input.html(html);

	        this.element.find('li[data-value='+this.options.value+']').addClass('active');
	        this.input.val(this.options.value);

	        this.element.append(this.input);

	        this._on({
	        	'click': '_onClick'
	        });

	        if ($.ui.select.instances === 0) {
	        	this._on('body', {
	        		'click': function () {
	        			$('div.select-options:visible').each(function (index, element) {
			                $(element).parent().select('close');
			            });
	        		}
	        	});
	        }

	        $.ui.select.instances += 1;
        },

        _destroy: function () {
        	$.ui.select.instances -= 1;
        	if ($.ui.select.instances === 0) {
        		this._off('body');
        	}
        },

        _onClick: function (e) {
            var target = e.target,
                selectOpt = this.element.find('div.select-options');

            if (target.nodeName === 'LI') {
                target = $(target);
                this.input.val(target.attr('data-value'));
                this.element.find('span').html(target.html());
                target.siblings('.active').removeClass('active');
                target.addClass('active');
                this._trigger('change', e, {element: target, value: this.input.val()})
            }

            if (!selectOpt.is(':visible')) {
                this.open();
                selectOpt.width(Math.max(this.element.outerWidth(), selectOpt.outerWidth()) - parseInt(selectOpt.css('border-width'), 10) * 2);
                selectOpt.height(Math.min(selectOpt.height(), selectOpt.find('ul').height()));
                e.stopPropagation();
            }
        },


        open: function () {
        	this.element.find('div.select-options').show();
            this.element.find('i').toggleClass('ico-arrow-up ico-arrow-down');
        	this._trigger('open');
        },

        close: function () {
        	this.element.find('div.select-options').hide();
            this.element.find('i').toggleClass('ico-arrow-up ico-arrow-down');
        	this._trigger('close');
        }


    });

    $.ui.select.instances = 0;

}( jQuery ) );
