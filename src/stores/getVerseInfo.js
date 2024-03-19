let memo = {};

const resetCache = () => {
  memo = {};
};

const getVerseInfo = (query, cb) => {
  if (memo[query]) {
    cb(memo[query]);
  } else {
    const xhr = new XMLHttpRequest();
    const key = '7cda29fcf90a3041dda97ad48c68824b';
    const ASV_ID = '06125adad2d5898a-01';

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        const responseAsObject = JSON.parse(xhr.responseText);
        memo[query] = responseAsObject.data?.passages;
        cb(memo[query]);
      }
    };

    xhr.open(
      'GET',
      `https://api.scripture.api.bible/v1/bibles/${ASV_ID}/search?query=${query}`,
    );
    xhr.setRequestHeader('api-key', key);

    xhr.send();
  }
};

export {resetCache as _resetCache};

export default getVerseInfo;
