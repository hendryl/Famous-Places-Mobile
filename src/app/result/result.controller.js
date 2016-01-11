class ResultController {
  constructor($state) {
    'ngInject';

    this.$state = $state;
    this.current = 'result.credits';
    this.showTab();
  }

  changeTab(value) {
    this.current = value;
    this.showTab();
  }

  showTab() {
    this.$state.transitionTo(this.current);
  }
}

export default ResultController;
