import { TransactionDetailsPipe } from './transaction-details.pipe';

describe('TransactionDetailsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionDetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
