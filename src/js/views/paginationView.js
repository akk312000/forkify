import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler){
      this._parentElement.addEventListener('click',function(e){
          const btn=e.target.closest('.btn--inline');
          console.log(btn);
          if(!btn)return;
          const goToPage=+btn.dataset.goto;
          console.log(goToPage);
          handler(goToPage);
      })
  }
  _generateMarkup() {
    const curPage = this._data.page;
    // console.log("heelo"+this._data.page);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log("curpage"+curPage);
    if (this._data.page == 1 && numPages > 1) {
      return `
            <button data-goto="${curPage+1}"class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
            `;
    }
    if (this._data.page == numPages && numPages > 1) {
      return `
            <button data-goto="${curPage-1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
            `;
    }
    if (this._data.page < numPages) {
      return `
            <button data-goto="${curPage-1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
            
          
            <button data-goto="${curPage+1}"class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
            `;
    }
    return '';
  }
}

export default new PaginationView();
