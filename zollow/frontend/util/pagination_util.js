import React from 'react';

function handlePageTurning(page, component) {
  return (e) => {
    component.setState({ page: page });
  };
}

function pages(component) {
  const { page } = component.state;

  let numPages = Math.floor(component.props.homes.length / 20);

  if (page > numPages + 1) {
    component.setState({ page: 1 });
  }

  let first = [
    <li key="1">
      <button className={page === 1 ? 'page-selected' : ''} onClick={handlePageTurning(1)}>1</button>
    </li>
  ];

  let last = [
    <li key={numPages}>
      <button className={page === numPages ? 'page-selected' : ''}
        onClick={handlePageTurning(numPages, component)}>{numPages}</button>
    </li>
  ];

  let startIdx;
  let endIdx;

  if (numPages < 5) {
    first = [];
    last = [];

    startIdx = 1;
    numPages += 1;
    endIdx = numPages + 1;
  }
  else if (page >= 5 && page <= numPages - 5) {
    startIdx = page - 2;
    endIdx = page + 2;

    first.push(<li key='...1'>...</li>);
    last.unshift(<li key='...2'>...</li>);
  }
  else if (page < 6) {
    startIdx = 2;
    endIdx = 6;

    last.unshift(<li key='...3'>...</li>);
  }
  else {
    startIdx = numPages - 5;
    endIdx = numPages;

    first.push(<li key='...4'>...</li>);
  }

  const pagesArr = [];

  for (let i = startIdx; i < endIdx; i++) {
    pagesArr.push(
      <li key={i}>
        <button className={page === i ? 'page-selected' : ''} onClick={handlePageTurning(i, component)}>{i}</button>
      </li>
    );
  }

  let next = [];

  if (numPages > 1 && page < numPages) {
    next = [
      <li key={numPages + 1}>
        <button className='next-page-button' onClick={handlePageTurning(page + 1, component)}>NEXT</button>
      </li>
    ];
  }

  return first.concat(pagesArr).concat(last).concat(next);
}

function pagination(component) {
  return pages(component);
}

export default pagination;