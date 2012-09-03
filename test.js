module.exports = {
  "init": function() {
    this.assert = require('assert');
    this.js2json = require('./').init();
    this.values.example = this.values.example.join("\n");
    this.values.exampleFunction = this.values.exampleFunction.join("\n");
    this.values.parsedModule = this.values.parsedModule.bind(this);
  },
  "values": {
    "example": [
      "module.exports = {",
      "  \"hello\": function() {",
      "    /* a comment */",
      "    console.log('Hello, world.');",
      "  }",
      "}"
    ],
    "exampleFunction": [
      "function() {",
      "  /* a comment */",
      "  console.log('Hello, world.');",
      "}",
    ],
    "parsedModule": function() {
      return this.js2json.parseModule(this.values.example);
    }
  },
  "tests": {
    "parse module": function() {
      var parsedModule = this.js2json.parseModule(this.values.example);
      this.assert.ok(typeof parsedModule == 'object');
    },
    "find ranges": function() {
      var ranges = this.js2json.findRanges(this.values.parsedModule());
      this.assert.equal(ranges.length, 2);
    },
    "convert": function() {
      var obj = this.js2json.convert(this.values.example);
      this.assert.equal(Object.keys(obj).length, 1);
    },
    "unindent": function() {
      var obj = this.js2json.convert(this.values.example);
      this.assert.equal(obj.hello, this.values.exampleFunction);
    }
  },
  "run": function() {
    this.init();
    var passed = true;
    for (var key in this.tests) {
      try {
        this.tests[key].call(this);
        console.log(JSON.stringify(key) + ' passed');
      } catch (err) {
        console.log(JSON.stringify(key) + ' failed');
        console.log(err.stack);
        passed = false;
      }
    }
    process.exit(passed ? 0 : -1);
  }
}