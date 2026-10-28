import View from './View.js'
import icons from 'url:../../img/icons.svg';

class PaginationView extends View { 
      _parentElement = document.querySelector('.pagination')

     _generateMarkupBtn(direction, curPage) {
       const prev =  -1
       const next =  +1
       const page =  curPage + (direction === 'prev' ? prev : next)
       const markup = direction === 'prev' ? 
                `<svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
                </svg>   
                 <span>Page ${page}</span>` :
               `<span>Page ${page}</span> 
               <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>`

       return `
          <button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
                  ${markup}
          </button>
       `
    }

       addHandlerClick(handler) {
            this._parentElement.addEventListener('click', function(e) {
                const btn = e.target.closest('.btn--inline')
                if(!btn) return

                const goToPage = +btn.dataset.goto
    
                handler(goToPage)
            })
       }


      _generateMarkup() {
        const curPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage) 
   
         //Page 1, and there are other pages
         if(curPage === 1 && numPages > 1) {
            return this._generateMarkupBtn('next', curPage)
         }

         //Last page
          if(curPage === numPages && numPages > 1) {
             return this._generateMarkupBtn('prev', curPage)
          }

         //Other page
         if(curPage < numPages){
         return  this._generateMarkupBtn('prev', curPage) + this._generateMarkupBtn('next', curPage)
         }

         //Page 1, and there are no other pages
          return ''

      }
}


export default new PaginationView
