function handleVueDestructionOn(turbolinksEvent, vue) {
  document.addEventListener(turbolinksEvent, function teardown() {
    vue.$destroy();
    document.removeEventListener(turbolinksEvent, teardown);
  });
}

function plugin(Vue, options) {
  // Creates a new Turbolinks enabled Vue app
  Vue.newTurbolinksApp = function (selector, options, callback) {
    document.addEventListener("turbolinks:load", function() {
      const element = document.querySelector(selector);
      if (element !== null) {
        var callbackOptions = typeof callback === 'function' && callback(element) || {};
        var opts = Object.assign({el: element}, options, callbackOptions);
        return new Vue(opts);
      }
    });
  }

  Vue.mixin({
    beforeMount: function() {
      // If this is the root component, we want to cache the original element contents to replace later
      // We don't care about sub-components, just the root
      if (this == this.$root) {
        handleVueDestructionOn('turbolinks:visit', this);
        this.$originalEl = this.$el.outerHTML;
      }
    },

    destroyed: function() {
      // We only need to revert the html for the root component
      if (this == this.$root) {
        this.$el.outerHTML = this.$originalEl;
      }
    }
  })
};

export default plugin;
