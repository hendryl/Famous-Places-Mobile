class ResultController {
  constructor($state, $log, $window, feedbackURL) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.$window = $window;

    this.current = 'result.menu';
    this.showTab();
  }

  changeTab(value) {
    this.current = value;
    this.showTab();
  }

  showTab() {
    this.$state.transitionTo(this.current);
  }

  openFeedback() {
    this.$window.open('', '_blank');
  }
}

export default ResultController;
