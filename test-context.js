var context = require.context('./src/client', true, /Spec\.js$/);
context.keys().forEach(context);
