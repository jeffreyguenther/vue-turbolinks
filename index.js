function handleVueDestructionOn(turbolinksEvent, vue) {
  document.addEventListener(turbolinksEvent, function teardown() {
    vue.$destroy();
    document.removeEventListener(turbolinksEvent, teardown);
  });
}

var TurbolinksAdapter = {
  beforeMount: function() {
    if (this.$el.parentNode) {
      handleVueDestructionOn('turbolinks:visit', this);
      this.$originalEl = this.$el.outerHTML;
    }
  },
  destroyed: function() {
    this.$el.outerHTML = this.$originalEl;
  }
};

export default TurbolinksAdapter;
