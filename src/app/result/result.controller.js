class ResultController {
  constructor() {
    'ngInject';

    this.current = 'menu-left';
  }

  changeTab(value) {
    this.current = value;
  }
}

export default ResultController;
