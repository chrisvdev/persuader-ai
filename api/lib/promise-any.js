// A ES6 implementation of the m0ppers's promise.any library for the missing
// method any on the class Promise https://github.com/m0ppers/promise-any

function reverse (promise) {
  return new Promise((resolve, reject) => Promise.resolve(promise).then(reject, resolve))
}

export default function promiseAny (iterable) {
  return reverse(Promise.all([...iterable].map(reverse)))
};
