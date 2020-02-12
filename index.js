function handleVueDestructionOn(turbolinksEvent, vue) {
  document.addEventListener(turbolinksEvent, function teardown() {
    vue.$destroy();
    document.removeEventListener(turbolinksEvent, teardown);
  });
}

function plugin(Vue, options) {
  // Install a global mixin
  Vue.mixin({

    beforeMount: function() {
      // If this is the root component, we want to cache the original element contents to replace later
      // We don't care about sub-components, just the root
      if (this == this.$root && this.$el) {
        var destroyEvent = this.$options.turbolinksDestroyEvent || 'turbolinks:visit'
        handleVueDestructionOn(destroyEvent, this);
        this.$originalEl = this.$el.outerHTML;
        // register root hook to restore original element on destroy
        this.$once('hook:destroyed', function() {
          this.$el.outerHTML = this.$originalEl
        });
      }
    },
  })
};

export default plugin;
