"use strict";
exports.__esModule = true;
exports.Content = void 0;
var Consts = require("./../constant/Constants");
var Content = /** @class */ (function () {
    function Content(template) {
        this.template = template;
        this.contentBlocks = [];
    }
    Content.prototype.load = function () {
        this.contentBlocks = this.template.productsContainer.find(Consts.CONTENT_BLOCK_SELECTOR);
        this.contentBlocks = this.contentBlocks ? this.contentBlocks.toArray() : [];
        this.contentBlocks = this.contentBlocks.map(function (cb) { return $(cb); });
        this.contentBlocks.forEach(function (cb) { return cb.attr('data-original-index', cb.index()); });
    };
    Content.prototype.addContentBlock = function (x) {
        if (typeof x === typeof '')
            x = $(x);
        this.contentBlocks.push(x);
        this.redraw();
    };
    Content.prototype.removeContentBlock = function (x) {
        var remove = [];
        this.contentBlocks = this.contentBlocks.filter(function (cb) {
            var is = cb.is(x);
            if (is)
                remove.push(x);
            return !is;
        });
        remove.forEach(function (x) { return x.remove(); });
        this.redraw();
    };
    Content.prototype.redraw = function () {
        var _this = this;
        //Detach all content blocks;
        var detach = [];
        var thumbnailElements = this.template.productsContainer.find(Consts.PRODUCT_THUMBNAILS_SELECTOR);
        var x = {}; //What is X? X is a passable variable that will be persistant between each iteration.
        this.contentBlocks.forEach(function (cb) {
            //Get the position of this content block
            var i = _this.template.getContentBlockPosition(cb, thumbnailElements, _this.template.draw.drawnProducts, x);
            if (i === -1)
                return detach.push(cb);
            //Now get the DOM Node this needs to go before.
            var element = thumbnailElements[i];
            if (element)
                return cb.insertBefore($(element));
            //That DOM Node doesn't exist, try the last one after.
            element = thumbnailElements[thumbnailElements.length - 1];
            if (element)
                return cb.insertAfter($(element));
            //That one doesn't exist (likely we're the only thing rendering)
            _this.template.productsContainer.append(cb);
        });
        detach.forEach(function (d) { return d.detach(); });
    };
    return Content;
}());
exports.Content = Content;
//# sourceMappingURL=Content.js.map