import React from 'react';

class ErrorBoundary extends React.Component<{}, { hasError: boolean, latestError: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            latestError: undefined
        }
    }

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            latestError: error
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Uh oh.... something went wrong</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;