/**
 * Legacy deep cloning utility using traditional JSON parsing.
 */
export function legacyDeepClone(obj) {
  if (!obj) return null;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Escapes unsafe characters in strings before writing to the DOM via innerHTML (legacy XSS prevention).
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Legacy query parameter extraction using basic string and split operations.
 */
export function getQueryParamLegacy(url, parameterName) {
  const name = parameterName.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Wraps dynamic API payloads in traditional jQuery AJAX success/error deferreds style.
 */
export function simulateJQueryAjax(apiCallPromise) {
  const deferred = {
    successCallback: null,
    failCallback: null,
    done: function(cb) {
      this.successCallback = cb;
      return this;
    },
    fail: function(cb) {
      this.failCallback = cb;
      return this;
    }
  };

  apiCallPromise
    .then((data) => {
      if (typeof deferred.successCallback === 'function') {
        deferred.successCallback(data);
      }
    })
    .catch((err) => {
      if (typeof deferred.failCallback === 'function') {
        deferred.failCallback(err);
      }
    });

  return deferred;
}
