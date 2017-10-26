(function($) {

    function modalInit(modal, options) {

        if (modal === undefined) return false;
        options === undefined ? {} : options;

        modal.off('show.bs.modal shown.bs.modal hide.bs.modal hidden.bs.modal loaded.bs.modal');

        options.hasOwnProperty('onShow') && modal.on('show.bs.modal', function(e) {
            options.onShow();
        });
        options.hasOwnProperty('onShown') && modal.on('shown.bs.modal', function(e) {
            options.onShown();
        });
        options.hasOwnProperty('onHide') && modal.on('hide.bs.modal', function(e) {
            options.onHide();
        });
        options.hasOwnProperty('onHidden') && modal.on('hidden.bs.modal', function(e) {
            options.onHidden();
        });

        var modalDialog = $('.image-magnify-modal .modal-dialog');
        modalDialog.removeClass('modal-lg modal-sm');
        if (options.hasOwnProperty('modalSize')) {
            switch (options.modalSize) {
                case 'lg':
                    modalDialog.addClass('modal-lg');
                    break;
                case 'sm':
                    modalDialog.addClass('modal-sm');
                    break;
            }
        }

        modal.addClass('fade');
        if (options.hasOwnProperty('animate') && !options.animate) {
            modal.removeClass('fade');
        }

        return modal;
    }

    $.fn.imageModal = function(o) {

        var modal = $('<div></div>')
            .addClass('modal image-magnify-modal')
            .attr({
                'tab-index': -1,
                'role': 'dialog'
            });

        var btnCloseModal = $('<button></button>')
            .addClass('close')
            .attr({
                'data-dismiss': 'modal',
                'aria-label': 'Close'
            })
            .append(
                $('<span></span>')
                .attr({
                    'aria-hidden': true
                })
                .html('&times;')
            );

        var modalHeader = $('<div></div>')
            .addClass('modal-header')
            .append(btnCloseModal)
            .append(
                $('<h4></h4>')
                .addClass('modal-title')
            );

        var modalBody = $('<div></div>')
            .addClass('modal-body')
            .html('');

        var modalContent = $('<div></div>')
            .addClass('modal-content')
            .append(modalHeader)
            .append(modalBody);

        var modalDialog = $('<div></div>')
            .addClass('modal-dialog')
            .attr('role', 'document')
            .append(modalContent);

        modal.append(modalDialog);

        $('.image-magnify-modal').length == 0 && modal.appendTo('body');

        this.options = o === undefined ? {} : o;
        this.wrap($('<div></div>').addClass('image-magnify-container'));
        this.click(function() {
            var img = $(this);
            var options = img.data('imageModal').options;
            if (modal = modalInit($('.image-magnify-modal'), options)) {
                modal.find('.modal-header .modal-title').html(img.attr('title'));
                modal.find('.modal-body').html($('<img>').attr('src', img.attr('src')));
                modal.modal('show');
            }
        });
        this.data('imageModal', this);

    };
})(jQuery);