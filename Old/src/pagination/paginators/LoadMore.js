import { Paginator } from './Paginator';
import { CLASS_HIDDEN } from './../../constant/Constants';

export class LoadMore extends Paginator {
  constructor(template, container) {
    super(template);
    this.container = container;
    this.container.on('click', e => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.pagination.setPage(this.pagination.getCurrentPage()+1);
  }

  paginate(variants) {
    let perPage = this.pagination.getPerPage();
    let page = this.pagination.getCurrentPage();

    let start = 0;
    let end = Math.min(variants.length, start+(perPage*page));

    var paginated = [];
    for(let i = start; i < end; i++) {
      paginated.push(variants[i]);
    }

    return paginated;
  }

  updateVisibility() {
    if(this.pagination.getCurrentPage() >= this.pagination.getTotalPages()) {
      return this.container.addClass(CLASS_HIDDEN);
    }
    return this.container.removeClass(CLASS_HIDDEN);
  }

  onPageChange() {
    this.updateVisibility();
  }

  onPageReady() {
    this.updateVisibility();
  }

  onProductsDrawn() {
    this.updateVisibility();
  }

  onPerPageChange() {
    this.updateVisibility();  
  }
}
