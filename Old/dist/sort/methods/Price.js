"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.PriceDescending = exports.PriceAscending = void 0;
var SortMethod_1 = require("./SortMethod");
exports.PriceAscending = __assign(__assign({}, SortMethod_1.SortMethod), { handle: "price-ascending", name: "Price, Low to High", sort: function (collection, variantData) {
        return variantData.sort(function (l, r) {
            return l.price - r.price;
        });
    } });
exports.PriceDescending = __assign(__assign({}, exports.PriceAscending), { handle: 'price-descending', name: 'Price, High to Low', reverse: true });
//# sourceMappingURL=Price.js.map