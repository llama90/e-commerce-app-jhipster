module.exports = {
  '{,src/**/}*.{json,md,yml,ts,css,scss}': ['prettier --write --no-verify', 'git add']
};
