import { Paginator } from './paginators/';

export const VIEW_ALL_COUNT = 999999;

export class Pagination {
  constructor(template) {
    this.template = template;

    //Initialize a default paginator.
    this.paginator = new Paginator(template,this);
  }

  getCurrentPage() {
    if(this.isViewAll()) return 1;

    let { page } = this.template.settings.settings;
    page = parseInt(page);
    if(isNaN(page) || !isFinite(page)) page = 1;
    return this.clampPage(page);
  }

  getTotalPages() {
    if(this.isViewAll()) return 1;

    let total = this.template.draw.getUnpaginatedVariantCount();
    if(!total) return 1;
    return Math.ceil(total / this.getPerPage());
  }

  getPerPage() {
    if(this.isViewAll()) return VIEW_ALL_COUNT;

    let { perPage } = this.template.settings.settings;
    perPage = parseInt(perPage||'');
    if(isNaN(perPage) || !isFinite(perPage)) perPage = this.template.perPage;
    perPage = Math.max(1, Math.min(250, perPage));//Clamp to 250 max.
    return perPage || 20;
  }


  isViewAll() {
    let { perPage } = this.template.settings.settings;
    if(perPage === 'all') return true;
    perPage = parseInt(perPage);
    return !isNaN(perPage) && isFinite(perPage) && perPage >= VIEW_ALL_COUNT;
  }


  setPaginator(paginator) {
    this.paginator = paginator;
    this.template.draw.queueDraw();
  }

  setPage(page) {
    this.template.settings.setSetting('page', this.clampPage(page));
    this.template.draw.draw();
    this.paginator.onPageChange();
    this.template.onPageChange(this.getCurrentPage());
  }

  setPerPage(perPage) {
    if(perPage == this.template.perPage) {
      this.template.settings.setSetting('perPage', null);
    } else if(this.isViewAll()) {
      this.template.settings.setSetting('perPage', 'all');
    } else {
      this.template.settings.setSetting('perPage', perPage);
    }
    
    this.template.draw.queueDraw();
    this.paginator.onPerPageChange();
    this.template.onPerPageChange(this.getPerPage());
  }


  viewAll() {
    this.setPerPage(VIEW_ALL_COUNT);
  }

  paginateVariants(variants) {
    if(this.isViewAll()) return variants;

    if(this.paginator) return this.paginator.paginate(variants);
    return variants;
  }

  clampPage(page) {
    if(this.isViewAll()) return 1;

    return Math.min(Math.max(page, 1), this.getTotalPages());
  }

  load() {
    this.paginator.onPageReady();
  }

  //Events
  onProductsDrawn() {
    this.paginator.onProductsDrawn();
  }

  onProductsFetched() {
    this.paginator.onProductsFetched ? this.paginator.onProductsFetched() : null;
  }
}
