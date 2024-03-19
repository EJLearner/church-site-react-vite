import getVerseInfo, {_resetCache} from './getVerseInfo';

const testResponseObject = {
  data: {
    passages: [{content: 'test'}],
  },
};
const createMockXHR = (responseObject = testResponseObject, readyState = 4) => {
  return {
    open: jest.fn(),
    send: jest.fn(),
    DONE: 4,
    readyState,
    responseText: JSON.stringify(responseObject),
    setRequestHeader: jest.fn(),
  };
};

describe('getVerseInfo', () => {
  const oldXMLHttpRequest = window.XMLHttpRequest;
  const testQuery = 'test-query';
  let mockXHR;

  beforeEach(() => {
    mockXHR = createMockXHR();
    window.XMLHttpRequest = jest.fn(() => mockXHR);
  });

  afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest;
    _resetCache();
  });

  it('calls xhr open', () => {
    const siteAddress = 'https://api.scripture.api.bible';
    const sitePath = '/v1/bibles/';
    const bibleId = '06125adad2d5898a-01';
    const expectedUrl = `${siteAddress}${sitePath}${bibleId}/search?query=${testQuery}`;

    getVerseInfo(testQuery, jest.fn());

    expect(mockXHR.open).toBeCalledWith('GET', expectedUrl);
  });

  it('calls xhr setHeaderRequest', () => {
    getVerseInfo(testQuery, jest.fn());

    expect(mockXHR.setRequestHeader).toHaveBeenCalledTimes(1);
    expect(mockXHR.setRequestHeader.mock.calls[0][0]).toBe('api-key');
    expect(mockXHR.setRequestHeader.mock.calls[0][1]).toBeDefined();
  });

  it('calls xhr send', () => {
    getVerseInfo(testQuery, jest.fn());

    expect(mockXHR.send).toHaveBeenCalledTimes(1);
    expect(mockXHR.send.mock.calls[0][0]).not.toBeDefined();
  });

  it('gets repeat call of same query from cache', () => {
    const firstCb = jest.fn();

    getVerseInfo(testQuery, firstCb);
    mockXHR.onreadystatechange();

    expect(mockXHR.send).toHaveBeenCalledTimes(1);

    const secondCb = jest.fn();
    getVerseInfo(testQuery, secondCb);
    expect(mockXHR.send).toHaveBeenCalledTimes(1);
  });

  it('calls callback with parsed object if readyState is done', () => {
    const cb = jest.fn();
    getVerseInfo(testQuery, cb);

    mockXHR.onreadystatechange();

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0]).toEqual(testResponseObject.data.passages);
  });

  it('does not call callback with parsed object if readyState is not done', () => {
    mockXHR = createMockXHR(testResponseObject, 0);
    window.XMLHttpRequest = jest.fn(() => mockXHR);

    const cb = jest.fn();
    getVerseInfo(testQuery, cb);

    mockXHR.onreadystatechange();

    expect(cb).not.toHaveBeenCalled();
  });
});
