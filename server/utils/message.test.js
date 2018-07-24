const message = require('./message');

const { generateMessage } = require('./message');

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
