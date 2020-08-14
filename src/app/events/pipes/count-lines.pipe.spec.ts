import { CountSizeTextareaPipe } from './count-lines.pipe';

describe('CountLinesPipe', () => {
  it('create an instance', () => {
    const pipe = new CountSizeTextareaPipe();
    expect(pipe).toBeTruthy();
  });
});
