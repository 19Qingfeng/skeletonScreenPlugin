/**
 *
 * @param {*} duration 睡眠时间
 * @returns
 */
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

module.exports = {
  sleep,
};
