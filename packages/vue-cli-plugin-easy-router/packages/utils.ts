function identityPromisify(method) {
  const args = [...arguments];
  return new Promise((resolve, reject) => {
    try {
      args.unshift(resolve, reject);
      const res = method.apply(this, args);
      if ((typeof res !== 'object' && typeof res !== 'function') || typeof res.then !== 'function') {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  identityPromisify
};
