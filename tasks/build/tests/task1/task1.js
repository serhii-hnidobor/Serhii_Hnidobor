import { task1 } from "~/task/task";
describe('Test 1', () => {
    it('should pass task example test', () => {
        expect(task1([1, 2, 'a', 'b'])).toEqual([1, 2]);
        expect(task1([1, 'a', 'b', 0, 15])).toEqual([1, 0, 15]);
        expect(task1([1, 2, 'aasf', '1', '123', 123])).toEqual([1, 2, 123]);
    });
    it('should subtract items', () => {
        const n = 10;
        expect(n.subtract(4)).toEqual(n - 4);
    });
    it('should multiply items', () => {
        const n = 10;
        expect(n.multiply(4)).toEqual(n * 4);
    });
    it('should divide items', () => {
        const n = 10;
        expect(n.divide(4)).toEqual(n / 4);
    });
    it('should be chainable', () => {
        const n = 10;
        expect(n.add(20).subtract(20).multiply(2).divide(2).add(5)).toEqual(n + 5);
    });
});
Footer;
