// babel.config.js
module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          // Alvo: navegadores com suporte nativo a ES6+.
          // Isso evita a transpilação desnecessária para ES5.
          "targets": "defaults, not IE 11, not dead",
        },
      },
    ],
  ],
};