const resizeQueryObserverHandler = entries => {
    entries.forEach(entry => {
        const { target, contentRect } = entry;
        const resizeQuery = target.dataset.resizeQuery;
        const { width } = contentRect;

        if (!resizeQuery) return;

        const activeResizeQuery = resizeQuery.split(' ').reduce((activeQuery, query) => {
            const queryAction = query.match(/[^0-9]+/g)?.[0];
            const queryValue = query.match(/\d+/g)?.[0];
            const queryName = query + ' ';

            if (!queryAction) return activeQuery;

            switch (queryAction) {
                case '<': 
                    activeQuery += width < queryValue ? queryName : ''; break;
                case '<=':
                    activeQuery += width <= queryValue ? queryName : ''; break;
                case '>':
                    activeQuery += width > queryValue ? queryName : ''; break;
                case '>=':
                    activeQuery += width >= queryValue ? queryName : ''; break;
            }

            return activeQuery;
        }, '');

        target.setAttribute(target.dataset.resizeQueryName, activeResizeQuery);

    })
}
const resizeQueryObserver = new ResizeObserver(resizeQueryObserverHandler);

export const resizeQuery = {
    install: (app, options) => {

        const queryAttributeName = options?.queryAttributeName;

        app.directive('resize', {
            mounted(el, binding) {
                const resizeQuerySizes = binding.value;
                if (!resizeQuerySizes) return;
                el.dataset.resizeQuery = resizeQuerySizes;
                el.dataset.resizeQueryName = queryAttributeName || binding.arg || 'resize-query';
                resizeQueryObserver.observe(el);
            },
            beforeUnmount(el) {
                resizeQueryObserver.unobserve(el);
            }
        });

    }
}