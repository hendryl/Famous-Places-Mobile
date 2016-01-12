class ResultController {
  constructor($state, $log, $window, feedbackURL) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.feedbackURL = feedbackURL;

    this.current = 'result.menu';
    this.showTab();

    this.rematchOptionsHidden = true;
  }

  changeTab(value) {
    this.current = value;
    this.showTab();
  }

  showTab() {
    this.$state.transitionTo(this.current);
  }

  openFeedback() {
    this.$window.open(this.feedbackURL, '_blank');
  }

  showOptions() {
    this.rematchOptionsHidden = false;
  }
}

export default ResultController;
