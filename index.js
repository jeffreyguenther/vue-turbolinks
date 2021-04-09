function handleVueDestruction(vue) {
  const event = vue.$options.destroyEvent || defaultEvent();

  document.addEventListener(event, function teardown() {
    vue.$destroy();
    document.removeEventListener(event, teardown);
  });
}

const Mixin = {
  beforeMount: function() {
    // If this is the root component, we want to cache the original element contents to replace later
    // We don't care about sub-components, just the root
    if (this === this.$root && this.$el) {
      handleVueDestruction(this);

      // cache original element
      this.$cachedHTML = this.$el.outerHTML;

      // register root hook to restore original element on destroy
      this.$once('hook:destroyed', function() {
        if( this.$el.parentNode )
          this.$el.outerHTML = this.$cachedHTML
      });
    }
  }
};

function plugin(Vue, options) {
  // Install a global mixin
  Vue.mixin(Mixin)
}

function defaultEvent() {
  if (typeof Turbo !== 'undefined') {
    return 'turbo:visit';
  }

  return 'turbolinks:visit';
}

export { Mixin as turbolinksAdapterMixin };
export default plugin;
