"use strict";
exports.__esModule = true;
exports.Pagination = exports.VIEW_ALL_COUNT = void 0;
var paginators_1 = require("./paginators/");
exports.VIEW_ALL_COUNT = 999999;
var Pagination = /** @class */ (function () {
    function Pagination(template) {
        this.template = template;
        //Initialize a default paginator.
        this.paginator = new paginators_1.Paginator(template, this);
    }
    Pagination.prototype.getCurrentPage = function () {
        if (this.isViewAll())
            return 1;
        var page = this.template.settings.settings.page;
        page = parseInt(page);
        if (isNaN(page) || !isFinite(page))
            page = 1;
        return this.clampPage(page);
    };
    Pagination.prototype.getTotalPages = function () {
        if (this.isViewAll())
            return 1;
        var total = this.template.draw.getUnpaginatedVariantCount();
        if (!total)
            return 1;
        return Math.ceil(total / this.getPerPage());
    };
    Pagination.prototype.getPerPage = function () {
        if (this.isViewAll())
            return exports.VIEW_ALL_COUNT;
        var perPage = this.template.settings.settings.perPage;
        perPage = parseInt(perPage || '');
        if (isNaN(perPage) || !isFinite(perPage))
            perPage = this.template.perPage;
        perPage = Math.max(1, Math.min(250, perPage)); //Clamp to 250 max.
        return perPage || 20;
    };
    Pagination.prototype.isViewAll = function () {
        var perPage = this.template.settings.settings.perPage;
        if (perPage === 'all')
            return true;
        perPage = parseInt(perPage);
        return !isNaN(perPage) && isFinite(perPage) && perPage >= exports.VIEW_ALL_COUNT;
    };
    Pagination.prototype.setPaginator = function (paginator) {
        this.paginator = paginator;
        this.template.draw.queueDraw();
    };
    Pagination.prototype.setPage = function (page) {
        this.template.settings.setSetting('page', this.clampPage(page));
        this.template.draw.draw();
        this.paginator.onPageChange();
        this.template.onPageChange(this.getCurrentPage());
    };
    Pagination.prototype.setPerPage = function (perPage) {
        if (perPage == this.template.perPage) {
            this.template.settings.setSetting('perPage', null);
        }
        else if (this.isViewAll()) {
            this.template.settings.setSetting('perPage', 'all');
        }
        else {
            this.template.settings.setSetting('perPage', perPage);
        }
        this.template.draw.queueDraw();
        this.paginator.onPerPageChange();
        this.template.onPerPageChange(this.getPerPage());
    };
    Pagination.prototype.viewAll = function () {
        this.setPerPage(exports.VIEW_ALL_COUNT);
    };
    Pagination.prototype.paginateVariants = function (variants) {
        if (this.isViewAll())
            return variants;
        if (this.paginator)
            return this.paginator.paginate(variants);
        return variants;
    };
    Pagination.prototype.clampPage = function (page) {
        if (this.isViewAll())
            return 1;
        return Math.min(Math.max(page, 1), this.getTotalPages());
    };
    Pagination.prototype.load = function () {
        this.paginator.onPageReady();
    };
    //Events
    Pagination.prototype.onProductsDrawn = function () {
        this.paginator.onProductsDrawn();
    };
    Pagination.prototype.onProductsFetched = function () {
        this.paginator.onProductsFetched ? this.paginator.onProductsFetched() : null;
    };
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map