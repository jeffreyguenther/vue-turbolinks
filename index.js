function destroyVue() {
  this.$destroy();
  document.removeEventListener('turbolinks:before-cache', destroyVue.bind(this))
}

var TurbolinksAdapter = {
  beforeMount: function(){
    document.addEventListener('turbolinks:before-cache', destroyVue.bind(this))
    this.$originalEl = this.$el.outerHTML;
  },
  destroyed: function() {
    this.$el.outerHTML = this.$originalEl;
  }
};

export default TurbolinksAdapter;
