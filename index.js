function handleVueDestruction(vue) {
  const turbolinksEvent = vue.$options.turbolinksDestroyEvent || 'turbo:visit';

  document.addEventListener(turbolinksEvent, function teardown() {
    vue.$destroy();
    document.removeEventListener(turbolinksEvent, teardown);
  });

  if (!vue.$options.turbolinksDestroyEvent) {
    document.addEventListener('turbolinks:visit', function teardown() {
      vue.$destroy();
      document.removeEventListener('turbolinks:visit', teardown);
    });
  }
}

const turbolinksAdapterMixin = {
  beforeMount: function() {
    // If this is the root component, we want to cache the original element contents to replace later
    // We don't care about sub-components, just the root
    if (this === this.$root && this.$el) {
      handleVueDestruction(this);
      // cache original element
      this.$turbolinksCachedHTML = this.$el.outerHTML;
      // register root hook to restore original element on destroy
      this.$once('hook:destroyed', function() {
        this.$el.outerHTML = this.$turbolinksCachedHTML
      });
    }
  }
};

function plugin(Vue, _options) {
  // Install a global mixin
  Vue.mixin(turbolinksAdapterMixin)
}

export { turbolinksAdapterMixin };
export default plugin;
