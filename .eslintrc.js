module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "jsx-a11y",
  ],
  "rules": {
    "jsx-a11y/alt-text": [ 2, {
        "elements": [ "img", "object", "area", "input[type=\"image\"]" ],
        "img": ["Image"],
        "object": ["Object"],
        "area": ["Area"],
        "input[type=\"image\"]": ["InputImage"]
      }],
    "jsx-a11y/anchor-has-content": [ 2, {
        "components": [ "Anchor" ],
      }],
    "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [ "Link" ],
        "specialLink": [ "hrefLeft", "hrefRight", "to" ],
        "aspects": [ "noHref", "invalidHref", "preferButton" ]
      }]
  }
}
