// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

interface Node {
  value: string | null;
  next: Node | null;
}


describe('generateLinkedList', () => {
  let list: string[];
  let result: Node;

  beforeEach(() => {
    list = ['one', 'two', 'three', 'four', 'five', 'six'];

    result = {
      next: {
        next: {
          next: {
            next: {
              next: {
                next: {
                  next: null,
                  value: null,
                },
                value: 'six'
              },
              value: 'five',
            },
            value: 'four',
          },
          value: 'three',
        },
        value: 'two',
      },
      value: 'one'
    }
  });
  
  test('should generate linked list from values 1', () => {
    const resultLinkedList = generateLinkedList(list);
    expect(resultLinkedList).toStrictEqual(result);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const resultLinkedList = generateLinkedList(list);
    expect(resultLinkedList).toMatchSnapshot();
  });
});
