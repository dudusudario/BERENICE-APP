module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "vitest related --run"
  ],
  "*.{json,md,html,css,scss}": [
    "prettier --write"
  ]
}; 