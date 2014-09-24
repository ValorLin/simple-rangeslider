(function () {
    var namespace = 'rangeslider';
    var plugin = function (el, options) {
        var self = this;
        var $slider, $sliderHandler, sliderWidth, handlerWidth,
            max, min, id, value;

        $slider = $(el);

        value = $slider.attr('value');
        id = $slider.attr('id');

        this.options = $.extend(true, {
            min: 0,
            max: 100
        }, {
            min: $slider.attr('min'),
            max: $slider.attr('max')
        }, options);

        $slider
            .attr({
                id: id,
                "class": namespace,
                min: this.options.min,
                max: this.options.max
            })
            .css('position', 'relative');

        $slider.replaceWith($slider);

        $slider.val(value);

        $sliderHandler = $('<div class="' + namespace + '-handler"></div>');
        $sliderHandler.appendTo($slider).css({
            position: 'absolute',
            top: -$slider.height() / 2
        });

        this.$slider = $slider;
        this.$sliderHandler = $sliderHandler;
        this.sliderWidth = sliderWidth = $slider.width();
        this.sliderOffsetLeft = $slider.offset().left;
        this.handlerWidth = handlerWidth = $sliderHandler.width();
        this.maxLeft = sliderWidth - handlerWidth / 2;
        this.minLeft = -handlerWidth / 2;

        $sliderHandler.on('mousedown.' + namespace, function (e) {
            e.preventDefault();
            $(document)
                .on('mousemove.' + namespace, self.update)
                .on('mouseup.' + namespace, function () {
                    $(document).off('.' + namespace);
                })
        });
    };

    $[namespace] = $.extend(plugin, {
        prototype: {
            percent: null,
            update: function (e) {
                e.preventDefault();
                var left, value, percent;

                // Update handler position
                left = e.pageX - this.sliderOffsetLeft - this.handlerWidth / 2;
                left = Math.max(left, this.minLeft);
                left = Math.min(left, this.maxLeft);
                this.$sliderHandler.css('left', left);

                // Update value
                percent = (e.pageX - this.sliderOffsetLeft ) / (this.maxLeft - this.minLeft);
                value = percent * self.options.max;
                this.$slider.val(value);
                this.$slider.trigger('change.' + namespace, value);
            }
        }
    });

    $.fn[namespace] = function (options) {
        return this.each(function () {
            new plugin(this, options);
        });
    };
})();