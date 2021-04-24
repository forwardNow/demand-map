import Tooltips from './Tooltips.ts';

const tooltips = new Tooltips(
  document.getElementById('myInput'),
  'hello world'
);

tooltips.resetContent('wahhh');
