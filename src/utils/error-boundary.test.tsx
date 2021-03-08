import { mount } from 'enzyme';
import ErrorBoundary from './error-boundary';
describe('ErrorBoundary', () => {
    it('should render error message when error is thrown', () => {
        const Something = () => {
            return <div></div>
        };

        const wrapper = mount(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        );

        wrapper.find(Something).simulateError(new Error('test error'));
        wrapper.update();

        expect(wrapper.find('h1').length).toBe(1);
        expect(wrapper.find('h1').text()).toBe('Uh oh.... something went wrong');
    })
})