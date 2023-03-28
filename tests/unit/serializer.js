const jestSerializerVueTJW = require('jest-serializer-vue-tjw');

const helpers = {
  isHtmlString(received) {
    return (
      typeof (received) === 'string'
      && (
        received.startsWith('<')
        || received.startsWith('"<')
      )
    );
  },
  isVueWrapper(received) {
    return (
      typeof (received) === 'object'
      && typeof (received.html) === 'function'
    );
  },
};

module.exports = {
  test(received) {
    return helpers.isHtmlString(received) || helpers.isVueWrapper(received);
  },
  print(received) {
    // force to a string
    received = (received?.html && received?.html()) || received;
    return jestSerializerVueTJW.print(received);
  },
};
