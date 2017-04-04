var TurbolinksAdapter = {
  beforeMount: function(){
    document.addEventListener('turbolinks:before-cache', () => {
      this.$destroy();
    });

    this.$originalEl = this.$el.outerHTML;
  },
  destroyed: function() {
    this.$el.outerHTML = this.$originalEl;
  }
};

export default TurbolinksAdapter;
