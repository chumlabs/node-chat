const message = require('./message');

const { generateMessage, generateLocation } = require('./message');

describe('generateMessage', () => {
  test('should generate correct message object', () => {
    const from = 'Johnny Test';
    const text = 'American Murder Log Update';
    const messageObj = generateMessage(from, text);

    // object prop matching - v1
    expect(messageObj).toMatchObject({ from, text });
    // object prop matching - v2
    expect.objectContaining({
      from,
      text
    });
    // object prop matching - v3
    expect(messageObj.from).toEqual(from);
    expect(messageObj.text).toEqual(text);

    expect(typeof messageObj.createdAt).toBe('number');
  });
});

describe('generateLocation', () => {
  test('should generate correct message object', () => {
    const from = 'Johnny Test';
    const latitude = '38.9746032';
    const longitude = '-76.4857853';
    const locationObj = generateLocation('Future Me', { latitude, longitude });

    expect(typeof locationObj.createdAt).toBe('number');
    expect.objectContaining({
      from,
      url: expect.stringMatching(/^https:\/\/google.com/)
    });

    // note: it is not particularly useful to test if the url matches
    // a particular string. It's simply a hard-coded query string. It's
    // basically just duplicating effort to copy the query string.
    // it would be more useful to check to make sure the url is a valid
    // url instead.
  });
});
