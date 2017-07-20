function handleVueDestruction(vue) {
  document.addEventListener('turbolinks:visit', function teardown() {
    vue.$destroy();
    document.removeEventListener('turbolinks:visit', teardown);
  });
}

var TurbolinksAdapter = {
  beforeMount: function() {
    if (this.$el.parentNode) {
      handleVueDestruction(this);
      this.$originalEl = this.$el.outerHTML;
    }
  },
  destroyed: function() {
    this.$el.outerHTML = this.$originalEl;
  }
};

export default TurbolinksAdapter;
