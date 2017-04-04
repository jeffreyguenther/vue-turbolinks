# A Turbolinks Adapter for Vue components

To use this in a Rails project with [webpacker](https://github.com/rails/webpacker) support,

``` bash
$ ./bin/yarn add vue-turbolinks
```

To use the mixin with the hello vue component created when you create a new
project with `rails new myapp --webpack=vue`. In your component definition,
write:

``` javascript
import TurbolinksAdapter from 'vue-turbolinks';

document.addEventListener('turbolinks:load', () => {
  var vueapp = new Vue({
    el: "#hello",
    template: '<App/>',
    mixins: [TurbolinksAdapter],
    components: { App }
  });
});
```
