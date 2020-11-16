"use strict";
exports.__esModule = true;
exports.Paginator = void 0;
var Paginator = /** @class */ (function () {
    function Paginator(template, pagination) {
        this.template = template;
        this.pagination = pagination || template.pagination;
    }
    Paginator.prototype.paginate = function (variants) {
        var perPage = this.pagination.getPerPage();
        var page = this.pagination.getCurrentPage();
        //Start & End Index in array
        var start = (page - 1) * perPage;
        var end = Math.min(variants.length, start + perPage);
        var paginated = [];
        for (var i = start; i < end; i++) {
            paginated.push(variants[i]);
        }
        return paginated;
    };
    Paginator.prototype.onPageChange = function () { };
    Paginator.prototype.onPageReady = function () { };
    Paginator.prototype.onProductsDrawn = function () { };
    Paginator.prototype.onPerPageChange = function () { };
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=Paginator.js.map