export class Paginator {
  constructor(template,pagination) {
    this.template = template;
    this.pagination = pagination || template.pagination;
  }

  paginate(variants) {
    let perPage = this.pagination.getPerPage();
    let page = this.pagination.getCurrentPage();

    //Start & End Index in array
    let start = (page-1) * perPage;
    let end = Math.min(variants.length, start+perPage);

    let paginated = [];
    for(let i = start; i < end; i++) {
      paginated.push(variants[i]);
    }

    return paginated;
  }

  onPageChange() {}
  onPageReady() {}
  onProductsDrawn() {}
  onPerPageChange() {}
}
